import { PrismaClient } from "@prisma/client";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import CreateCategoryInput from "../inputs/category/create-category.input";
import UpdateCategoryInput from "../inputs/category/update-category.input";
import Category from "../schema/category.schema";

@Resolver((of) => Category)
class CategoryResolver {
  constructor(private readonly prisma = new PrismaClient()) {}

  @Query((returns) => [Category])
  async getCategories() {
    return this.prisma.category.findMany();
  }

  @Query((returns) => Category)
  async getCategory(@Arg("id") id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new Error("Category not found");
    return category;
  }

  @Mutation((returns) => Category)
  async createCategory(@Arg("categoryData") categoryData: CreateCategoryInput) {
    await this.validateName(categoryData.name);
    const newCategory = this.prisma.category.create({ data: categoryData });
    return newCategory;
  }

  @Mutation((returns) => Category)
  async updateCategory(@Arg("categoryData") categoryData: UpdateCategoryInput) {
    const categorySearch = await this.getCategory(categoryData.id);
    await this.validateName(categoryData?.name);
    const updatedCategory = { ...categorySearch, ...categoryData };
    await this.prisma.category.update({
      where: { id: updatedCategory.id },
      data: updatedCategory,
    });
    return updatedCategory;
  }

  @Mutation((returns) => Category)
  async deleteCategory(@Arg("id") id: number) {
    const categorySearch = await this.getCategory(id);
    await this.prisma.category.delete({ where: { id } });
    return categorySearch;
  }

  private async validateName(name: string) {
    const categorySearch = await this.prisma.category.findUnique({
      where: { name },
    });
    if (categorySearch) throw new Error("This category name already exists");
  }
}

export default CategoryResolver;
