export interface ToolButton {
  label: string;
  icon: string | React.ReactNode;
  block?: (createBlock: any) => any;
  action?: (createBlock: any) => any;
}

export interface ToolSection {
  title: string;
  tools?: ToolButton[];
  component?: string; // Nombre del componente: "ImageUploader" etc.
}
