"use client";

import { useRouter } from "next/navigation";

import Select from "react-select";

export const BrandSelector = ({ brand_name, category_name, allBrands }) => {
  const router = useRouter();

  const actualValue = {"value": brand_name, "label": brand_name}

  const handleBrandChange = (selectedOption) => {
    const brnd = selectedOption.value;
    router.push(`/categories/${brnd.trim().replace(/\s/g,"-")}/${category_name.trim().replace(/\s/g,"-")}`);
  };


  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "white",
      textTransform:"none",
      paddingLeft:"10px",
      borderColor: state.isFocused ? "#fb491d":"#cccccc",
      boxShadow: "0",
      "&:hover": {
        ...base,
        boxShadow: "0",
        borderColor: "#fb491d !important",
      }
    }),
    singleValue: (base, state) => ({
      ...base,
      color: "rgb(15 23 42 / var(--tw-text-opacity))",
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      color: "red",
    }),
    option: (base, state) => {
      return {
        ...base,
        background: state.isSelected ? "#fb491d" : state.isFocused ? "#fb491d50": "transparent",
        color: state.isSelected ? "white" : "grey",
      };
    },
  };
  
  return (

    <Select
    instanceId={'marcas'}
    styles={customStyles}
    placeholder="Seleccione"
    options={allBrands}
    value={actualValue}
    onChange={handleBrandChange}
    isSearchable={true}
   ></Select>

    
  );
};
