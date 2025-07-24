"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaPlus, FaTimes } from "react-icons/fa";

export const UploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: null as File | null,
  });

  const [category, setCategory] = useState<string[]>([]);
  const [displayCatInput, setCatInput] = useState<boolean>(false);
  const [catInputValue, setCatInputval] = useState<string>("");

  const handleCategory = () => {
    if (catInputValue?.trim() !== "") {
      setCategory((prev) => [...prev, catInputValue?.trim()]);
      setCatInputval("");
    }
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    // TODO: Submit data to server
    console.log("Submitting form...", formData);
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto p-7 bg-white rounded-xl shadow-md mt-6 mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Upload Your Scrap Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <div className={`${displayCatInput ? "flex" : "hidden"} space-x-4`}>
            <input
              value={catInputValue}
              onChange={(event) => setCatInputval(event.target.value)}
              type="text"
              className="mt-1 block  rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-green-500 focus:border-green-500"
            />
            <button
              onClick={handleCategory}
              type="button"
              className="p-3 rounded-md text-sm text-white bg-black"
            >
              Add
            </button>
          </div>
          {/* category listing */}
          <div className={`${displayCatInput ? "block p-6" : "hidden"}`}>
            <ul className="list-decimal">
              {category &&
                category.map((cat, index) => (
                  <div className="flex items-center space-x-4" key={index}>
                    <li>{cat}</li>
                    <FaTimes
                      onClick={() =>
                        setCategory((prev) =>
                          prev.filter((category) => category !== cat)
                        )
                      }
                      className="cursor-pointer text-red-600"
                    />
                  </div>
                ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => setCatInput(true)}
            className={`mt-2 bg-black p-3 rounded-md text-white ${
              displayCatInput ? "hidden" : "block"
            }`}
          >
            <div className="flex items-center justify-center gap-x-2">
              <FaPlus />
              <span>Add Category</span>
            </div>
          </button>
          <ul>
            <li></li>
          </ul>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            multiple
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
          {previewUrl && (
            <Image
              width={40}
              height={40}
              src={previewUrl}
              alt="Preview"
              className="mt-2 w-40 h-40 object-cover rounded-md shadow"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Upload Item
        </button>
      </form>
      <div className="p-8">
        <ul className="list-disc">
          <li className="text-gray-500">
            Title : Provide the name of your item as title.
          </li>
          <li className="text-gray-500">
            Category : Add the categorries that you have in your items add the
            category and it will be added to the list.
          </li>
          <li className="text-gray-500">
            Price : Provide your estimated price that you want for your item.
          </li>
          <li className="text-gray-500">
            Description : Provide more details about your item.
          </li>
          <li className="text-gray-500">
            Images : Upload the images of your item you can select multiple
            images.
          </li>
        </ul>
      </div>
    </motion.div>
  );
};
