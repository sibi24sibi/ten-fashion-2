import axios from "axios";
import { useState } from "react";

// Star Rating Component
const StarRating = ({ rating, onChange }) => {
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleClick = (newRating) => {
        onChange(newRating);  // Update rating on click
    };

    const handleMouseEnter = (index) => {
        setHoveredRating(index);  // Set hovered rating
    };

    const handleMouseLeave = () => {
        setHoveredRating(rating);  // Reset to current rating on mouse leave
    };

    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= rating;
                const isHovered = star <= hoveredRating;
                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        aria-label={`Rate ${star} out of 5`}
                        className={`text-2xl ${isFilled || isHovered ? 'text-yellow-600' : 'text-gray-300'}`}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
};

const ImageUpload = ({ formData, handleChange }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleChange({
                target: {
                    name: "image",
                    value: file,
                },
            });
        }
    };

    return (
        <div className="flex flex-col">
            <label htmlFor="image" className="font-medium text-gray-700">Product Image:</label>
            <input
                id="image"
                type="file"
                name="image"
                onChange={handleFileChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export const ProductForm = () => {
    // Initial state for form data

    const initialState = {
        productTitle: "",
        price: "",
        productDescription: "",
        image: "", // Store the image file
        category: "",
        subCategory: "",
        rating: 0, // Default rating value
    }

    const [formData, setFormData] = useState(initialState);

    const [categories] = useState(["Men", "Women", "Children"]);
    const [subCategories] = useState({
        Men: ["Jeans", "Shirts", "T-Shirts"],
        Women: ["Dresses", "Tops", "Skirts"],
        Children: ["Shorts", "Sleeveless Shirts", "Trousers"],
    });

    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the form starts submitting
        setError(null); // Reset any previous error message

        try {
            const form = new FormData();

            form.append("productTitle", formData.productTitle);
            form.append("price", formData.price);
            form.append("productDescription", formData.productDescription);
            form.append("category", formData.category);
            form.append("subCategory", formData.subCategory);
            form.append("rating", formData.rating);

            // Append the image file
            if (formData.image) {
                form.append("image", formData.image);
            }

            // Send the form data to the backend
            const response = await axios.post("http://localhost:8000/api/products", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Product added:", response.data);

            // Reset form after successful submission
            setFormData(initialState);
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("An error occurred while submitting the form. Please try again."); // Show error message
        } finally {
            setLoading(false); // Set loading to false when the request finishes
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Product Form</h2>
            {loading && <p className="text-center text-blue-500">Submitting your product...</p>} {/* Show loading message */}
            {error && <p className="text-center text-red-500">{error}</p>} {/* Show error message */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Title */}
                <div className="flex flex-col">
                    <label htmlFor="productTitle" className="font-medium text-gray-700">Product Title:</label>
                    <input
                        id="productTitle"
                        type="text"
                        name="productTitle"
                        value={formData.productTitle}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label htmlFor="price" className="font-medium text-gray-700">Price:</label>
                    <input
                        id="price"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="flex flex-col">
                    <label htmlFor="productDescription" className="font-medium text-gray-700">Product Description:</label>
                    <textarea
                        id="productDescription"
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                </div>

                {/* Image Upload */}
                <ImageUpload formData={formData} handleChange={handleChange} />

                {/* Category Selection */}
                <div className="flex flex-col">
                    <label htmlFor="category" className="font-medium text-gray-700">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Subcategory Selection */}
                <div className="flex flex-col">
                    <label htmlFor="subCategory" className="font-medium text-gray-700">Subcategory:</label>
                    <select
                        id="subCategory"
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select a subcategory</option>
                        {formData.category &&
                            subCategories[formData.category]?.map((subCat) => (
                                <option key={subCat} value={subCat}>
                                    {subCat}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Star Rating Component */}
                <div className="flex flex-col">
                    <label htmlFor="rating" className="font-medium text-gray-700">Rating:</label>
                    <StarRating
                        rating={formData.rating}
                        onChange={(newRating) => setFormData({ ...formData, rating: newRating })}
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading} // Disable button while loading
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
