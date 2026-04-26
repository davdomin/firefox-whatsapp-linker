/**
 * WhatsApp Quick Connect - Content Script (Secure Version)
 */

const PHONE_REGEX = /\+?(\d{1,4})?[-.\s]?\(?\d{2,4}?\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g;

const processTextNodes = (rootNode) => {
    const walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                const parent = node.parentNode.tagName;
                const forbiddenTags = ['SCRIPT', 'STYLE', 'A', 'TEXTAREA', 'INPUT'];
                return forbiddenTags.includes(parent) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    let currentNode;
    const nodesToReplace = [];

    while (currentNode = walker.nextNode()) {
        if (PHONE_REGEX.test(currentNode.nodeValue)) {
            nodesToReplace.push(currentNode);
        }
    }

    nodesToReplace.forEach(node => {
        const text = node.nodeValue;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;

        // Reset regex index for safety
        PHONE_REGEX.lastIndex = 0;

        while ((match = PHONE_REGEX.exec(text)) !== null) {
            // Add text before the match
            fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));

            // Create the secure Anchor element
            const anchor = document.createElement('a');
            const cleanNumber = match[0].replace(/\D/g, '');
            
            anchor.href = `https://wa.me/${cleanNumber}`;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.textContent = match[0]; // Safe way to add text
            
            // Inline styles
            anchor.style.color = "#25D366";
            anchor.style.textDecoration = "underline";
            anchor.style.fontWeight = "bold";

            fragment.appendChild(anchor);
            lastIndex = PHONE_REGEX.lastIndex;
        }

        // Add remaining text
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        node.parentNode.replaceChild(fragment, node);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => processTextNodes(document.body));
} else {
    processTextNodes(document.body);
}
