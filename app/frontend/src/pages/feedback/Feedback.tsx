import React, { useState } from "react";
import { feedbackApi, FeedbackRequest } from "../../api";

type FeedbackFormProps = {};

const FeedbackForm: React.FC<FeedbackFormProps> = () => {
    const [name, setName] = useState("");
    const [documentLink, setDocumentLink] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [service, setService] = useState("");
    const [feedback, setFeedback] = useState("");

    const makeApiRequest = async (name: string, documentLink: string, documentType: string, service: string, feedback: string) => {
        const request: FeedbackRequest = {
            name: name,
            link: documentLink,
            documenttype: documentType,
            service: service,
            generalfeedback: feedback
        };
        const result = await feedbackApi(request);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Name:", name);
        console.log("Document Link:", documentLink);
        console.log("Document Type:", documentType);
        console.log("Service:", service);
        console.log("Feedback:", feedback);
        makeApiRequest(name, documentLink, documentType, service, feedback);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Document Link:
                <input type="text" value={documentLink} onChange={e => setDocumentLink(e.target.value)} />
            </label>
            <br />
            <label>
                Document Type:
                <input type="text" value={documentType} onChange={e => setDocumentType(e.target.value)} />
            </label>
            <br />
            <label>
                Service:
                <input type="text" value={service} onChange={e => setService(e.target.value)} />
            </label>
            <br />
            <label>
                Feedback:
                <textarea value={feedback} onChange={e => setFeedback(e.target.value)} />
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
    );
};

export default FeedbackForm;
