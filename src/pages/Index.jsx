import React, { useState } from "react";
import { Box, Image, Grid, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Input, Flex, Heading } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const PhotoWidget = ({ photo, onDelete, onEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box borderWidth={1} borderRadius="lg" overflow="hidden">
      <Image src={photo.url} alt={photo.title} onClick={onOpen} cursor="pointer" />
      <Box p={4}>
        <Heading as="h4" size="md" mb={2}>
          {photo.title}
        </Heading>
        <Flex justify="space-between">
          <IconButton icon={<FaEdit />} onClick={() => onEdit(photo)} />
          <IconButton icon={<FaTrash />} onClick={() => onDelete(photo.id)} />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{photo.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={photo.url} alt={photo.title} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const AddPhotoWidget = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, url });
    setTitle("");
    setUrl("");
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <Heading as="h4" size="md" mb={4}>
        Add Photo
      </Heading>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} mb={2} />
        <Input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} mb={4} />
        <Button leftIcon={<FaPlus />} type="submit">
          Add
        </Button>
      </form>
    </Box>
  );
};

const Index = () => {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      title: "Sunset",
      url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzExMTc3Mzc0fDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 2,
      title: "Beach",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNofGVufDB8fHx8MTcxMTE3NzM3NXww&ixlib=rb-4.0.3&q=80&w=1080",
    },
    // Add more initial photos here
  ]);

  const handleAddPhoto = (newPhoto) => {
    setPhotos([...photos, { ...newPhoto, id: Date.now() }]);
  };

  const handleDeletePhoto = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  const handleEditPhoto = (editedPhoto) => {
    setPhotos(photos.map((photo) => (photo.id === editedPhoto.id ? editedPhoto : photo)));
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" mb={8}>
        Photo Gallery
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={8}>
        {photos.map((photo) => (
          <PhotoWidget key={photo.id} photo={photo} onDelete={handleDeletePhoto} onEdit={handleEditPhoto} />
        ))}
        <AddPhotoWidget onAdd={handleAddPhoto} />
      </Grid>
    </Box>
  );
};

export default Index;
