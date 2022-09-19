import { PrismaClient } from '@prisma/client';
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import CreatePhotoInput from '../inputs/photo/create-photo.input';
import UpdatePhotoInput from '../inputs/photo/update-photo.input';
import Photo from "../schema/photo.schema";

@Resolver(of => Photo)
class PhotoResolver {
  constructor(private readonly prisma = new PrismaClient()) {}

  @Query((returns) => [Photo])
  getPhotos() {
    return this.prisma.photo.findMany();
  }

  @Query((returns) => Photo)
  async getPhoto(@Arg('id') id: number) {
    const photo = await this.prisma.photo.findUnique({ where: { id } });
    if (!photo) throw new Error('Photo not found');
    return photo;
  }

  @Mutation((returns) => Photo)
  async createPhoto(@Arg('photoData') photoData: CreatePhotoInput) {
    await this.validateUrl(photoData.url);
    const newPhoto = await this.prisma.photo.create({ data: photoData });
    return newPhoto;
  }

  @Mutation((returns) => Photo)
  async updatePhoto(@Arg('photoData') photoData: UpdatePhotoInput) {
    const photoSearch = this.getPhoto(photoData.id);
    const updatedPhoto = { ...photoSearch, ...photoData };
    await this.validateUrl(photoData.url);
    await this.prisma.photo.update({ where: { id: updatedPhoto.id }, data: updatedPhoto });
    return updatedPhoto;
  }

  @Mutation((returns) => Photo)
  async deletePhoto(@Arg('id') id: number) {
    const photoSearch = this.getPhoto(id);
    await this.prisma.photo.delete({ where: { id } });
    return photoSearch;
  }

  private async validateUrl(url: string) {
    const photoSearch = await this.prisma.photo.findUnique({ where: { url } });
    if (photoSearch) throw new Error('This url already exists');
    return photoSearch;
  }
}

export default PhotoResolver;