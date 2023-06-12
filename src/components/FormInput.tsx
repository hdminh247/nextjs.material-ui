// External
import React, { useEffect, useState } from "react";
import clsx from "clsx";

import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import ErrorMessage from "./ErrorMessage";
import { Controller } from "react-hook-form";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";

export default function FormInput(props: CustomTextFieldProps) {
  const customProps = { ...props };
  // Delete invalid props for text field so that material ui wont complain with any alert
  delete customProps.control;
  delete customProps.errors;
  delete customProps.defaultValue;
  delete customProps.setValueFn;
  delete customProps.googleAutoComplete;
  delete customProps.referenceFields;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Get desired component from google autocomplete results
  const getAutoCompleteComponentData = (data: any, name: string) => {
    const componentData = data.address_components.filter((item: any) => item.types.includes(name));
    return componentData[0];
  };

  // Set referenced autocomplete fields
  const setAutoCompleteFields = (fields: AutoCompleteReferenceFields[], data: any, setFunction: any) => {
    fields.map((field) => {
      const componentValue = getAutoCompleteComponentData(data, field.referenceField);
      if (componentValue) {
        // If match list is set, do compare first
        if (field.matchList) {
          const matchedValue = field.matchList.filter((item) => item.value === componentValue.long_name);

          // Set value if this auto complete result exists in match list
          if (matchedValue.length > 0) {
            setFunction(field.fieldName, componentValue.long_name);
          }
        } else {
          setFunction(field.fieldName, componentValue.long_name);
        }
      }
    });
  };

  useEffect(() => {
    if (props.googleAutoComplete) {
      const options = {
        types: props.googleAutoComplete,
      };

      // Create the search box and link it to the UI element.
      const input = document.getElementById(props.id as string) as HTMLInputElement;
      const searchBox = new google.maps.places.Autocomplete(input, options);

      // Set place value
      const setPlaceValue = () => {
        const place = searchBox.getPlace();

        if (!place) {
          return;
        }

        if (props.name === "formatted_address") {
          props.setValueFn(props.name, place.formatted_address);
        } else {
          props.setValueFn(props.name, place.name);
        }

        // If referenced field is set
        if (props.referenceFields) {
          setAutoCompleteFields(props.referenceFields as AutoCompleteReferenceFields[], place, props.setValueFn);
        }
      };

      searchBox.addListener("place_changed", setPlaceValue);

      if (!props.defaultValue) {
        setTimeout(() => {
          // Remove input focus class, By default, adding google search to input field will active focus state of input
          const label = document.querySelectorAll(`.form-control-${props.id} label`);
          label[0].classList.remove("MuiInputLabel-shrink");

          const input = document.querySelectorAll(`.form-control-${props.id} input`);
          input[0].classList.remove("pac-target-input");
        }, 100);
      }

      return () => searchBox.unbindAll();
    } else {
      return () => {};
    }
  }, []);

  return (
    <Controller
      name={props.name || ""}
      control={props.control}
      defaultValue={props.defaultValue}
      render={({ value, onChange }) => {
        return (
          <>
            {customProps.type !== "password" && (
              <TextField
                {...customProps}
                className={clsx(
                  props.className,
                  `form-control-${props.id}`,
                  `${props.errors && props.errors.message ? "error" : ""}`,
                )}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
              />
            )}

            {customProps.type === "password" && (
              <FormControl
                variant="outlined"
                fullWidth
                className={clsx(props.className, `${props.errors && props.errors.message ? "error" : ""}`)}
              >
                <TextField
                  label={customProps.label}
                  id={props.id}
                  {...customProps}
                  className={clsx(props.className, `${props.errors && props.errors.message ? "error" : ""}`)}
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            )}
            <ErrorMessage>{props.errors && props.errors.message}</ErrorMessage>
          </>
        );
      }}
    />
  );
}

type CustomTextFieldProps = TextFieldProps & {
  control: any;
  errors: any;
  setValueFn?: any;
  googleAutoComplete?: string[];
  referenceFields?: AutoCompleteReferenceFields[];
};

interface ListItem {
  label: string;
  value: string;
}

interface AutoCompleteReferenceFields {
  fieldName: string; // Form field name
  referenceField: string; // Autocomplete result fields
  matchList?: ListItem[];
}
