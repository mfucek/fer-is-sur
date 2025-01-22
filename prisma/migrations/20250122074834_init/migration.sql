-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "coverImageId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventCover" (
    "eventId" TEXT NOT NULL,
    "imageId" TEXT,
    "imageFileId" TEXT,

    CONSTRAINT "EventCover_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "EventGallery" (
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventGallery_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventGalleryToFile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EventCover_eventId_key" ON "EventCover"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "EventGallery_eventId_key" ON "EventGallery"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "_EventGalleryToFile_AB_unique" ON "_EventGalleryToFile"("A", "B");

-- CreateIndex
CREATE INDEX "_EventGalleryToFile_B_index" ON "_EventGalleryToFile"("B");

-- AddForeignKey
ALTER TABLE "EventCover" ADD CONSTRAINT "EventCover_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCover" ADD CONSTRAINT "EventCover_imageFileId_fkey" FOREIGN KEY ("imageFileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGallery" ADD CONSTRAINT "EventGallery_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventGalleryToFile" ADD CONSTRAINT "_EventGalleryToFile_A_fkey" FOREIGN KEY ("A") REFERENCES "EventGallery"("eventId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventGalleryToFile" ADD CONSTRAINT "_EventGalleryToFile_B_fkey" FOREIGN KEY ("B") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
