export class Task {

    id: number;
    description: string;
    status: string;
    attachedFile: string;
    filename: string;

    constructor(description: string) {
        this.id = null;
        this.description = description;
        this.status = "PENDING";
        this.attachedFile = null;
        this.filename = null;
    }
    
}