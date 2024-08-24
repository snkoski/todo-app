-- CreateTable
CREATE TABLE "recipes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "ingredients" TEXT NOT NULL,
    "steps" TEXT NOT NULL,
    "prep_time" INTEGER,
    "cook_time" INTEGER,
    "total_time" INTEGER DEFAULT (prep_time + cook_time),
    "servings" INTEGER,
    "difficulty" VARCHAR(50),
    "author" VARCHAR(100),
    "category" VARCHAR(50),
    "cuisine" VARCHAR(50),
    "tags" TEXT,
    "image_url" TEXT,
    "source_url" TEXT,
    "date_created" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "done" BOOLEAN DEFAULT false,
    "deleted" BOOLEAN DEFAULT false,
    "date_created" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testing" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "testing_pkey" PRIMARY KEY ("id")
);
