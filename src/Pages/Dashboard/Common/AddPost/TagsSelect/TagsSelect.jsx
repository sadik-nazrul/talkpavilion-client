// import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const animatedComponents = makeAnimated();

const TagsSelect = ({ control }) => {
  return (
    <Controller
      name="tags"
      control={control}
      rules={{ required: "You must select any tag or write any tag" }}
      render={({ field }) => (
        <CreatableSelect
          {...field}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
        />
      )}
    />
  );
};

export default TagsSelect;
