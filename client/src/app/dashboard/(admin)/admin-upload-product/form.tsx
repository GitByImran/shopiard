import MultipleImageUploader from "@/components/multipleImageUploader";
import SingleImageUploader from "@/components/singleImageUploader";
import ImageUploader from "@/components/singleImageUploader";
import React from "react";

const AdminUploadProductForm = () => {
  return (
    <form className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <h2 className="font-bold text-slate-600">Thumbnail Image</h2>
          <SingleImageUploader />
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-slate-600">Gallery Images</h2>
          <MultipleImageUploader />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <select
          name="brand"
          id="brand"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
        >
          <option value="">select the product brand</option>
          <option value="">hfbd</option>
          <option value="">bfd</option>
          <option value="">asds</option>
          <option value="">eret</option>
          <option value="">pdafsd</option>
        </select>
        <select
          name="category"
          id="category"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
        >
          <option value="">select the product category</option>
          <option value="">hfbd</option>
          <option value="">bfd</option>
          <option value="">asds</option>
          <option value="">eret</option>
          <option value="">pdafsd</option>
        </select>
        <input
          type="text"
          name="title"
          placeholder="enter the product name"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
        />

        <input
          type="number"
          name="price"
          placeholder="enter the product price"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
        />
        <input
          type="number"
          name="discountPercentage"
          placeholder="enter the discount price (0 for no-discount)"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
        />
        {/*         <input
          type="number"
          name="rating"
          placeholder=""
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
        /> */}
        <input
          type="number"
          name="stock"
          placeholder="enter the stock amount"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
        />
        <textarea
          name="description"
          id=""
          cols={0}
          rows={0}
          placeholder="enter the product description"
          className="col-span-1 md:col-span-2 lg:col-span-3 w-full h-60 border border-slate-300 focus-visible:outline-slate-600 p-2"
        ></textarea>
      </div>
      <button className="sm:w-fit w-full px-10 py-2 bg-cyan-600 text-white">
        Submit
      </button>
    </form>
  );
};

export default AdminUploadProductForm;
