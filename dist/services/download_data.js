export default async (content, filename) => {
    const link = document.createElement("a");
    const blob = new Blob([content], { type: "application/json" });
    link.href = URL.createObjectURL(blob); // refering to the blob that is stored in memory that is of type json
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
};
