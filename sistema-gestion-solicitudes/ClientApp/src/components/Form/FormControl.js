import React from "react";
import Input from "./Input";
import Checkbox from "./CheckBox";
import Select from "./Select";
import TextArea from "./TextArea";
import FileInput from "./File";
import DateTimePicker from "./Datetime";
import FormikAutocomplete from "./MultiSelect";
import RadioButton from "./RadioButton";

const FormikControl = (props) => {
    var { control,disabled, ...rest } = props;

    if(disabled==undefined) {
        disabled = false;
    }

    switch (control) {
        case "input":
            return <Input disabled={disabled} {...rest} />;
        case "checkbox":
            return <Checkbox {...rest} />;
        case "radiobutton":
            return <RadioButton {...rest} />;
        case "select":
            return <Select {...rest} />;
        case "textarea":
            return <TextArea {...rest} />;
        case 'file':
            return <FileInput {...rest} accept=".pdf, application/pdf" />;
        case "datetime":
            return <DateTimePicker {...rest} />;
        case "autocomplete":
            return <FormikAutocomplete {...rest} />;
        default:
            return null;
    }
};

export default FormikControl;