interface ColorsInterface {
  Background: { light: string; dark: string };
  Surface: { light: string; dark: string };
  Surface_Elevated: { light: string; dark: string };
  Primary_Text: { light: string; dark: string };
  Secondary_Text: { light: string; dark: string };
  Positive: { light: string; dark: string };
  Negative: { light: string; dark: string };
  Accent: { light: string; dark: string };
}

const Colors: ColorsInterface = {
  Background: { light: "#ffffff", dark: "#000000" },
  Surface: { light: "#14171A", dark: "#000000" },
  Surface_Elevated: { light: "#1B1F23", dark: "#000000" },
  Primary_Text: { light: "#F5F7F8", dark: "#ffffff" },
  Secondary_Text: { light: "#8D959D", dark: "#cccccc" },
  Positive: { light: "#45D483", dark: "#3aa86d" },
  Negative: { light: "#FF5C67", dark: "#e54a54" },
  Accent: { light: "#8B7CFF", dark: "#7a6bff" },
};

export default Colors;
