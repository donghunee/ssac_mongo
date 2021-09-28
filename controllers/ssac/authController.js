const user = require("../../models/user");
const jwtModule = require("../../modules/jwtModule");

const authController = {
  signUp: async (req, res) => {
    const { name, userId, password } = req.body;

    try {
      const result = await user.findOne({ userId }); // 아이디 체크

      if (!result) {
        // 중복된 아이디가 없을 경우
        const userModel = new user({ name, userId, password });
        await userModel.save();
        res.status(200).json({
          message: "회원가입 성공",
        });
      } else {
        // 있을 경우
        res.status(409).json({
          message: "중복된 아이디가 존재합니다.",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
        error: error,
      });
    }
  },
  signIn: async (req, res) => {
    const { userId, password } = req.body;
    try {
      const result = await user.findOne({ userId, password });
      if (result) {
        // 로그인 성공 > 무언가 담긴 객체

        const payload = {
          userId: result.userId,
          name: result.name,
        };

        const token = jwtModule.create(payload);

        res.status(200).json({
          message: "로그인 성공",
          accessToken: token,
        });
      } else {
        // 로그인 실패 > null
        res.status(409).json({
          message: "로그인 실패",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },
};

module.exports = authController;
