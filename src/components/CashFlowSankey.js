
"use client";
import { ResponsiveSankey } from '@nivo/sankey';

export default function CashFlowSankey({ data }) {
    // data expected: { nodes: [], links: [] }

    if (!data || data.nodes.length === 0) {
        return <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>No data available for visualization</div>;
    }

    return (
        <div style={{ height: '500px' }}>
            <ResponsiveSankey
                data={data}
                margin={{ top: 20, right: 160, bottom: 20, left: 160 }}
                align="justify"
                colors={{ scheme: 'category10' }} // Simple scheme for now, can perform custom theming later
                nodeOpacity={1}
                nodeHoverOthersOpacity={0.35}
                nodeThickness={18}
                nodeSpacing={24}
                nodeBorderWidth={0}
                nodeBorderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.8]],
                }}
                linkOpacity={0.5}
                linkHoverOthersOpacity={0.1}
                linkContract={3}
                enableLinkGradient={true}
                labelPosition="outside"
                labelOrientation="horizontal"
                labelPadding={16}
                labelTextColor={{
                    from: 'color',
                    modifiers: [['darker', 1]],
                }}
                theme={{
                    text: {
                        fontSize: 12,
                        fontWeight: 600,
                        fill: '#333',
                    },
                    tooltip: {
                        container: {
                            background: '#ffffff',
                            color: '#333333',
                            fontSize: '12px',
                        },
                    },
                }}
            />
        </div>
    );
}
