import { Storage } from "../../storage/src/types";
import * as fs_orig from "fs";
import { promisify } from "util";

// @types/node for fs.promise.stat does not have the option parameter, so sticking with promisify.
const fs = {
  constants: fs_orig.constants,
  access: promisify(fs_orig.access),
  readFile: promisify(fs_orig.readFile),
  stat: promisify(fs_orig.stat),
  writeFile: promisify(fs_orig.writeFile),
  rm: promisify(fs_orig.rm),
};

export const createFileStorage = (): Storage<string, string> => {
  const info = async (path: string) => {
    const result = await fs.stat(path, { bigint: true });

    return {
      accessed: result.atime,
      created: result.birthtime,
      modified: result.mtime,
      size: result.size,
    };
  };

  const exists = async (path: string) => {
    try {
      await fs.access(path, fs.constants.F_OK);
      return true;
    } catch (e) {
      return false;
    }
  };

  const load = async (path: string) => {
    return await fs.readFile(path, "utf8");
  };

  const save = async (path: string, item: string) => {
    await fs.writeFile(path, item, "utf8");
  };

  const deleteItem = async (path: string) => {
    await fs.rm(path);
  };

  return {
    info,
    exists,
    load,
    save,
    delete: deleteItem,
  };
};
