export const works = [
  {
    id: 1,
    workTitle: "Categories",
    description: "This Module contains forms regarding product category",
    route: "category",
    create: "Add new category",
    destroy: "Delete category",
    update: "Update category",
    view: "View category",
  },
];

export const categoryPage = {
  fields: [
    {
      htmlFor: "categoryName",
      label: "Category Name",
      placeholder: "Enter Category Name",
      type: "text",
    },
    {
      htmlFor: "categoryIcon",
      label: "Category Icon",
      placeholder: "Select Category Icon Image",
      type: "file",
    },
  ],

  button: "Add new Category",
};
