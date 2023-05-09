
enum ProjectItemMethodologyName {
    OWSTG = "OWSTG",
    CUSTOM = "CUSTOM"
}


interface ProjectItem {
    id: string;
    name: string;
    description: string;
    url: string;
    methodology: ProjectItemMethodologyName;
}