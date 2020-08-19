export default {
  count: {
    subscribe: (parent, args, { pubsub }, info) => {
      let count = 0;

      setInterval(() => {
        count += 5;
        pubsub.publish("count", { count });
      }, 5000);

      return pubsub.asyncIterator("count");
    },
  },
};
