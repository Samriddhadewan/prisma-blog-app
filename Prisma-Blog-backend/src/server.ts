import app from "./app";
import { prisma } from "./lib/prisma";
const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("connected to database successful");

    app.listen(PORT, () => {
      console.log(`server is running on Port${PORT}`);
    });
  } catch (error) {
    console.log("an error occurred", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
