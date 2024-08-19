import React, { ChangeEvent, FormEvent } from 'react';
import { RecipeIngredient } from '../../types';

type FormData = {
  name: string;
  description: string;
  author: string;
  image_url: string;
  source_url: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  currentIngredient: string;
  currentStep: string;
  currentMeasurement: string;
  currentQuantity: number;
};

const RecipeForm = () => {
  const [formData, setFormData] = React.useState<FormData>({
    name: 'test',
    description: '',
    author: '',
    image_url: '',
    source_url: '',
    ingredients: [],
    steps: [],
    currentIngredient: '',
    currentStep: '',
    currentMeasurement: '',
    currentQuantity: 0
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle ingredient addition
  const handleAddIngredient = () => {
    const newIngredient = {
      ingredient: formData.currentIngredient,
      measurement: formData.currentMeasurement,
      quantity: formData.currentQuantity
    };
    if (formData.currentIngredient.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        ingredients: [...prevData.ingredients, newIngredient],
        currentIngredient: '',
        currentMeasurement: '',
        currentQuantity: ''
      }));
    }
  };

  // Handle step addition
  const handleAddStep = () => {
    if (formData.currentStep.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        steps: [...prevData.steps, prevData.currentStep],
        currentStep: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit the form data
    console.log(formData);
    // You might want to send this data to your backend
  };

  return (
    <div className="flex">
      <form
        className="flex flex-col space-y-4 max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="recipe-name" className="block text-gray-700 font-semibold mb-2">
            Name:
          </label>
          <input
            id="recipe-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="recipe-description" className="block text-gray-700 font-semibold mb-2">
            Description:
          </label>
          <textarea
            id="recipe-description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="recipe-author" className="block text-gray-700 font-semibold mb-2">
            Author:
          </label>
          <input
            id="recipe-author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="recipe-image-url" className="block text-gray-700 font-semibold mb-2">
            Image URL:
          </label>
          <input
            id="recipe-image-url"
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="recipe-source-url" className="block text-gray-700 font-semibold mb-2">
            Source URL:
          </label>
          <input
            id="recipe-source-url"
            type="text"
            name="source_url"
            value={formData.source_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="recipe-ingredients" className="block text-gray-700 font-semibold mb-2">
            Ingredient:
          </label>
          <div className="flex space-x-2">
            <input
              id="recipe-ingredients"
              type="text"
              name="currentIngredient"
              value={formData.currentIngredient}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="recipe-quantity" className="block text-gray-700 font-semibold mb-2">
              Quantity:
            </label>
            <input
              id="recipe-quantity"
              type="number"
              name="currentQuantity"
              value={formData.currentQuantity}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="recipe-measurement" className="block text-gray-700 font-semibold mb-2">
              Measurement:
            </label>
            <input
              id="recipe-measurement"
              type="text"
              name="currentMeasurement"
              value={formData.currentMeasurement}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Ingredient
            </button>
          </div>
          <ul>
            {formData.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.quantity} {ingredient.measurement} {ingredient.ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label htmlFor="recipe-steps" className="block text-gray-700 font-semibold mb-2">
            Steps:
          </label>
          <div className="flex space-x-2">
            <input
              id="recipe-steps"
              type="text"
              name="currentStep"
              value={formData.currentStep}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddStep}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Step
            </button>
          </div>
          <ul>
            {formData.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Create
        </button>
      </form>
      <div>
        <p>{formData.name}</p>
        <p>{formData.description}</p>
        <p>{formData.author}</p>
        <p>{formData.image_url}</p>
        <p>{formData.source_url}</p>
        <ul>
          {formData.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.quantity} {ingredient.measurement} {ingredient.ingredient}
            </li>
          ))}
        </ul>
        <ol>
          {formData.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeForm;
