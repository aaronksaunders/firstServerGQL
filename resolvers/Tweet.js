const resolvers = {
  Tweet: {
    id(tweet) {
      return tweet._id;
    },

    author(tweet, args, { Tweet }) {
      return Tweet.author(tweet);
    },
  },
  Query: {
    tweets(root, { lastCreatedAt, limit }, { Tweet }) {
      return Tweet.all({ lastCreatedAt, limit });
    },

    tweet(root, { id }, { Tweet }) {
      return Tweet.findOneById(id);
    },
  },
  Mutation: {
    async createTweet(root, { input }, { Tweet }) {
      const id = await Tweet.insert(input);
      return Tweet.findOneById(id);
    },

    async updateTweet(root, { id, input }, { Tweet }) {
      await Tweet.updateById(id, input);
      return Tweet.findOneById(id);
    },

    removeTweet(root, { id }, { Tweet }) {
      return Tweet.removeById(id);
    },
  },
  Subscription: {
    tweetCreated: tweet => tweet,
    tweetUpdated: tweet => tweet,
    tweetRemoved: id => id,
  },
};

export default resolvers;
