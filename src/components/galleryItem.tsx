// galleryItem.tsx

import React, { useState } from "react";
import Image from 'next/image';
import { FileInfo } from "./fileInfo";
import { IconEdit, IconRestore, IconTrash } from "@tabler/icons-react";
import { Badge, Text } from "@mantine/core";

interface GalleryItemProps {
  image: FileInfo;
  markDeleted: (src: string) => void;
  openImage: (file: FileInfo) => void;
  moveToClass: (file: FileInfo | undefined) => void;
}

const GalleryItem = (props: GalleryItemProps) => {
  return (
    <div 
      key={props.image.src} 
      className="cursor-pointer relative"
      >
      
      <Image
        width={160}
        height={110}
        style={{
          height: '110px',
          width: '160px',
          objectFit: props.image.toDelete ? 'cover' : 'cover',
          filter: props.image.toDelete ? 'grayscale(1) blur(1px)' : 'none',
          borderRadius: '6px'
        }}
        src={props.image.src}
        alt={props.image.name || "Gallery image"}
        onClick={() => props.openImage(props.image)}
      />

<div id="namebuttons" className="flex justify-between items-center w-full pt-1">
  <Text id="filename" size="xs" className="flex-grow" truncate>
    {props.image.name}
  </Text>

  <div className="flex">


    {props.image.classPredictions && props.image.classPredictions.length > 0 && props.image.classPredictions[0].class && (
  <>
    <button
      onClick={() => {props.moveToClass(props.image);}}
      className="w-5 h-5 flex items-center justify-center rounded-full"
    >
      <IconEdit size="0.8rem"/>
    </button>
  </>
)}


    <button
      onClick={() => {
        if (props.markDeleted) props.markDeleted(props.image.hash);
      }}
      className={
        props.image.toDelete
          ? "w-5 h-5 flex items-center justify-center rounded-full"
          : "w-5 h-5 flex items-center justify-center rounded-full"
      }
    >
      {props.image.toDelete ? (
        <IconRestore color="green" size="0.8rem"/>
      ) : (
        <IconTrash color="red" size="0.8rem"/>
      )}
    </button>
  </div>
</div>

{props.image.classPredictions && props.image.classPredictions.length > 0 && props.image.classPredictions[0].class && (
  <Badge id="badgeclass" key={0} size="xs" className="mr-2">
    {props.image.classPredictions[0].class}
  </Badge>
)}



    </div>
  );
};

export default GalleryItem;
