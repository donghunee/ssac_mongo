const client = require("../../modules/elasticModule");

const searchController = {
  search: async (req, res) => {
    const { q } = req.query;

    try {
      const result = await client.search({
        index: "post_index",
        body: {
          size: 3,
          query: {
            match: {
              "title.ngram": q,
            },
          },
        },
      });

      console.log(result.hits.hits);
      const searchResult = result.hits.hits;

      const finResult = searchResult.map((item) => {
        const result = item._source;
        return { ...result, score: item._score };
      });

      res.status(200).json({
        message: "검색 성공",
        data: finResult,
      });
    } catch (error) {
      res.status(500).json({
        message: "ELS 서버 에러",
      });
    }
  },
};

module.exports = searchController;
