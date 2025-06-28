-- CreateTable
CREATE TABLE "YouTubeChannel" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    "channelTitle" TEXT NOT NULL,
    "channelDescription" TEXT,
    "subscriberCount" INTEGER,
    "viewCount" INTEGER,
    "videoCount" INTEGER,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "tokenExpiry" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastSyncAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YouTubeChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YouTubeVideo" (
    "id" SERIAL NOT NULL,
    "channelId" INTEGER NOT NULL,
    "videoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "duration" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "thumbnailUrl" TEXT,
    "tags" TEXT[],
    "categoryId" TEXT,
    "defaultLanguage" TEXT,
    "defaultAudioLanguage" TEXT,
    "isShort" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YouTubeVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "YouTubeChannel_channelId_key" ON "YouTubeChannel"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "YouTubeVideo_videoId_key" ON "YouTubeVideo"("videoId");

-- AddForeignKey
ALTER TABLE "YouTubeChannel" ADD CONSTRAINT "YouTubeChannel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YouTubeVideo" ADD CONSTRAINT "YouTubeVideo_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "YouTubeChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
