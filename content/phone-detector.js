/**
 * WhatsApp Quick Connect - Content Script
 * Scans the DOM for phone numbers and wraps them in WhatsApp API links.
 */

const PHONE_REGEX = /\+?(\d{1,4})?[-.\s]?\(?\d{2,4}?\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g;

const processTextNodes = (rootNode) => {
    const walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                // Skip script, style, and existing anchor tags
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
        const span = document.createElement('span');
        span.className = 'wa-quick-connect-container';
        
        span.innerHTML = node.nodeValue.replace(PHONE_REGEX, (match) => {
            const cleanNumber = match.replace(/\D/g, '');
            return `<a href="https://wa.me/${cleanNumber}" 
                       target="_blank" 
                       title="Send WhatsApp message"
                       style="color: #25D366 !important; text-decoration: underline !important; font-weight: bold !important; cursor: pointer !important;">
                       ${match}
                    </a>`;
        });
        
        node.parentNode.replaceChild(span, node);
    });
};

// Execute once the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => processTextNodes(document.body));
} else {
    processTextNodes(document.body);
}
