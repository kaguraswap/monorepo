import { ethers } from "ethers";
import httpError from "http-errors";
import { validate } from "lib/ajv";
import { isEmpty } from "lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";

import IERC721Artifact from "../../../../../hardhat/dist/artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json";
import { IERC165 } from "../../../../../hardhat/dist/types";
import { ContractAttributes } from "../../../../../hasura/dist/entity/contract";
import { models, sequelize } from "../../../../../hasura/src/lib/sequelize";
import networks from "../../../../../shared/src/configs/networks.json";
import { ContractKey } from "../../../../../shared/src/types/contract";
import { ChainId } from "../../../../../shared/src/types/network";
import { SupportsInterface } from "../../../../../shared/src/types/supports-interface";
import { ERC721_ID, ERC721_METADATA_ID } from "../../../../../shared/src/utils/constant";
import { error } from "../../../../../shared/src/utils/error";

export const syncContract = async (params: ContractKey) => {
  if (!validate.contractKey(params)) {
    throw httpError(error.invalidArgument.code, error.invalidArgument.message);
  }
  const { chainId } = params;
  let { contractAddress } = params;
  contractAddress = contractAddress.toLowerCase();
  const { rpc } = networks[chainId as ChainId];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const erc165 = <IERC165>new ethers.Contract(contractAddress, IERC721Artifact.abi, provider);
  const code = await provider.getCode(contractAddress).catch(() => "");
  const isContract = code !== "0x";
  let supportsInterface: SupportsInterface = {};
  if (isContract) {
    const [isERC721, isERC721Metadata] = await Promise.all([
      erc165.supportsInterface(ERC721_ID).catch(() => false),
      erc165.supportsInterface(ERC721_METADATA_ID).catch(() => false),
    ]);
    supportsInterface = {
      ...supportsInterface,
      isERC721,
      isERC721Metadata,
    };
  }

  /*
   * @dev only include not empty value in upsert field
   *      this is required to prevent null-override when connection error happens
   */
  const contractFields: (keyof ContractAttributes)[] = ["isSynced"];
  if (!isEmpty(supportsInterface)) {
    contractFields.push("supportsInterface");
  }
  const { contract } = await sequelize.transaction(async (t) => {
    const contract = await models.Contract.upsert(
      { chainId, contractAddress, supportsInterface, isSynced: true },
      { fields: contractFields, transaction: t }
    );
    return { contract };
  });
  return { contract };
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contract } = await syncContract(req.body);
  res.status(200).json({ contract });
};

export default handler;
