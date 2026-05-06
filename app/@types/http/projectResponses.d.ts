export interface ProjectResponse {
    donateSum:   number;
    projectData: ProjectData;
}

export interface ProjectData {
    id:            number;
    title:         string;
    meta:          number;
    description:   string;
    focus:         string;
    target:        string;
    duration:      string;
    minInvestment: string;
    recipient:     string;
    bannerImage:   string;
    createdAt:     Date;
    updatedAt:     Date;
    ods:           Od[];
    resources:     any[];
    tags:          Tag[];
    challanges:    any[];
    donates:       any[];
}

export interface Od {
    id:        number;
    content:   number;
    projectId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Tag {
    id:        number;
    content:   string;
    projectId: number;
    createdAt: Date;
    updatedAt: Date;
}
