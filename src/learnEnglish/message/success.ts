import { type IDetailMessage } from "@src/common/base/interface";

interface ISuccessLearnEnglish {
  WORD_CREATE_SUCCESS: IDetailMessage;
}

const successMessage: ISuccessLearnEnglish = {
  WORD_CREATE_SUCCESS: {
    key: "WORD_CREATE_SUCCESS",
    status: 200,
    message: "WORD CREATE SUCCESS",
  },
};

export { successMessage };
