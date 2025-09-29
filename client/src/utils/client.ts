const isProduction = import.meta.env.PROD;

const prod = "https://projectsolutionserver.fly.dev";
const dev = "http://localhost:5059";

export const finalUrl = isProduction ? prod : dev;
