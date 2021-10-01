const board = require("../../models/board");
const user = require("../../models/user");
const jwtModule = require("../../modules/jwtModule");

const boardController = {
  createBoard: async (req, res) => {
    const userInfo = req.userInfo;
    const { title, content, boardPw } = req.body;
    const boardModel = new board({
      title,
      content,
      boardPw,
      writeTime: new Date(),
      writer: userInfo._id,
    });

    try {
      const result = await boardModel.save();
      res.status(200).json({
        message: "저장 성공",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },
  readAllBoard: async (req, res) => {
    try {
      const result = await board.find().populate("writer", "name userId");
      if (!result)
        return res.status(400).json({ message: "데이터가 없습니다." });

      res.status(200).json({
        message: "조회 성공",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },
  readDetailBoard: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await board.findById(id);
      if (!result)
        return res.status(400).json({ message: "데이터가 없습니다." });

      res.status(200).json({
        message: "조회 성공",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },
  deleteBoard: async (req, res) => {
    const userInfo = req.userInfo;
    const { id } = req.params; // 게시물의 _id

    // 일치하는 회원인지 아닌지 확인

    const ownResult = await board.checkAuth({
      boardId: id,
      writerId: userInfo._id,
    });
    console.log(ownResult);
    if (ownResult === -1) {
      return res.status(409).json({ message: "접근 권한이 없습니다." });
    } else if (ownResult === -2) {
      return res.status(500).json({
        message: "DB 서버 에러",
      });
    }

    // try {
    //   const ownResult = await board.findOne({ _id: id }); // 게시물의 _id
    //   const ownId = ownResult.writer;
    //   if (ownId.toString() !== userInfo._id.toString())
    //     // 비교하고자 하는 유저의 _id
    //     return res.status(409).json({ message: "접근 권한이 없습니다." });
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({
    //     message: "DB 서버 에러",
    //   });
    // }

    try {
      await board.findByIdAndDelete(id);
      res.status(200).json({
        message: "삭제 성공",
      });
    } catch (error) {
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },
  updateBoard: async (req, res) => {
    const userInfo = req.userInfo;
    const { id } = req.params;
    const { title, content, boardPw } = req.body;

    const ownResult = await board.checkAuth({
      boardId: id,
      writerId: userInfo._id,
    });
    console.log(ownResult);
    if (ownResult === -1) {
      return res.status(409).json({ message: "접근 권한이 없습니다." });
    } else if (ownResult === -2) {
      return res.status(500).json({
        message: "DB 서버 에러",
      });
    }

    try {
      const result = await board.findByIdAndUpdate(
        id,
        {
          title,
          content,
          boardPw,
        },
        { new: true } // 업데이트 하고 난 후의 결과값 반환
      );
      console.log(result);
      res.status(200).json({
        message: "수정 완료",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "DB 서버 에러",
        error,
      });
    }
  },
};

module.exports = boardController;
