function createRecursiveTreemapEngine(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    function calculateTreeValues(node) {
        if (node.children && node.children.length > 0) {
            node.children.forEach(calculateTreeValues);
            node.value = node.children.reduce((sum, child) => sum + (child.value || 0), 0);
            node.children.sort((a, b) => b.value - a.value);
        }
    }

    function getWorstRatio(row, rect, scaleFactor) {

    // If there are no rectangles in the row,
    // return Infinity so the first rectangle is always accepted.
    if (row.length == 0) {
        return Infinity;
    }

    // Step 1: Calculate the total value of the row
    var totalValue = 0;

    for (var i = 0; i < row.length; i++) {
        totalValue = totalValue + row[i].value;
    }

    // Step 2: Find the shorter side of the remaining rectangle
    var length = Math.min(rect.w, rect.h);

    if (length <= 0) {
        return Infinity;
    }

    // Step 3: Convert row value to pixel area
    var rowArea = totalValue * scaleFactor;

    // Step 4: Square the row area
    var rowAreaSquared = rowArea * rowArea;

    // Step 5: Square the shorter side
    var lengthSquared = length * length;

    // Step 6: Find the largest and smallest values
    var maxValue = row[0].value;
    var minValue = row[0].value;

    for (var i = 1; i < row.length; i++) {

        if (row[i].value > maxValue) {
            maxValue = row[i].value;
        }

        if (row[i].value < minValue) {
            minValue = row[i].value;
        }
    }

    // Step 7: Convert largest and smallest values into pixel areas
    var largestArea = maxValue * scaleFactor;
    var smallestArea = minValue * scaleFactor;

    // Step 8: Calculate the two aspect-ratio expressions
    var ratio1 = (lengthSquared * largestArea) / rowAreaSquared;

    var ratio2 = rowAreaSquared / (lengthSquared * smallestArea);

    // Step 9: Return the worst (largest) ratio
    return Math.max(ratio1, ratio2);
}

    function positionElements(row, rect, scaleFactor) {
        const totalValue = row.reduce((sum, n) => sum + n.value, 0);
        const rowArea = totalValue * scaleFactor;
        const isHorizontal = rect.w >= rect.h;
        
        let currentX = rect.x, currentY = rect.y;
        let rowWidth = 0;
        let rowHeight = 0;

        if (isHorizontal) {
            if (rect.h > 0) {
                rowWidth = rowArea / rect.h;
            } else {
                rowWidth = 0;
            }
            rowHeight = rect.h;
        } else {
            rowWidth = rect.w;
            if (rect.w > 0) {
                rowHeight = rowArea / rect.w;
            } else {
                rowHeight = 0;
            }
        }

        let placements = [];
        for (const node of row) {
            const nodeArea = node.value * scaleFactor;
            if (isHorizontal) {
                let nodeH = 0;
                if (rowWidth > 0) {
                    nodeH = nodeArea / rowWidth;
                }
                placements.push({ node, rect: { x: currentX, y: currentY, w: rowWidth, h: nodeH } });
                currentY += nodeH;
            } else {
                let nodeW = 0;
                if (rowHeight > 0) {
                    nodeW = nodeArea / rowHeight;
                }
                placements.push({ node, rect: { x: currentX, y: currentY, w: nodeW, h: rowHeight } });
                currentX += nodeW;
            }
        }
        return placements;
    }

    function cutRectSpace(row, rect, scaleFactor) {
        const totalValue = row.reduce((sum, n) => sum + n.value, 0);
        const rowArea = totalValue * scaleFactor;
        
        if (rect.w >= rect.h) {
            let rowWidth = 0;
            if (rect.h > 0) {
                rowWidth = rowArea / rect.h;
            }
            return { x: rect.x + rowWidth, y: rect.y, w: Math.max(0, rect.w - rowWidth), h: rect.h };
        } else {
            let rowHeight = 0;
            if (rect.w > 0) {
                rowHeight = rowArea / rect.w;
            }
            return { x: rect.x, y: rect.y + rowHeight, w: rect.w, h: Math.max(0, rect.h - rowHeight) };
        }
    }

    function computeSquarifiedLayout(nodes, rect, scaleFactor) {
        let queue = [...nodes];
        let currentRow = [];
        let currentRect = { ...rect };
        let layoutResults = [];

        while (queue.length > 0) {
            const nextNode = queue[0];
            const proposedRow = [...currentRow, nextNode];

            const currentWorst = getWorstRatio(currentRow, currentRect, scaleFactor);
            const proposedWorst = getWorstRatio(proposedRow, currentRect, scaleFactor);

            if (currentRow.length === 0 || proposedWorst <= currentWorst) {
                currentRow.push(queue.shift());
            } else {
                layoutResults.push(...positionElements(currentRow, currentRect, scaleFactor));
                currentRect = cutRectSpace(currentRow, currentRect, scaleFactor);
                currentRow = [];
            }
        }

        if (currentRow.length > 0) {
            layoutResults.push(...positionElements(currentRow, currentRect, scaleFactor));
        }

        return layoutResults;
    }

    function drawWrappedText(text, centerX, startY, maxWidth, fontSize) {
        const words = text.split(" ");
        let lines = [];
        let currentLine = words[0];

        ctx.font = `600 ${fontSize}px sans-serif`;

        for (let i = 1; i < words.length; i++) {
            let testLine = currentLine + " " + words[i];
            if (ctx.measureText(testLine).width > maxWidth) {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);

        lines.forEach((line, index) => {
            ctx.fillText(line, centerX, startY + (index * (fontSize * 1.25)));
        });

        return lines.length * (fontSize * 1.25);
    }

    function renderNode(node, rect, depth) {
        if (rect.w <= 2 || rect.h <= 2) return;

        ctx.save();
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.w, rect.h);
        ctx.clip();

        const hasChildren = node.children && node.children.length > 0;

        // Use the color from data.json, falling back to clean defaults if missing
        if (depth === 0) {
            ctx.fillStyle = node.color || '#090d16'; 
        } else {
            ctx.fillStyle = node.color || '#111625';
        }
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);

        // Framing structural borders
        ctx.strokeStyle = '#090d16';
        ctx.lineWidth = Math.max(1, 4 - depth * 0.75);
        ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

        const headerHeight = hasChildren ? Math.max(18, 36 - (depth * 4)) : 0;

        if (rect.w > 35 && rect.h > 25) {
            if (hasChildren) {
                // Category Structural Headers
                ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
                ctx.fillRect(rect.x, rect.y, rect.w, headerHeight);
                
                ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                ctx.font = `bold ${Math.max(10, 14 - depth)}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(node.name.toUpperCase(), rect.x + (rect.w / 2), rect.y + (headerHeight / 2));
            } else {
                // Leaf Node text balancing
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const areaFactor = Math.min(rect.w, rect.h);
                const titleFontSize = Math.min(18, Math.max(11, Math.floor(areaFactor * 0.07)));
                const valueFontSize = Math.min(24, Math.max(13, Math.floor(areaFactor * 0.09)));

                const centerX = rect.x + (rect.w / 2);

                if (rect.h > 60 && rect.w > 100) {
                    ctx.fillStyle = '#ffffff';
                    const estimatedTextHeight = drawWrappedText(node.name, centerX, rect.y + (rect.h * 0.25), rect.w - 16, titleFontSize);

                    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
                    ctx.font = `bold ${valueFontSize}px monospace`;
                    ctx.fillText(`$${node.value.toLocaleString()}`, centerX, rect.y + (rect.h * 0.4) + estimatedTextHeight);
                } else {
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'top';
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '600 11px sans-serif';

                    let label = node.name;
                    if (ctx.measureText(label).width > (rect.w - 12)) {
                        label = label.substring(0, Math.floor((rect.w - 12) / 6.5)) + '...';
                    }
                    ctx.fillText(label, rect.x + 6, rect.y + 6);

                    if (rect.h > 26) {
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                        ctx.font = '9px monospace';
                        ctx.fillText(`$${node.value.toLocaleString()}`, rect.x + 6, rect.y + 18);
                    }
                }
            }
        }

        // Deeper nested recursion steps
        if (hasChildren) {
            const pad = 3; 
            const innerRect = {
                x: rect.x + pad,
                y: rect.y + headerHeight + pad,
                w: rect.w - (pad * 2),
                h: rect.h - headerHeight - (pad * 2)
            };

            if (innerRect.w > 0 && innerRect.h > 0) {
                const localScale = (innerRect.w * innerRect.h) / node.value;
                const innerPlacements = computeSquarifiedLayout([...node.children], innerRect, localScale);

                innerPlacements.forEach((placement) => {
                    renderNode(placement.node, placement.rect, depth + 1);
                });
            }
        }

        ctx.restore();
    }

    function layout(root, width = 1000, height = 600) {
        canvas.width = width;
        canvas.height = height;
        calculateTreeValues(root);

        ctx.fillStyle = '#090d16';
        ctx.fillRect(0, 0, width, height);

        if (!root.children || root.children.length === 0) return;
        renderNode(root, { x: 0, y: 0, w: width, h: height }, 0);
    }

    return { layout };
}

// Runtime async loader initialization
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const financialData = await response.json();

        const engine = createRecursiveTreemapEngine('treemapCanvas');
        if (engine) {
            engine.layout(financialData, 1000, 600);
        }
    } catch (error) {
        console.error("Critical error mapping or displaying financial structures:", error);
    }
});