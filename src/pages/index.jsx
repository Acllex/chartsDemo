import React, {useEffect, useRef} from "react";
import G6 from "@antv/g6";

let image =
    "https://img0.baidu.com/it/u=1112177004,2217677822&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";
const data = {
    // 节点的先后顺序与位置有关，应该从左到右，从上到下列举
    nodes: [
        {id: "yy", name: "张爷爷", appellation: "爷爷", layer: 0},
        {id: "nn", name: "张奶奶", appellation: "奶奶", layer: 0},
        {id: "wg", name: "张外公", appellation: "外公", layer: 0},
        {id: "wp", name: "张外婆", appellation: "外婆", layer: 0},
        {id: "gg", name: "张姑姑", appellation: "姑姑", layer: 1},
        {id: "bb", name: "张爸爸", appellation: "爸爸", layer: 1},
        {id: "mm", name: "张妈妈", appellation: "妈妈", layer: 1},
        {id: "jj", name: "张舅舅", appellation: "舅舅", layer: 1},
        {id: "jm", name: "张舅妈", appellation: "舅妈", layer: 1},
        {id: "w", name: "张一", appellation: "我", layer: 2},
        {id: "qz", name: "张妻子", appellation: "妻子", layer: 2},
        {id: "bd", name: "张表弟", appellation: "表弟", layer: 2},
        {id: "nx", name: "张女婿", appellation: "女婿", layer: 3},
        {id: "ne", name: "张女儿", appellation: "女儿", layer: 3},
        {id: "ez", name: "张儿子", appellation: "儿子", layer: 3},
        {id: "ex", name: "张儿媳", appellation: "儿媳", layer: 3},
        {id: "wsn", name: "张外孙女", appellation: "外孙女", layer: 4},
        {id: "sz", name: "张孙子", appellation: "孙子", layer: 4},
    ],
    edges: [
        {source: "yy", target: "gg"},
        {source: "yy", target: "bb"},
        {source: "nn", target: "bb"},
        {source: "nn", target: "gg"},
        {source: "wg", target: "mm"},
        {source: "wg", target: "jj"},
        {source: "wp", target: "mm"},
        {source: "wp", target: "jj"},
        {source: "bb", target: "w"},
        {source: "mm", target: "w"},
        {source: "jj", target: "bd"},
        {source: "jm", target: "bd"},
        {source: "w", target: "ez"},
        {source: "w", target: "ne"},
        {source: "qz", target: "ez"},
        {source: "qz", target: "ne"},
        {source: "ez", target: "sz"},
        {source: "ex", target: "sz"},
        {source: "ne", target: "wsn"},
        {source: "nx", target: "wsn"},
    ],
};

function FamilyRelationshipChart() {
    const FamilyRelationshipChartRef = useRef();

    const drawChart = () => {
        const container = FamilyRelationshipChartRef.current;
        if (!container) return;
        const {clientWidth: width = 0, clientHeight: height = 0} =
            FamilyRelationshipChartRef.current;
        console.log(width, height, "container");

        G6.registerNode(
            "custom-node",
            {
                options: {
                    anchorPoints: [
                        [0.5, 0],
                        [0.5, 1],
                    ],
                },
                draw(cfg, group) {
                    const rect = group.addShape("circle", {
                        attrs: {
                            x: -50,
                            y: -50,
                            r: 50,
                            stroke: cfg.appellation === "我" ? "#059669" : "#5584ff",
                            fill: cfg.appellation === "我" ? "#059669" : "#5584ff",
                            lineWidth: 6,
                            cursor: "pointer",
                        },
                        name: "circle-shape",
                    });
                    if (cfg.name) {
                        group.addShape("text", {
                            attrs: {
                                text: cfg.name,
                                x: -50,
                                y: 18,
                                fill: cfg.appellation === "我" ? "#059669" : "#5584ff",
                                fontSize: 18,
                                textAlign: "center",
                                textBaseline: "middle",
                                fontWeight: "bold",
                            },
                            name: "text-shape",
                        });
                        group.addShape("text", {
                            attrs: {
                                text: cfg.appellation,
                                x: -50,
                                y: 38,
                                fill: "#059669",
                                fontSize: 16,
                                textAlign: "center",
                                textBaseline: "middle",
                                fontWeight: "bold",
                            },
                            name: "text-shape",
                        });
                        group
                            .addShape("image", {
                                attrs: {
                                    x: -100,
                                    y: -100,
                                    width: 100,
                                    height: 100,
                                    img: image,
                                    type: "circle",
                                },
                                name: "image-shape",
                            })
                            .setClip({
                                type: "circle", // 支持 circle、rect、ellipse、Polygon 及自定义 path clip
                                attrs: {
                                    r: 50,
                                    x: -50,
                                    y: -50,
                                },
                            });
                    }
                    return rect;
                },
            },
            "rect"
        );

        const graph = new G6.Graph({
            container,
            width,
            height,
            layout: {
                type: "dagre",
                nodesep: 50, // 节点间距
                ranksep: 40, // 层间距
                // controlPoints: false, // 是否保留布局连线的控制点
            },
            defaultNode: {
                type: "custom-node",
            },
            defaultEdge: {
                type: "line",
                style: {
                    //   radius: 20,
                    offset: 45,
                    lineWidth: 2,
                    stroke: "#afafaf",
                },
                sourceAnchor: 1,
                targetAnchor: 0,
            },
            nodeStateStyles: {
                selected: {
                    stroke: "#34D399",
                    fill: "#34D399",
                },
            },
            modes: {
                default: [
                    // "drag-canvas",
                    // "zoom-canvas",
                    // "click-select",
                    {
                        type: "tooltip",
                        formatText(model) {
                            console.log(model, "MODEL"); // const cfg = model.conf; // const text = []; // cfg.forEach((row) => { //     text.push(row.name + ":" + row.appellation + "<br>"); // });
                            return `${model.appellation}:${model.name}`;
                        },
                        offset: 30,
                    },
                ],
            },
            fitView: true,
        });
        graph.data(data);
        graph.render();

        // graph.on("node:click", (e) => {
        //   console.log(e.item._cfg.model);
        // });
    };

    useEffect(() => {
        drawChart();
    }, []);
    return (
        <div style={{width: "1000px", height: "600px"}}>

            <div
                style={{width: "100%", height: "100%"}}
                ref={FamilyRelationshipChartRef}
            ></div>

        </div>
    );
}

export default FamilyRelationshipChart;
