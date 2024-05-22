export default (json_string) => {
    const left_padding = 3;
    let json_string_holder = "";
    const json_display = document.getElementById("json-sample-display");
    for (let i = 0; i < json_string.length; i++) {
        json_string_holder += json_string[i];
        if (json_string[i] === "{") {
            json_string_holder += "\n";
            json_string_holder += json_string[i].padStart(json_string[i].length + left_padding, " ");
        }
    }
    console.log(json_string_holder);
};
