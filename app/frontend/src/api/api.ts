import { AskRequest, AskResponse, ChatRequest, FeedbackRequest, FeedbackResponse, SasTokenResponse } from "./models";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export async function askApi(options: AskRequest): Promise<AskResponse> {
    const response = await fetch("/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            question: options.question,
            approach: options.approach,
            overrides: {
                semantic_ranker: options.overrides?.semanticRanker,
                semantic_captions: options.overrides?.semanticCaptions,
                top: options.overrides?.top,
                temperature: options.overrides?.temperature,
                prompt_template: options.overrides?.promptTemplate,
                prompt_template_prefix: options.overrides?.promptTemplatePrefix,
                prompt_template_suffix: options.overrides?.promptTemplateSuffix,
                exclude_category: options.overrides?.excludeCategory
            }
        })
    });

    const parsedResponse: AskResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }

    return parsedResponse;
}

export async function chatApi(options: ChatRequest): Promise<AskResponse> {
    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            history: options.history,
            approach: options.approach,
            overrides: {
                semantic_ranker: options.overrides?.semanticRanker,
                semantic_captions: options.overrides?.semanticCaptions,
                top: options.overrides?.top,
                temperature: options.overrides?.temperature,
                prompt_template: options.overrides?.promptTemplate,
                prompt_template_prefix: options.overrides?.promptTemplatePrefix,
                prompt_template_suffix: options.overrides?.promptTemplateSuffix,
                exclude_category: options.overrides?.excludeCategory,
                suggest_followup_questions: options.overrides?.suggestFollowupQuestions
            }
        })
    });

    const parsedResponse: AskResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }
    console.log(parsedResponse);
    return parsedResponse;
}

export async function feedbackApi(options: FeedbackRequest): Promise<FeedbackResponse> {
    const response = await fetch("/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: options.name,
            email: options.email,
            link: options.link,
            documenttype: options.documenttype,
            filetype: options.filetype,
            service: options.service,
            generalfeedback: options.generalfeedback
        })
    });

    const parsedResponse: FeedbackResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }

    return parsedResponse;
}

export async function sasTokenApi(): Promise<SasTokenResponse> {
    const response = await fetch("/generate_sas_token", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const parsedResponse: SasTokenResponse = await response.json();
    if (response.status > 299 || !response.ok) {
        throw Error(parsedResponse.error || "Unknown error");
    }

    return parsedResponse;
}

export function getCitationFilePath(citation: string): string {
    return `/content/${citation}`;
}

// return list of blobs in container to display
export async function getBlobsInContainer(containerClient: ContainerClient, storageAccountName: string, containerName: string, sasToken: string) {
    const returnedBlobUrls = [];

    // get list of blobs in container
    // eslint-disable-next-line
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log(`${blob.name}`);

        const blobItem = {
            url: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`,
            name: blob.name
        };

        // if image is public, just construct URL
        returnedBlobUrls.push(blobItem);
    }

    return returnedBlobUrls;
}

const createBlobInContainer = async (containerClient: ContainerClient, file: File) => {
    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);
    const options = { blobHTTPHeaders: { blobContentType: file.type, "Access-Control-Allow-Origin": "*" } };

    // upload file
    await blobClient.uploadData(file, options);
};

export async function uploadFileToBlob(containerClient: ContainerClient, file: File | null): Promise<void> {
    if (!file) return;

    // upload file
    await createBlobInContainer(containerClient, file);
}
