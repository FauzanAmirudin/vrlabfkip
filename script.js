(function () {
    var script = {
        "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7,this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250], 'cardboardAvailable'); this.playList_B9854F8B_B7D2_C317_41D0_106CB9D56702.set('selectedIndex', 0); this.playList_B984FF8A_B7D2_C310_41DE_983912A47F87.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081].forEach(function(component) { component.set('visible', false); }) }",
        "horizontalAlign": "left",
        "scrollBarOpacity": 0.5,
        "height": "100%",
        "id": "rootPlayer",
        "children": [
            "this.MainViewer",
            "this.Container_B156A269_BF46_B846_41CC_86CDE6B7F756",
            "this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C",
            "this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1",
            "this.Container_320C1ADD_3F4A_FD16_41B0_FBCDFB126CCF",
            "this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B",
            "this.veilPopupPanorama",
            "this.zoomImagePopupPanorama",
            "this.closeButtonPopupPanorama"
        ],
        "scrollBarVisible": "rollOver",
        "overflow": "visible",
        "width": "100%",
        "scrollBarMargin": 2,
        "borderRadius": 0,
        "propagateClick": false,
        "minHeight": 20,
        "scrollBarWidth": 10,
        "desktopMipmappingEnabled": false,
        "mobileMipmappingEnabled": false,
        "paddingRight": 0,
        "vrPolyfillScale": 1,
        "verticalAlign": "top",
        "minWidth": 20,
        "layout": "absolute",
        "definitions": [{
            "frames": [
                {
                    "front": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/f/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/f/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/f/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "thumbnailUrl": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_t.jpg",
                    "class": "CubicPanoramaFrame",
                    "right": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/r/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/r/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/r/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "back": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/b/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/b/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/b/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "bottom": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/d/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/d/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/d/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "left": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/l/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/l/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/l/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "top": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/u/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/u/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0/u/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    }
                }
            ],
            "label": "IMG_20260427_113743_00_003",
            "hfovMin": "150%",
            "id": "panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF",
            "thumbnailUrl": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_t.jpg",
            "overlays": [
                "this.overlay_023878E1_1358_FC40_41B1_61AED61DED92",
                "this.overlay_B3BF056D_A5A4_AE34_41BA_41BBE1DBA020",
                "this.overlay_8160B648_A65D_AC99_41A7_32209B948706",
                "this.overlay_83CD99EC_A65B_E79A_41CA_94332AC5604E",
                "this.overlay_823F0070_A655_E48A_41B6_E5F9E26AB2F3",
                "this.overlay_826782AF_A657_6596_41E3_FF1B0C862F42",
                "this.overlay_8E9FD260_A655_648A_41E3_C9A0D8BE2727",
                "this.overlay_8E956AB5_A64F_A58A_4189_473DDF75B33E",
                "this.overlay_8220521D_A64B_A4BA_41D1_AC23B7254F1C",
                "this.overlay_829C99CD_A6CD_E79A_41E3_B79C8F667C5D",
                "this.overlay_80C891A4_A6CD_678A_41BE_0425CA4DEEA7"
            ],
            "partial": false,
            "adjacentPanoramas": [
                {
                    "backwardYaw": 111.63,
                    "yaw": -85.18,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D5F0D5_1349_CC43_414C_531D97C056B0"
                },
                {
                    "backwardYaw": -96.52,
                    "yaw": 86.69,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D01CC6_1348_3440_41A2_BD2321889440"
                }
            ],
            "hfov": 360,
            "pitch": 0,
            "vfov": 180,
            "mapLocations": [
                {
                    "map": "this.map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463",
                    "x": 805.64,
                    "angle": 86.13,
                    "class": "PanoramaMapLocation",
                    "y": 1656.86
                }
            ],
            "class": "Panorama",
            "hfovMax": 130
        },
        {
            "frames": [
                {
                    "front": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/f/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/f/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/f/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/f/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "thumbnailUrl": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_t.jpg",
                    "class": "CubicPanoramaFrame",
                    "right": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/r/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/r/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/r/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/r/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "back": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/b/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/b/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/b/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/b/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "bottom": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/d/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/d/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/d/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/d/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "left": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/l/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/l/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/l/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/l/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "top": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/u/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/u/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/u/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0/u/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    }
                }
            ],
            "label": "IMG_20260427_132730_00_053",
            "mapLocations": [
                {
                    "map": "this.map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463",
                    "x": 62.94,
                    "angle": 31.23,
                    "class": "PanoramaMapLocation",
                    "y": 1193.36
                }
            ],
            "id": "panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC",
            "thumbnailUrl": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_t.jpg",
            "overlays": [
                "this.overlay_3406C851_3A90_C762_41C0_9923C335D3DA",
                "this.overlay_280092E2_3A90_4B26_41B8_849A626A36B8",
                "this.overlay_81F77F44_A6CC_BC8A_41C2_5A1FFAEEEAA3"
            ],
            "partial": false,
            "adjacentPanoramas": [
                {
                    "backwardYaw": 179.62,
                    "yaw": 51.28,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D0788B_1348_5CC7_4191_217370E98EAE"
                }
            ],
            "hfov": 360,
            "pitch": 0,
            "vfov": 180,
            "hfovMax": 130,
            "class": "Panorama"
        },
        {
            "initialPosition": {
                "yaw": -2.64,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B97C5FC6_B7D2_C311_41CB_540D6BE6301F",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D62C92_A5A4_5EED_41D7_2EF607B123F3",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "frames": [
                {
                    "front": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/f/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/f/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/f/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "thumbnailUrl": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_t.jpg",
                    "class": "CubicPanoramaFrame",
                    "right": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/r/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/r/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/r/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "back": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/b/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/b/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/b/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "bottom": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/d/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/d/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/d/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "left": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/l/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/l/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/l/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "top": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/u/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/u/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0/u/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    }
                }
            ],
            "label": "IMG_20260427_113632_00_001",
            "mapLocations": [
                {
                    "map": "this.map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463",
                    "x": 658.03,
                    "angle": 83.84,
                    "class": "PanoramaMapLocation",
                    "y": 1195.5
                }
            ],
            "id": "panorama_1F3A89CE_1349_DC40_4197_496928E9DA69",
            "thumbnailUrl": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_t.jpg",
            "overlays": [
                "this.overlay_B9D4D43F_B718_CCC3_41DB_2A9B3A68EBF9",
                "this.overlay_850D0129_A654_A49B_41E0_47641C1D17B4",
                "this.overlay_84535071_A654_E48B_41E4_CA0083CF7895",
                "this.overlay_84019564_A65F_6C89_41DF_3A7A64F17D4E",
                "this.overlay_84F0807F_A65C_A576_41E2_A508969AE5E9",
                "this.overlay_859535D8_A65B_6FB9_41DB_AC8828A838EB",
                "this.overlay_848CA6DF_A655_6DB6_4194_F8838F17485B",
                "this.overlay_84BD6459_A654_ECBB_41D1_1141152DAA51",
                "this.overlay_848E56D6_A64C_AD89_41E3_EF2350427A26",
                "this.overlay_81767B91_A6CC_BB8A_41D7_652F73F66D09",
                "this.overlay_82150FC2_A6CC_9B8E_41DC_3D6253010306",
                "this.overlay_8E570427_A6CD_AC96_41C1_CF43028E66BF",
                "this.overlay_B82F88FC_B719_C544_41E2_419138950D4F"
            ],
            "partial": false,
            "adjacentPanoramas": [
                {
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA"
                },
                {
                    "backwardYaw": 176.6,
                    "yaw": 177.36,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7"
                },
                {
                    "backwardYaw": -162.62,
                    "yaw": 0,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D5F0D5_1349_CC43_414C_531D97C056B0"
                }
            ],
            "hfov": 360,
            "pitch": 0,
            "vfov": 180,
            "hfovMax": 130,
            "class": "Panorama"
        },
        {
            "frames": [
                {
                    "front": {
                        "levels": [
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/f/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/f/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/f/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/f/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "thumbnailUrl": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_t.jpg",
                    "class": "CubicPanoramaFrame",
                    "right": {
                        "levels": [
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/r/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/r/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/r/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/r/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "back": {
                        "levels": [
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/b/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/b/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/b/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/b/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "bottom": {
                        "levels": [
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/d/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/d/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/d/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/d/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "left": {
                        "levels": [
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/l/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/l/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/l/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/l/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "top": {
                        "levels": [
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/u/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/u/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/u/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0/u/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    }
                }
            ],
            "label": "IMG_20260427_125400_00_042",
            "mapLocations": [
                {
                    "map": "this.map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463",
                    "x": 404.47,
                    "angle": -84.96,
                    "class": "PanoramaMapLocation",
                    "y": 1204.93
                }
            ],
            "id": "panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7",
            "thumbnailUrl": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_t.jpg",
            "overlays": [
                "this.overlay_814C5679_A6CF_AD7A_41E2_3BC2EA75E59C",
                "this.overlay_800094C3_A6CF_6D8F_41E0_E5B42B8C7C3D"
            ],
            "partial": false,
            "adjacentPanoramas": [
                {
                    "backwardYaw": -6.99,
                    "yaw": -6.99,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D0788B_1348_5CC7_4191_217370E98EAE"
                },
                {
                    "backwardYaw": 177.36,
                    "yaw": 176.6,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_1F3A89CE_1349_DC40_4197_496928E9DA69"
                }
            ],
            "hfov": 360,
            "pitch": 0,
            "vfov": 180,
            "class": "Panorama",
            "hfovMax": 130
        },
        {
            "duration": 1000,
            "id": "effect_B3D66C92_A5A4_5EED_41E3_43370C97EB97",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "items": [
                {
                    "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
                    "media": "this.map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14",
                    "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer",
                    "class": "MapPlayListItem"
                }
            ],
            "id": "playList_B984FF8A_B7D2_C310_41DE_983912A47F87",
            "class": "PlayList"
        },
        {
            "duration": 1000,
            "id": "effect_B3D7BC92_A5A4_5EED_41D7_BE6C605EF077",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "items": [
                {
                    "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
                    "media": "this.map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463",
                    "player": "this.MapViewerMapPlayer",
                    "class": "MapPlayListItem"
                }
            ],
            "id": "playList_B984CF8A_B7D2_C310_41B7_2F40739FA2AD",
            "class": "PlayList"
        },
        {
            "buttonZoomOut": "this.IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291",
            "class": "MapPlayer",
            "buttonZoomIn": "this.IconButton_A7361280_BCBD_AC04_41C9_358137CF7140",
            "viewerArea": "this.MapViewer",
            "id": "MapViewerMapPlayer",
            "movementMode": "constrained"
        },
        {
            "initialPosition": {
                "yaw": 5.48,
                "class": "PanoramaCameraPosition",
                "pitch": -2.08
            },
            "class": "PanoramaCamera",
            "id": "panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_camera",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "initialPosition": {
                "yaw": -180,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B894003B_B7D2_DD70_41C4_68CD7C85C949",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D53C91_A5A4_5EEF_41E3_6A5CCCF1FF08",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "initialPosition": {
                "yaw": 4.34,
                "class": "PanoramaCameraPosition",
                "pitch": 0.94
            },
            "class": "PanoramaCamera",
            "displayOriginPosition": {
                "hfov": 165,
                "yaw": 4.34,
                "class": "RotationalCameraDisplayPosition",
                "pitch": -90,
                "stereographicFactor": 1
            },
            "id": "panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_camera",
            "initialSequence": {
                "class": "PanoramaCameraSequence",
                "movements": [
                    {
                        "targetYaw": 50.62,
                        "end": "this.showPopupImage(this.ImageResource_B827C0F9_B7CE_7B7E_418C_394F12DFAC68, null, '90%', '90%', this.FadeInEffect_B827F0F9_B7CE_7B7E_41CE_AE5B2CD04049, this.FadeOutEffect_B82780F9_B7CE_7B7E_41E2_D16468FF621D, {'pressedBackgroundOpacity':0.3,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconColor':'#888888','rollOverBorderSize':0,'backgroundOpacity':0.3,'iconWidth':20,'borderSize':0,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'iconHeight':20,'paddingBottom':5,'pressedBorderColor':'#000000','rollOverBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','iconColor':'#000000','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'pressedIconLineWidth':5,'pressedBorderSize':0,'rollOverBorderColor':'#000000','iconLineWidth':5,'rollOverBackgroundOpacity':0.3,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconHeight':20,'rollOverIconColor':'#666666','rollOverIconWidth':20,'pressedBackgroundColorDirection':'vertical','pressedIconWidth':20,'pressedIconHeight':20,'paddingRight':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconLineWidth':5,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderColor':'#000000'}, null, null, false)",
                        "class": "TargetPanoramaCameraMovement",
                        "path": "shortest",
                        "easing": "cubic_in_out",
                        "pitchSpeed": 17.05,
                        "targetPitch": 4.25,
                        "yawSpeed": 33.25
                    }
                ],
                "restartMovementOnUserInteraction": false
            },
            "displayMovements": [
                {
                    "duration": 1000,
                    "class": "TargetRotationalCameraDisplayMovement",
                    "easing": "linear"
                },
                {
                    "targetPitch": 0.94,
                    "targetStereographicFactor": 0,
                    "duration": 3000,
                    "class": "TargetRotationalCameraDisplayMovement",
                    "easing": "cubic_in_out"
                }
            ],
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D41C91_A5A4_5EEF_41D6_5CC73C694B5E",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "levels": [
                {
                    "url": "media/panduan_baru.png",
                    "width": 1024,
                    "class": "ImageResourceLevel",
                    "height": 585
                }
            ],
            "id": "ImageResource_B82CF0F6_B7CE_7B72_41C3_BE96B87E9996",
            "class": "ImageResource"
        },
        {
            "duration": 1000,
            "id": "effect_B3D6DC91_A5A4_5EEF_41E1_353B52D89CE8",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "levels": [
                {
                    "url": "media/panduan_baru.png",
                    "width": 1024,
                    "class": "ImageResourceLevel",
                    "height": 585
                }
            ],
            "id": "ImageResource_B827C0F9_B7CE_7B7E_418C_394F12DFAC68",
            "class": "ImageResource"
        },
        {
            "initialPosition": {
                "yaw": -68.37,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B9099FE0_B7D2_C310_41E0_02DDD0A69F91",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "initialPosition": {
                "yaw": 164.32,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B8E4102C_B7D2_DD11_41B4_2D0F8530D664",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "frames": [
                {
                    "front": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/f/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/f/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/f/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "thumbnailUrl": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_t.jpg",
                    "class": "CubicPanoramaFrame",
                    "right": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/r/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/r/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/r/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "back": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/b/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/b/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/b/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "bottom": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/d/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/d/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/d/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "left": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/l/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/l/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/l/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "top": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/u/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/u/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0/u/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    }
                }
            ],
            "label": "IMG_20260427_113710_00_002",
            "hfovMin": "150%",
            "id": "panorama_18D5F0D5_1349_CC43_414C_531D97C056B0",
            "thumbnailUrl": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_t.jpg",
            "overlays": [
                "this.overlay_B9CFD241_B718_44BC_41E1_1F979402BBF3",
                "this.overlay_849C3F49_A67D_9C9A_41E1_8FD94536211F",
                "this.overlay_8330B47B_A677_6D7E_41D0_7661F675535D",
                "this.overlay_812B1E83_A674_9D8F_41E4_9FC55CCDB7CE",
                "this.overlay_83BE67B5_A64B_AB8B_418F_D50BB9FB73B9",
                "this.overlay_82D9D76D_A64D_EC9A_41B7_C3682516990B",
                "this.overlay_8159377D_A64D_AB7B_41C3_AA26CFC8B822",
                "this.overlay_82A180AA_A654_A59E_41D2_0D6EB0052B2E",
                "this.overlay_83385661_A655_EC8A_41CC_00DD78F35CCE",
                "this.overlay_830815C4_A65D_AF89_41C6_DED740C5D2E8",
                "this.overlay_82321A0C_A65F_649A_41CB_EFB9F583E6F9",
                "this.overlay_81B7FD45_A6CB_9C8B_41D3_98901F1014E0",
                "this.overlay_81A6D461_A6CB_6C8A_41DF_BB7A691F3527",
                "this.overlay_81457F0C_A6F4_BC9A_41B1_E5049EF2A302"
            ],
            "partial": false,
            "adjacentPanoramas": [
                {
                    "backwardYaw": -15.68,
                    "yaw": 46.46,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA"
                },
                {
                    "backwardYaw": 0,
                    "yaw": -162.62,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_1F3A89CE_1349_DC40_4197_496928E9DA69"
                },
                {
                    "backwardYaw": -85.18,
                    "yaw": 111.63,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF"
                }
            ],
            "hfov": 360,
            "pitch": 0,
            "vfov": 180,
            "mapLocations": [
                {
                    "map": "this.map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463",
                    "x": 792.29,
                    "angle": 88.87,
                    "class": "PanoramaMapLocation",
                    "y": 1191.4
                }
            ],
            "class": "Panorama",
            "hfovMax": 130
        },
        {
            "duration": 1000,
            "id": "effect_B3D18C94_A5A4_5E14_41D8_FCB3FFFC3339",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "initialPosition": {
                "yaw": -3.21,
                "class": "PanoramaCameraPosition",
                "pitch": -2.64
            },
            "class": "PanoramaCamera",
            "id": "panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_camera",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "initialPosition": {
                "yaw": 173.01,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B94C7FBD_B7D2_C373_41DF_6B17A83C80E2",
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D7BC94_A5A4_5E14_41D9_C71B3B268653",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "initialPosition": {
                "yaw": 42.12,
                "class": "PanoramaCameraPosition",
                "pitch": 2.46
            },
            "class": "PanoramaCamera",
            "id": "panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_camera",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D72C92_A5A4_5EED_41E1_525D83C18BC8",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D57C91_A5A4_5EEF_41E3_2066C4CEC116",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D5FC91_A5A4_5EEF_41D4_23A05265552B",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "initialPosition": {
                "yaw": -133.54,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B95DBFB4_B7D2_C371_4193_AA7E344616BE",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "initialPosition": {
                "yaw": -6.04,
                "class": "PanoramaCameraPosition",
                "pitch": -3.59
            },
            "class": "PanoramaCamera",
            "id": "panorama_18D0788B_1348_5CC7_4191_217370E98EAE_camera",
            "automaticZoomSpeed": 10
        },
        {
            "items": [
                {
                    "media": "this.video_2B1BE67A_2531_BF07_41A6_E8D19C7D1C81",
                    "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_B98A7F8B_B7D2_C317_41E1_6AD9EEBD2C01, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_B98A7F8B_B7D2_C317_41E1_6AD9EEBD2C01, 0)",
                    "class": "VideoPlayListItem",
                    "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
                    "player": "this.MainViewerVideoPlayer"
                }
            ],
            "id": "playList_B98A7F8B_B7D2_C317_41E1_6AD9EEBD2C01",
            "class": "PlayList"
        },
        {
            "duration": 1000,
            "id": "effect_B3D5DC90_A5A4_5EED_41AD_BDAF394A08F7",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "initialPosition": {
                "yaw": 0,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "panorama_18D01CC6_1348_3440_41A2_BD2321889440_camera",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 500,
            "id": "FadeInEffect_B827F0F9_B7CE_7B7E_41CE_AE5B2CD04049",
            "class": "FadeInEffect",
            "easing": "cubic_in"
        },
        {
            "initialPosition": {
                "yaw": 17.38,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B91E0FD7_B7D2_C330_41E1_004F09841F49",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "frames": [
                {
                    "front": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/f/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/f/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/f/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "thumbnailUrl": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_t.jpg",
                    "class": "CubicPanoramaFrame",
                    "right": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/r/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/r/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/r/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "back": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/b/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/b/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/b/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "bottom": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/d/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/d/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/d/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "left": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/l/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/l/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/l/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "top": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/u/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/u/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0/u/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    }
                }
            ],
            "label": "IMG_20260427_113852_00_004",
            "hfovMin": "150%",
            "id": "panorama_18D01CC6_1348_3440_41A2_BD2321889440",
            "thumbnailUrl": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_t.jpg",
            "overlays": [
                "this.overlay_03CD4A96_1358_5CC0_41AD_D9548CF79F9A",
                "this.overlay_B30620F7_A5A4_E613_41DF_912F2E83F5F9",
                "this.overlay_82333FC0_A6B5_FB8A_41DA_E653BA62BF4A",
                "this.overlay_82DDFCC9_A6B5_BD9B_41BF_D11AA728D48E",
                "this.overlay_8F275BCC_A6BD_9B99_41BB_570C4111AC46",
                "this.popup_807CC53C_A6DB_6CF9_41D1_1D3F37446BD6",
                "this.overlay_8F655E39_A6DB_9CFA_41B5_6E2848EDDAA4",
                "this.overlay_80689B47_A6D5_6496_41D9_558CB37D55E3",
                "this.overlay_8279BD78_A6CB_BF79_41C5_145A9809E9C2",
                "this.overlay_8161687C_A6F5_6579_41E4_C82C4CAE7C75",
                "this.overlay_803CA8F4_A6BC_A589_41E0_922831E71F81"
            ],
            "partial": false,
            "adjacentPanoramas": [
                {
                    "backwardYaw": 86.69,
                    "yaw": -96.52,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF"
                }
            ],
            "hfov": 360,
            "pitch": 0,
            "vfov": 180,
            "mapLocations": [
                {
                    "map": "this.map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463",
                    "x": 791.57,
                    "angle": 89.08,
                    "class": "PanoramaMapLocation",
                    "y": 2012.81
                }
            ],
            "class": "Panorama",
            "hfovMax": 130
        },
        {
            "initialPosition": {
                "yaw": -93.31,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B92BAFF0_B7D2_C2F1_41E6_2354B750AE01",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D65C92_A5A4_5EED_41DD_C8A10345FAF6",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "initialPosition": {
                "yaw": -0.38,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B8B77057_B7D2_DD3F_418C_440FD7FB0A70",
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D1AC94_A5A4_5E14_41C4_FDBBFF1716DB",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "initialPosition": {
                "yaw": 173.01,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B8D5A001_B7D2_DD10_41DE_F3E380E347DF",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 500,
            "id": "FadeOutEffect_B82780F9_B7CE_7B7E_41E2_D16468FF621D",
            "class": "FadeOutEffect",
            "easing": "cubic_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D51C91_A5A4_5EEF_41C8_53BFFDB80376",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D1FC94_A5A4_5E14_41D7_EAADDD9AE89D",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "viewerArea": "this.MainViewer",
            "id": "MainViewerVideoPlayer",
            "displayPlaybackBar": true,
            "class": "VideoPlayer"
        },
        {
            "duration": 1000,
            "id": "effect_B3D54C91_A5A4_5EEF_41E0_3F49599ECA96",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "items": [
                {
                    "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
                    "media": "this.map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463",
                    "player": "this.MapViewerMapPlayer",
                    "class": "MapPlayListItem"
                }
            ],
            "id": "playList_B9854F8B_B7D2_C317_41D0_106CB9D56702",
            "class": "PlayList"
        },
        {
            "duration": 1000,
            "id": "effect_B3D71C94_A5A4_5E14_41BB_DF32683A789C",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D63C92_A5A4_5EED_41C1_595623F48705",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "items": [
                "this.PanoramaPlayListItem_B98E0F8E_B7D2_C311_41D3_B5CCE8543A4F",
                "this.PanoramaPlayListItem_B9B2FF91_B7D2_C330_41C0_DAD39F6A9066",
                "this.PanoramaPlayListItem_B9B30F92_B7D2_C330_41E1_E34C82797A43",
                "this.PanoramaPlayListItem_B9B15F93_B7D2_C330_4187_1D957994203C",
                "this.PanoramaPlayListItem_B9B18F93_B7D2_C330_41E0_C6DCE40997F6",
                "this.PanoramaPlayListItem_B9B61F93_B7D2_C330_41D6_3E113A1D8DFC",
                "this.PanoramaPlayListItem_B9B75F94_B7D2_C330_41E2_5D88B32B6FE7",
                "this.PanoramaPlayListItem_B9B7DF94_B7D2_C330_419E_F8A75A6207E5"
            ],
            "id": "mainPlayList",
            "class": "PlayList"
        },
        {
            "initialPosition": {
                "yaw": -3.4,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B96ECFCF_B7D2_C32F_41B4_6AC92D05D87A",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D46C91_A5A4_5EEF_41DB_8689912F9C31",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "fieldOfViewOverlayInsideColor": "#FFFFFF",
            "id": "map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463",
            "thumbnailUrl": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_t.png",
            "fieldOfViewOverlayOutsideColor": "#000000",
            "width": 1667,
            "label": "minimap",
            "image": {
                "levels": [
                    {
                        "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463.png",
                        "width": 1667,
                        "class": "ImageResourceLevel",
                        "height": 2500
                    },
                    {
                        "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_lq.png",
                        "width": 209,
                        "tags": "preload",
                        "class": "ImageResourceLevel",
                        "height": 314
                    }
                ],
                "class": "ImageResource"
            },
            "minimumZoomFactor": 0.5,
            "overlays": [
                "this.overlay_1AE9A4DF_17EB_EDA4_41AF_434A923CD2CA",
                "this.overlay_19B73809_17F4_64AF_4198_BFE07171FADA",
                "this.overlay_190D6D4A_17F4_9CAD_41AD_AE676A1F0D78",
                "this.overlay_1A05496D_17F4_E767_4199_0CFF1F628473",
                "this.overlay_1A6BE89E_17F4_E5A5_41AC_778EF90968F6",
                "this.overlay_19D36A30_17F4_A4FC_41B2_FB1697C0EC8D",
                "this.overlay_1A0A66F8_17F4_6D6C_41A6_0AB491743C39",
                "this.overlay_19F9CBD6_17F5_9BA5_4197_FFC573153A72"
            ],
            "fieldOfViewOverlayInsideOpacity": 0.4,
            "fieldOfViewOverlayRadiusScale": 0.16,
            "fieldOfViewOverlayOutsideOpacity": 0,
            "scaleMode": "fit_to_height",
            "class": "Map",
            "maximumZoomFactor": 4,
            "initialZoomFactor": 3,
            "height": 2500
        },
        {
            "initialPosition": {
                "yaw": -128.72,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B8CA5010_B7D2_DD31_41C5_0E91EEA808C8",
            "initialSequence": {
                "class": "PanoramaCameraSequence",
                "movements": [
                    {
                        "targetYaw": 4.34,
                        "class": "TargetPanoramaCameraMovement",
                        "path": "shortest",
                        "targetPitch": 0.94,
                        "pitchSpeed": 47.04,
                        "easing": "cubic_in_out",
                        "yawSpeed": 93.5
                    },
                    {
                        "targetYaw": 50.62,
                        "end": "this.showPopupImage(this.ImageResource_B827C0F9_B7CE_7B7E_418C_394F12DFAC68, null, '90%', '90%', this.FadeInEffect_B827F0F9_B7CE_7B7E_41CE_AE5B2CD04049, this.FadeOutEffect_B82780F9_B7CE_7B7E_41E2_D16468FF621D, {'pressedBackgroundOpacity':0.3,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconColor':'#888888','rollOverBorderSize':0,'backgroundOpacity':0.3,'iconWidth':20,'borderSize':0,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'iconHeight':20,'paddingBottom':5,'pressedBorderColor':'#000000','rollOverBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','iconColor':'#000000','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'pressedIconLineWidth':5,'pressedBorderSize':0,'rollOverBorderColor':'#000000','iconLineWidth':5,'rollOverBackgroundOpacity':0.3,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconHeight':20,'rollOverIconColor':'#666666','rollOverIconWidth':20,'pressedBackgroundColorDirection':'vertical','pressedIconWidth':20,'pressedIconHeight':20,'paddingRight':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconLineWidth':5,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderColor':'#000000'}, null, null, false)",
                        "class": "TargetPanoramaCameraMovement",
                        "path": "shortest",
                        "easing": "cubic_in_out",
                        "pitchSpeed": 17.05,
                        "targetPitch": 4.25,
                        "yawSpeed": 33.25
                    }
                ],
                "restartMovementOnUserInteraction": false
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D78C92_A5A4_5EED_41C3_10FFA0E3EE4D",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D7FC92_A5A4_5EED_41D4_4C8FFCE5C0EB",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D75C94_A5A4_5E14_41C1_1089E808AA69",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "buttonToggleHotspots": "this.IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781",
            "buttonToggleGyroscope": "this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250",
            "class": "PanoramaPlayer",
            "touchControlMode": "drag_rotation",
            "viewerArea": "this.MainViewer",
            "gyroscopeVerticalDraggingEnabled": true,
            "id": "MainViewerPanoramaPlayer",
            "buttonCardboardView": "this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7",
            "mouseControlMode": "drag_acceleration",
            "displayPlaybackBar": true
        },
        {
            "duration": 500,
            "id": "FadeInEffect_B82CE0F6_B7CE_7B72_41E1_9C33A3BDCF22",
            "class": "FadeInEffect",
            "easing": "cubic_in"
        },
        {
            "duration": 1000,
            "id": "effect_B3D6DC91_A5A4_5EEF_41C3_B61C4E101F94",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "initialPosition": {
                "yaw": 94.82,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B8842049_B7D2_DD10_41C0_DD1F7444C646",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D07C94_A5A4_5E14_41C3_EB30AFDA1D68",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "initialPosition": {
                "yaw": 83.48,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "camera_B9381FE8_B7D2_C310_41D1_3EB5AF94FE8F",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D0FC94_A5A4_5E14_41DB_17F3DD38431B",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D43C90_A5A4_5EED_41D8_81A155CD02FE",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D47C90_A5A4_5EED_41AF_D5EBD2AE7615",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D5AC91_A5A4_5EEF_41DB_D4047327BCC6",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "hideDuration": 500,
            "rotationX": 0,
            "yaw": 43.76,
            "rotationZ": 0,
            "showEasing": "cubic_in",
            "rotationY": 0,
            "showDuration": 500,
            "popupMaxWidth": "95%",
            "popupDistance": 100,
            "popupMaxHeight": "95%",
            "id": "popup_807CC53C_A6DB_6CF9_41D1_1D3F37446BD6",
            "class": "PopupPanoramaOverlay",
            "pitch": 4.25,
            "hideEasing": "cubic_out",
            "hfov": 6.02,
            "image": {
                "levels": [
                    {
                        "url": "media/popup_807CC53C_A6DB_6CF9_41D1_1D3F37446BD6_0_1.png",
                        "width": 682,
                        "class": "ImageResourceLevel",
                        "height": 1024
                    }
                ],
                "class": "ImageResource"
            }
        },
        {
            "duration": 1000,
            "id": "effect_B3D68C92_A5A4_5EED_41E0_8D3E8D1E6DA6",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "initialPosition": {
                "yaw": 0,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_camera",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D60C92_A5A4_5EED_41CA_322CCB28E377",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D0FC92_A5A4_5EED_41C9_FD52A5E9C12E",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D70C92_A5A4_5EED_4181_BDF87938A527",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "viewerArea": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4",
            "id": "ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer",
            "movementMode": "constrained",
            "class": "MapPlayer"
        },
        {
            "frames": [
                {
                    "front": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/f/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/f/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/f/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/f/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "thumbnailUrl": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_t.jpg",
                    "class": "CubicPanoramaFrame",
                    "right": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/r/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/r/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/r/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/r/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "back": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/b/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/b/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/b/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/b/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "bottom": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/d/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/d/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/d/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/d/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "left": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/l/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/l/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/l/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/l/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "top": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/u/0/{row}_{column}.jpg",
                                "colCount": 8,
                                "class": "TiledImageResourceLevel",
                                "width": 4096,
                                "tags": "ondemand",
                                "rowCount": 8,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/u/1/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/u/2/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0/u/3/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    }
                }
            ],
            "label": "IMG_20260427_124701_00_039",
            "mapLocations": [
                {
                    "map": "this.map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463",
                    "x": 275.9,
                    "angle": 85.32,
                    "class": "PanoramaMapLocation",
                    "y": 1218.11
                }
            ],
            "id": "panorama_18D0788B_1348_5CC7_4191_217370E98EAE",
            "thumbnailUrl": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_t.jpg",
            "overlays": [
                "this.overlay_2811B2EA_3A9F_CB26_41CC_41A189179DF0",
                "this.overlay_812745FF_A6CF_6F77_41D1_B3B0601270D6",
                "this.overlay_8F6DB907_A6CF_A495_41BB_743B4C40B4AE"
            ],
            "partial": false,
            "adjacentPanoramas": [
                {
                    "backwardYaw": -6.99,
                    "yaw": -6.99,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7"
                },
                {
                    "backwardYaw": 51.28,
                    "yaw": 179.62,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC"
                }
            ],
            "hfov": 360,
            "pitch": 0,
            "vfov": 180,
            "class": "Panorama",
            "hfovMax": 130
        },
        {
            "items": [
                {
                    "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
                    "media": "this.map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14",
                    "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer",
                    "class": "MapPlayListItem"
                }
            ],
            "id": "playList_B98A3F8B_B7D2_C317_41CF_9A4881514A03",
            "class": "PlayList"
        },
        {
            "duration": 1000,
            "id": "effect_B3D0DC94_A5A4_5E14_41D7_B55F06645924",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D70C94_A5A4_5E14_41C4_FA6A58355F59",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D62C92_A5A4_5EED_41D8_87CBB4EAC67D",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 500,
            "id": "FadeOutEffect_B82C90F6_B7CE_7B72_41DA_95FFDBE41BD6",
            "class": "FadeOutEffect",
            "easing": "cubic_out"
        },
        {
            "fieldOfViewOverlayInsideColor": "#FFFFFF",
            "id": "map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14",
            "thumbnailUrl": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_t.png",
            "fieldOfViewOverlayOutsideColor": "#000000",
            "width": 2500,
            "label": "Lantai 2 (1) - Copy",
            "image": {
                "levels": [
                    {
                        "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14.png",
                        "width": 2500,
                        "class": "ImageResourceLevel",
                        "height": 1667
                    },
                    {
                        "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_lq.png",
                        "width": 313,
                        "tags": "preload",
                        "class": "ImageResourceLevel",
                        "height": 209
                    }
                ],
                "class": "ImageResource"
            },
            "minimumZoomFactor": 0.5,
            "overlays": [
                "this.overlay_02595D63_2A24_1369_4184_974001AFE141",
                "this.overlay_0FAC13D2_2A24_17AB_41B0_EE0012666144",
                "this.overlay_0E84F714_2A27_F0AF_41B1_E0EE4AA39B58",
                "this.overlay_0C2A42E0_2A24_3167_418D_00F498BB8F5A",
                "this.overlay_0039477D_2A24_7F59_41B0_4AC7AC68A709",
                "this.overlay_0D15C41D_2A24_10D9_41B2_AAA56CEB7B6C",
                "this.overlay_0D481E59_2A24_3159_4196_9F2BF3543B3E",
                "this.overlay_02F28305_2A24_F0A9_41A5_35A6DFFC3541"
            ],
            "fieldOfViewOverlayInsideOpacity": 0.4,
            "fieldOfViewOverlayRadiusScale": 0.3,
            "fieldOfViewOverlayOutsideOpacity": 0,
            "scaleMode": "fit_inside",
            "class": "Map",
            "maximumZoomFactor": 1.2,
            "initialZoomFactor": 1,
            "height": 1667
        },
        {
            "frames": [
                {
                    "front": {
                        "levels": [
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/f/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/f/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/f/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "thumbnailUrl": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_t.jpg",
                    "class": "CubicPanoramaFrame",
                    "right": {
                        "levels": [
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/r/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/r/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/r/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "back": {
                        "levels": [
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/b/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/b/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/b/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "bottom": {
                        "levels": [
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/d/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/d/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/d/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "left": {
                        "levels": [
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/l/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/l/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/l/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "top": {
                        "levels": [
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/u/0/{row}_{column}.jpg",
                                "colCount": 4,
                                "class": "TiledImageResourceLevel",
                                "width": 2048,
                                "tags": "ondemand",
                                "rowCount": 4,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/u/1/{row}_{column}.jpg",
                                "colCount": 2,
                                "class": "TiledImageResourceLevel",
                                "width": 1024,
                                "tags": "ondemand",
                                "rowCount": 2,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0/u/2/{row}_{column}.jpg",
                                "colCount": 1,
                                "class": "TiledImageResourceLevel",
                                "width": 512,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "rowCount": 1,
                                "height": 512
                            }
                        ],
                        "class": "ImageResource"
                    }
                }
            ],
            "label": "IMG_20260427_114030_00_005",
            "hfovMin": "150%",
            "id": "panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA",
            "thumbnailUrl": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_t.jpg",
            "overlays": [
                "this.overlay_80D50356_A6F5_A489_41C8_92B6172C1117",
                "this.overlay_8E03C53C_A6F5_6CFA_41D0_780CB96FDDDD"
            ],
            "partial": false,
            "adjacentPanoramas": [
                {
                    "backwardYaw": 46.46,
                    "yaw": -15.68,
                    "distance": 1,
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_18D5F0D5_1349_CC43_414C_531D97C056B0"
                }
            ],
            "hfov": 360,
            "pitch": 0,
            "vfov": 180,
            "mapLocations": [
                {
                    "map": "this.map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463",
                    "x": 1316.86,
                    "angle": -85.7,
                    "class": "PanoramaMapLocation",
                    "y": 1204.93
                }
            ],
            "class": "Panorama",
            "hfovMax": 130
        },
        {
            "duration": 1000,
            "id": "effect_B3D59C91_A5A4_5EEF_41DF_1CEDB4F5CA60",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D58C91_A5A4_5EEF_41DC_F2925CD97BCF",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D0AC94_A5A4_5E14_41E1_C976603C7103",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "label": "Virtual Reality (1)",
            "scaleMode": "fit_inside",
            "thumbnailUrl": "media/video_2B1BE67A_2531_BF07_41A6_E8D19C7D1C81_t.jpg",
            "width": 2240,
            "loop": false,
            "id": "video_2B1BE67A_2531_BF07_41A6_E8D19C7D1C81",
            "class": "Video",
            "height": 2240,
            "video": {
                "width": 2240,
                "class": "VideoResource",
                "mp4Url": "media/video_2B1BE67A_2531_BF07_41A6_E8D19C7D1C81.mp4",
                "height": 2240
            }
        },
        {
            "duration": 1000,
            "id": "effect_B3D03C94_A5A4_5E14_41E2_4B380C4ECC34",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D73C94_A5A4_5E14_41D7_C4573E985F86",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D61C92_A5A4_5EED_41DC_7875F3D654D0",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "levels": [
                {
                    "url": "media/popup_807CC53C_A6DB_6CF9_41D1_1D3F37446BD6_0_0.png",
                    "width": 1024,
                    "class": "ImageResourceLevel",
                    "height": 1536
                },
                {
                    "url": "media/popup_807CC53C_A6DB_6CF9_41D1_1D3F37446BD6_0_1.png",
                    "width": 682,
                    "class": "ImageResourceLevel",
                    "height": 1024
                },
                {
                    "url": "media/popup_807CC53C_A6DB_6CF9_41D1_1D3F37446BD6_0_2.png",
                    "width": 341,
                    "class": "ImageResourceLevel",
                    "height": 512
                }
            ],
            "id": "ImageResource_8098297B_A6F5_A77F_41DB_B3E45FBEF4AA",
            "class": "ImageResource"
        },
        {
            "duration": 1000,
            "id": "effect_B3D0CC92_A5A4_5EED_41E4_82C9E6E38728",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D51C91_A5A4_5EEF_41C2_E93F5593D28A",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D06C94_A5A4_5E14_41CE_9C268C54CE54",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D60C92_A5A4_5EED_41E2_FC693C134BB9",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D1DC94_A5A4_5E14_41DE_8002643BB427",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "initialPosition": {
                "yaw": 0,
                "class": "PanoramaCameraPosition",
                "pitch": 0
            },
            "class": "PanoramaCamera",
            "id": "panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_camera",
            "initialSequence": {
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "easing": "cubic_in",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "linear",
                        "yawDelta": 323,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    },
                    {
                        "easing": "cubic_out",
                        "yawDelta": 18.5,
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96
                    }
                ],
                "class": "PanoramaCameraSequence"
            },
            "automaticZoomSpeed": 10
        },
        {
            "duration": 1000,
            "id": "effect_B3D57C91_A5A4_5EEF_41DE_F1E687D202EF",
            "class": "FadeOutEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D5FC91_A5A4_5EEF_41D9_7C3A0A15D0C8",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "duration": 1000,
            "id": "effect_B3D76C92_A5A4_5EED_41DE_D9D143976466",
            "class": "FadeInEffect",
            "easing": "cubic_in_out"
        },
        {
            "progressBarBorderSize": 0,
            "id": "MainViewer",
            "left": 0,
            "width": "100%",
            "playbackBarProgressBorderRadius": 0,
            "toolTipShadowOpacity": 1,
            "playbackBarHeadShadowHorizontalLength": 0,
            "playbackBarBorderRadius": 0,
            "progressBarBorderRadius": 0,
            "toolTipFontStyle": "normal",
            "playbackBarProgressBorderColor": "#000000",
            "minHeight": 50,
            "toolTipFontFamily": "Arial",
            "propagateClick": true,
            "toolTipTextShadowOpacity": 0,
            "playbackBarHeadBorderRadius": 0,
            "progressLeft": 0,
            "playbackBarHeadBorderSize": 0,
            "playbackBarProgressOpacity": 1,
            "playbackBarBorderSize": 0,
            "transitionDuration": 500,
            "paddingRight": 0,
            "minWidth": 100,
            "playbackBarBackgroundOpacity": 1,
            "height": "100%",
            "toolTipFontColor": "#606060",
            "playbackBarHeadBorderColor": "#000000",
            "vrPointerSelectionColor": "#FF6600",
            "borderSize": 0,
            "toolTipShadowHorizontalLength": 0,
            "playbackBarHeadShadowColor": "#000000",
            "toolTipShadowVerticalLength": 0,
            "toolTipBackgroundColor": "#F6F6F6",
            "progressRight": 0,
            "firstTransitionDuration": 0,
            "progressOpacity": 1,
            "playbackBarHeadBackgroundColor": [
                "#111111",
                "#666666"
            ],
            "vrPointerSelectionTime": 2000,
            "progressBarBackgroundColorDirection": "vertical",
            "progressBottom": 0,
            "progressHeight": 10,
            "playbackBarHeadShadow": true,
            "shadow": false,
            "playbackBarHeadShadowVerticalLength": 0,
            "playbackBarHeadBackgroundColorDirection": "vertical",
            "class": "ViewerArea",
            "playbackBarProgressBackgroundColor": [
                "#3399FF"
            ],
            "playbackBarOpacity": 1,
            "progressBackgroundOpacity": 1,
            "toolTipPaddingRight": 6,
            "playbackBarHeadShadowOpacity": 0.7,
            "toolTipBorderSize": 1,
            "toolTipPaddingLeft": 6,
            "toolTipPaddingTop": 4,
            "vrPointerColor": "#FFFFFF",
            "toolTipDisplayTime": 600,
            "progressBarOpacity": 1,
            "playbackBarBorderColor": "#FFFFFF",
            "progressBorderSize": 0,
            "transitionMode": "blending",
            "displayTooltipInTouchScreens": true,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "progressBorderRadius": 0,
            "playbackBarProgressBackgroundColorRatios": [
                0
            ],
            "playbackBarLeft": 0,
            "progressBackgroundColorRatios": [
                0
            ],
            "playbackBarHeadHeight": 15,
            "top": 0,
            "playbackBarHeadShadowBlurRadius": 3,
            "playbackBarHeadBackgroundColorRatios": [
                0,
                1
            ],
            "progressBarBorderColor": "#000000",
            "toolTipBorderColor": "#767676",
            "progressBarBackgroundColorRatios": [
                0
            ],
            "progressBackgroundColorDirection": "vertical",
            "toolTipShadowSpread": 0,
            "toolTipShadowBlurRadius": 3,
            "playbackBarBottom": 5,
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "playbackBarHeadOpacity": 1,
            "progressBarBackgroundColor": [
                "#3399FF"
            ],
            "paddingTop": 0,
            "progressBorderColor": "#003366",
            "toolTipPaddingBottom": 4,
            "paddingBottom": 0,
            "toolTipFontSize": "1.65vmin",
            "toolTipTextShadowBlurRadius": 3,
            "progressBackgroundColor": [
                "#FFFFFF"
            ],
            "paddingLeft": 0,
            "playbackBarProgressBackgroundColorDirection": "vertical",
            "toolTipShadowColor": "#333333",
            "playbackBarBackgroundColor": [
                "#FFFFFF"
            ],
            "data": {
                "name": "Main Viewer"
            },
            "playbackBarHeight": 10,
            "toolTipFontWeight": "normal",
            "playbackBarBackgroundColorDirection": "vertical",
            "playbackBarHeadWidth": 6,
            "playbackBarProgressBorderSize": 0,
            "playbackBarRight": 0
        },
        {
            "horizontalAlign": "left",
            "scrollBarOpacity": 0.5,
            "id": "Container_B156A269_BF46_B846_41CC_86CDE6B7F756",
            "backgroundOpacity": 0,
            "width": 113.55,
            "scrollBarVisible": "rollOver",
            "right": "1%",
            "children": [
                "this.Container_B1571269_BF46_B846_41D9_B94D861499DF",
                "this.Container_B1573269_BF46_B846_41AD_E3E55F50C328"
            ],
            "scrollBarMargin": 2,
            "borderRadius": 0,
            "overflow": "scroll",
            "minHeight": 1,
            "propagateClick": true,
            "top": "0.12%",
            "verticalAlign": "top",
            "paddingRight": 0,
            "scrollBarWidth": 10,
            "height": 588.15,
            "minWidth": 1,
            "layout": "absolute",
            "borderSize": 0,
            "paddingBottom": 0,
            "gap": 10,
            "paddingTop": 0,
            "paddingLeft": 0,
            "contentOpaque": false,
            "scrollBarColor": "#000000",
            "data": {
                "name": "--SETTINGS"
            },
            "shadow": false,
            "class": "Container"
        },
        {
            "horizontalAlign": "left",
            "scrollBarOpacity": 0.5,
            "id": "Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C",
            "left": "0%",
            "children": [
                "this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D"
            ],
            "scrollBarVisible": "rollOver",
            "backgroundOpacity": 0,
            "overflow": "scroll",
            "width": "84.975%",
            "scrollBarMargin": 2,
            "borderRadius": 0,
            "minHeight": 1,
            "propagateClick": false,
            "top": "3%",
            "paddingRight": 0,
            "height": "19.601%",
            "verticalAlign": "top",
            "minWidth": 1,
            "layout": "absolute",
            "scrollBarWidth": 10,
            "paddingTop": 0,
            "paddingBottom": 0,
            "gap": 10,
            "borderSize": 0,
            "paddingLeft": 15,
            "contentOpaque": false,
            "scrollBarColor": "#000000",
            "data": {
                "name": "gdl1"
            },
            "shadow": false,
            "visible": false,
            "class": "Container"
        },
        {
            "horizontalAlign": "left",
            "scrollBarOpacity": 0.5,
            "id": "Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1",
            "left": "0%",
            "children": [
                "this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06"
            ],
            "scrollBarVisible": "rollOver",
            "backgroundOpacity": 0,
            "overflow": "scroll",
            "width": "84.975%",
            "scrollBarMargin": 2,
            "borderRadius": 0,
            "minHeight": 1,
            "propagateClick": false,
            "top": "3%",
            "paddingRight": 0,
            "height": "19.601%",
            "verticalAlign": "top",
            "minWidth": 1,
            "layout": "absolute",
            "scrollBarWidth": 10,
            "paddingTop": 0,
            "paddingBottom": 0,
            "gap": 10,
            "borderSize": 0,
            "paddingLeft": 15,
            "contentOpaque": false,
            "scrollBarColor": "#000000",
            "data": {
                "name": "gdl"
            },
            "shadow": false,
            "visible": false,
            "class": "Container"
        },
        {
            "horizontalAlign": "left",
            "scrollBarOpacity": 0.5,
            "id": "Container_320C1ADD_3F4A_FD16_41B0_FBCDFB126CCF",
            "left": "1.49%",
            "width": 240,
            "scrollBarVisible": "rollOver",
            "backgroundOpacity": 0,
            "overflow": "scroll",
            "children": [
                "this.Container_B0DBDFD9_BF4E_E879_41D9_B737EF8BC042",
                "this.Container_0458057F_17F5_EF63_41B5_2CE2DF0373FD"
            ],
            "scrollBarMargin": 2,
            "borderRadius": 0,
            "minHeight": 1,
            "propagateClick": false,
            "verticalAlign": "top",
            "paddingRight": 0,
            "bottom": "1.99%",
            "scrollBarWidth": 10,
            "height": 190,
            "minWidth": 1,
            "layout": "absolute",
            "paddingTop": 0,
            "paddingBottom": 0,
            "gap": 10,
            "borderSize": 0,
            "paddingLeft": 0,
            "contentOpaque": false,
            "scrollBarColor": "#000000",
            "data": {
                "name": "Container1772"
            },
            "shadow": false,
            "class": "Container"
        },
        {
            "horizontalAlign": "left",
            "scrollBarOpacity": 0.54,
            "id": "Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B",
            "left": "0%",
            "children": [
                "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4"
            ],
            "scrollBarVisible": "rollOver",
            "backgroundOpacity": 0.6,
            "right": "0%",
            "scrollBarMargin": 2,
            "borderRadius": 0,
            "creationPolicy": "inAdvance",
            "overflow": "scroll",
            "backgroundColorRatios": [
                0,
                1
            ],
            "propagateClick": true,
            "minHeight": 1,
            "scrollBarWidth": 10,
            "top": "0%",
            "verticalAlign": "top",
            "paddingRight": 0,
            "bottom": "0%",
            "backgroundColor": [
                "#000000",
                "#000000"
            ],
            "minWidth": 1,
            "layout": "absolute",
            "click": "this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, false, 0, null, null, false)",
            "borderSize": 0,
            "paddingTop": 0,
            "backgroundColorDirection": "vertical",
            "paddingBottom": 0,
            "paddingLeft": 0,
            "contentOpaque": false,
            "scrollBarColor": "#000000",
            "data": {
                "name": "---FLOORPLAN"
            },
            "shadow": false,
            "visible": false,
            "class": "Container",
            "gap": 10
        },
        {
            "id": "veilPopupPanorama",
            "left": 0,
            "backgroundOpacity": 0.55,
            "right": 0,
            "borderRadius": 0,
            "backgroundColorRatios": [
                0
            ],
            "propagateClick": false,
            "minHeight": 0,
            "top": 0,
            "paddingRight": 0,
            "bottom": 0,
            "backgroundColor": [
                "#000000"
            ],
            "minWidth": 0,
            "showEffect": {
                "duration": 350,
                "class": "FadeInEffect",
                "easing": "cubic_in_out"
            },
            "borderSize": 0,
            "paddingTop": 0,
            "backgroundColorDirection": "vertical",
            "paddingBottom": 0,
            "paddingLeft": 0,
            "data": {
                "name": "UIComponent1715"
            },
            "shadow": false,
            "visible": false,
            "class": "UIComponent"
        },
        {
            "id": "zoomImagePopupPanorama",
            "left": 0,
            "backgroundOpacity": 1,
            "right": 0,
            "borderRadius": 0,
            "backgroundColorRatios": [],
            "propagateClick": false,
            "minHeight": 0,
            "top": 0,
            "paddingRight": 0,
            "bottom": 0,
            "backgroundColor": [],
            "minWidth": 0,
            "borderSize": 0,
            "paddingTop": 0,
            "backgroundColorDirection": "vertical",
            "paddingBottom": 0,
            "paddingLeft": 0,
            "scaleMode": "custom",
            "data": {
                "name": "ZoomImage1716"
            },
            "shadow": false,
            "visible": false,
            "class": "ZoomImage"
        },
        {
            "textDecoration": "none",
            "fontFamily": "Arial",
            "horizontalAlign": "center",
            "id": "closeButtonPopupPanorama",
            "backgroundOpacity": 0.3,
            "fontWeight": "normal",
            "shadowColor": "#000000",
            "right": 10,
            "iconHeight": 20,
            "borderRadius": 0,
            "iconColor": "#000000",
            "backgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "propagateClick": false,
            "minHeight": 0,
            "top": 10,
            "verticalAlign": "middle",
            "rollOverIconColor": "#666666",
            "paddingRight": 5,
            "pressedIconColor": "#888888",
            "iconBeforeLabel": true,
            "backgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "borderColor": "#000000",
            "minWidth": 0,
            "mode": "push",
            "showEffect": {
                "duration": 350,
                "class": "FadeInEffect",
                "easing": "cubic_in_out"
            },
            "fontSize": "1.29vmin",
            "paddingTop": 5,
            "backgroundColorDirection": "vertical",
            "paddingBottom": 5,
            "label": "",
            "fontStyle": "normal",
            "borderSize": 0,
            "iconLineWidth": 5,
            "paddingLeft": 5,
            "gap": 5,
            "layout": "horizontal",
            "data": {
                "name": "CloseButton1717"
            },
            "shadow": false,
            "iconWidth": 20,
            "visible": false,
            "class": "CloseButton",
            "shadowSpread": 1,
            "cursor": "hand",
            "fontColor": "#FFFFFF",
            "shadowBlurRadius": 6
        },
        {
            "toolTipBorderSize": 1,
            "horizontalAlign": "center",
            "toolTipPaddingLeft": 6,
            "maxWidth": 58,
            "id": "IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081",
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "maxHeight": 58,
            "toolTipPaddingTop": 4,
            "toolTipShadowOpacity": 1,
            "width": 58,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipFontStyle": "normal",
            "minHeight": 1,
            "toolTipFontFamily": "Arial",
            "propagateClick": true,
            "toolTipTextShadowOpacity": 0,
            "verticalAlign": "middle",
            "toolTip": "Layar Penuh",
            "paddingRight": 0,
            "height": 58,
            "toolTipBorderColor": "#767676",
            "minWidth": 1,
            "mode": "toggle",
            "toolTipShadowHorizontalLength": 0,
            "toolTipShadowSpread": 0,
            "toolTipShadowBlurRadius": 3,
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "toolTipFontColor": "#606060",
            "toolTipShadowVerticalLength": 0,
            "paddingTop": 0,
            "pressedIconURL": "skin/IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081_pressed.png",
            "toolTipPaddingBottom": 4,
            "paddingBottom": 0,
            "toolTipFontSize": "1.65vmin",
            "borderSize": 0,
            "toolTipTextShadowBlurRadius": 3,
            "paddingLeft": 0,
            "toolTipShadowColor": "#333333",
            "iconURL": "skin/IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081.png",
            "transparencyActive": true,
            "shadow": false,
            "toolTipFontWeight": "normal",
            "data": {
                "name": "IconButton FULLSCREEN"
            },
            "class": "IconButton",
            "pressedRollOverIconURL": "skin/IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081_pressed_rollover.png",
            "cursor": "hand",
            "toolTipPaddingRight": 6
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_2_0_0_map.gif",
                                "width": 16,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -2.46,
                    "hfov": 14.12,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": 3.8
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Laboratorium Pembelajaran Matematika",
                    "click": "this.openLink('../Labmath/index.htm', '_self')"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80EC996D_A6F5_A49B_41E1_547CF3DE0D54",
                    "pitch": 3.8,
                    "yaw": -2.46,
                    "hfov": 14.12,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_023878E1_1358_FC40_41B1_61AED61DED92",
            "data": {
                "label": "pintu labfis"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_3_0_map.gif",
                                "width": 105,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -1.84,
                    "hfov": 59.73,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -9.02
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Laboratorium Pembelajaran Matematika",
                    "click": "this.openLink('../Labmath/index.htm', '_self')"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_3_0.png",
                                "width": 989,
                                "class": "ImageResourceLevel",
                                "height": 150
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -9.02,
                    "yaw": -1.84,
                    "hfov": 59.73,
                    "distance": 50
                }
            ],
            "id": "overlay_B3BF056D_A5A4_AE34_41BA_41BBE1DBA020",
            "data": {
                "label": "Laboratorium Pembelajaran Matematika"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_4_1_0_map.gif",
                                "width": 91,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -52.7,
                    "hfov": 27.44,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -9.92
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lemari Alat Pelindung Diri (APD)"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -52.7,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_4_0.png",
                                "width": 457,
                                "class": "ImageResourceLevel",
                                "height": 999
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -9.92,
                    "hfov": 27.44,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8160B648_A65D_AC99_41A7_32209B948706",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_5_1_0_map.gif",
                                "width": 110,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 49.3,
                    "hfov": 40.01,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -9.92
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Rak Sepatu"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 49.3,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_5_0.png",
                                "width": 682,
                                "class": "ImageResourceLevel",
                                "height": 1239
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -9.92,
                    "hfov": 40.01,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_83CD99EC_A65B_E79A_41CA_94332AC5604E",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_6_1_0_map.gif",
                                "width": 75,
                                "class": "ImageResourceLevel",
                                "height": 108
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 101.99,
                    "hfov": 9.27,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -17.28
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Sofa Tunggu"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 101.99,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_6_0.png",
                                "width": 151,
                                "class": "ImageResourceLevel",
                                "height": 217
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -17.28,
                    "hfov": 9.27,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_823F0070_A655_E48A_41B6_E5F9E26AB2F3",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_7_1_0_map.gif",
                                "width": 84,
                                "class": "ImageResourceLevel",
                                "height": 131
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 122.01,
                    "hfov": 10.36,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -32.01
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Kotak Sampah"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 122.01,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_7_0.png",
                                "width": 169,
                                "class": "ImageResourceLevel",
                                "height": 263
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -32.01,
                    "hfov": 10.36,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_826782AF_A657_6596_41E3_FF1B0C862F42",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_8_1_0_map.gif",
                                "width": 61,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 142.41,
                    "hfov": 25.89,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -10.67
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Ruang Dosen"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 142.41,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_8_0.png",
                                "width": 430,
                                "class": "ImageResourceLevel",
                                "height": 1406
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -10.67,
                    "hfov": 25.89,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8E9FD260_A655_648A_41E3_C9A0D8BE2727",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_9_1_0_map.gif",
                                "width": 33,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -113.89,
                    "hfov": 7.82,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -7.27
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Ruang Dosen"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -113.89,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_9_0.png",
                                "width": 128,
                                "class": "ImageResourceLevel",
                                "height": 760
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -7.27,
                    "hfov": 7.82,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8E956AB5_A64F_A58A_4189_473DDF75B33E",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_10_1_0_map.gif",
                                "width": 200,
                                "class": "ImageResourceLevel",
                                "height": 132
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -151.86,
                    "hfov": 83.82,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -42.21
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Kursi Tunggu"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -151.86,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_10_0.png",
                                "width": 1682,
                                "class": "ImageResourceLevel",
                                "height": 1116
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -42.21,
                    "hfov": 83.82,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8220521D_A64B_A4BA_41D1_AC23B7254F1C",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_11_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -85.18,
                    "hfov": 15.43,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -21.82
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_18D5F0D5_1349_CC43_414C_531D97C056B0, this.camera_B9099FE0_B7D2_C310_41E0_02DDD0A69F91); this.mainPlayList.set('selectedIndex', 4)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80EA096D_A6F5_A49B_41E4_54AD89A16751",
                    "pitch": -21.82,
                    "yaw": -85.18,
                    "hfov": 15.43,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_829C99CD_A6CD_E79A_41E3_B79C8F667C5D",
            "data": {
                "label": "Arrow 01c"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_12_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 86.69,
                    "hfov": 15.7,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -19.17
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_18D01CC6_1348_3440_41A2_BD2321889440, this.camera_B9381FE8_B7D2_C310_41D1_3EB5AF94FE8F); this.mainPlayList.set('selectedIndex', 6)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80EAB96D_A6F5_A49B_41DB_4215F811116C",
                    "pitch": -19.17,
                    "yaw": 86.69,
                    "hfov": 15.7,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_80C891A4_A6CD_678A_41BE_0425CA4DEEA7",
            "data": {
                "label": "Arrow 01c"
            }
        },
        {
            "bleachingDistance": 0.58,
            "yaw": 55.15,
            "class": "LensFlarePanoramaOverlay",
            "pitch": 59.21,
            "bleaching": 0.7,
            "id": "overlay_3406C851_3A90_C762_41C0_9923C335D3DA"
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0_HS_2_0_0_map.gif",
                                "width": 17,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 50.57,
                    "hfov": 34.88,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": 2.04
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 50.57,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0_HS_2_0.png",
                                "width": 1154,
                                "class": "ImageResourceLevel",
                                "height": 1039
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": 2.04,
                    "hfov": 34.88,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_280092E2_3A90_4B26_41B8_849A626A36B8",
            "data": {
                "label": "Image"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0_HS_3_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 51.28,
                    "hfov": 19.75,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -19.64
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_18D0788B_1348_5CC7_4191_217370E98EAE, this.camera_B8B77057_B7D2_DD3F_418C_440FD7FB0A70); this.mainPlayList.set('selectedIndex', 1)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80E2E96A_A6F5_A499_41C5_A95FF1B7FF6D",
                    "pitch": -19.64,
                    "yaw": 51.28,
                    "hfov": 19.75,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_81F77F44_A6CC_BC8A_41C2_5A1FFAEEEAA3",
            "data": {
                "label": "Arrow 01c"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_15_0_0_map.gif",
                                "width": 31,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 15.91,
                    "hfov": 41.26,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": 14.49
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 15.91,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_15_0.png",
                                "width": 697,
                                "class": "ImageResourceLevel",
                                "height": 359
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": 14.49,
                    "hfov": 41.26,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_B9D4D43F_B718_CCC3_41DB_2A9B3A68EBF9",
            "data": {
                "label": "Image"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_3_1_0_map.gif",
                                "width": 106,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 39.85,
                    "hfov": 15.39,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -5.57
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lemari Alat Pelindung Diri (APD)"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 39.85,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_3_0.png",
                                "width": 253,
                                "class": "ImageResourceLevel",
                                "height": 475
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -5.57,
                    "hfov": 15.39,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_850D0129_A654_A49B_41E0_47641C1D17B4",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_4_1_0_map.gif",
                                "width": 66,
                                "class": "ImageResourceLevel",
                                "height": 144
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 55.63,
                    "hfov": 8.1,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -3.12
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Rak Sepatu"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 55.63,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_4_0.png",
                                "width": 132,
                                "class": "ImageResourceLevel",
                                "height": 288
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -3.12,
                    "hfov": 8.1,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_84535071_A654_E48B_41E4_CA0083CF7895",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_5_1_0_map.gif",
                                "width": 200,
                                "class": "ImageResourceLevel",
                                "height": 187
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 110.75,
                    "hfov": 34.81,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": 0.22
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Majalah Dinding"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 110.75,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_5_0.png",
                                "width": 587,
                                "class": "ImageResourceLevel",
                                "height": 551
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": 0.22,
                    "hfov": 34.81,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_84019564_A65F_6C89_41DF_3A7A64F17D4E",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_6_1_0_map.gif",
                                "width": 146,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -57.78,
                    "hfov": 25.44,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -8.77
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lemari Barang"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -57.78,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_6_0.png",
                                "width": 423,
                                "class": "ImageResourceLevel",
                                "height": 576
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -8.77,
                    "hfov": 25.44,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_84F0807F_A65C_A576_41E2_A508969AE5E9",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_7_1_0_map.gif",
                                "width": 98,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -110.97,
                    "hfov": 16.58,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -7.81
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lemari Barang"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -110.97,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_7_0.png",
                                "width": 273,
                                "class": "ImageResourceLevel",
                                "height": 553
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -7.81,
                    "hfov": 16.58,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_859535D8_A65B_6FB9_41DB_AC8828A838EB",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_8_1_0_map.gif",
                                "width": 156,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -133.43,
                    "hfov": 25.15,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -7.97
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lemari Barang"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -133.43,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_8_0.png",
                                "width": 417,
                                "class": "ImageResourceLevel",
                                "height": 532
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -7.97,
                    "hfov": 25.15,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_848CA6DF_A655_6DB6_4194_F8838F17485B",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_9_1_0_map.gif",
                                "width": 107,
                                "class": "ImageResourceLevel",
                                "height": 93
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -77.26,
                    "hfov": 13.06,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -11.96
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Kursi Tunggu"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -77.26,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_9_0.png",
                                "width": 214,
                                "class": "ImageResourceLevel",
                                "height": 187
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -11.96,
                    "hfov": 13.06,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_84BD6459_A654_ECBB_41D1_1141152DAA51",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_10_1_0_map.gif",
                                "width": 183,
                                "class": "ImageResourceLevel",
                                "height": 199
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 7.93,
                    "hfov": 36.26,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -9.35
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Tangga ke Lantai 2"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 7.93,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_10_0.png",
                                "width": 613,
                                "class": "ImageResourceLevel",
                                "height": 669
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -9.35,
                    "hfov": 36.26,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_848E56D6_A64C_AD89_41E3_EF2350427A26",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_12_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 177.36,
                    "hfov": 15.17,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -24.08
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7, this.camera_B96ECFCF_B7D2_C32F_41B4_6AC92D05D87A); this.mainPlayList.set('selectedIndex', 2)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80EFA96C_A6F5_A499_41D6_BA2E77535428",
                    "pitch": -24.08,
                    "yaw": 177.36,
                    "hfov": 15.17,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_81767B91_A6CC_BB8A_41D7_652F73F66D09",
            "data": {
                "label": "Arrow 01c"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_13_1_0_map.gif",
                                "width": 175,
                                "class": "ImageResourceLevel",
                                "height": 150
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -160.91,
                    "hfov": 21.16,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -17.71
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Meja Tunggu"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -160.91,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_13_0.png",
                                "width": 350,
                                "class": "ImageResourceLevel",
                                "height": 301
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -17.71,
                    "hfov": 21.16,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_82150FC2_A6CC_9B8E_41DC_3D6253010306",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_14_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 0,
                    "hfov": 15.3,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -42.59
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_18D5F0D5_1349_CC43_414C_531D97C056B0, this.camera_B91E0FD7_B7D2_C330_41E1_004F09841F49); this.mainPlayList.set('selectedIndex', 4)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_8EE9E612_A6CD_EC8E_41D3_E39485DFE053",
                    "pitch": -42.59,
                    "yaw": 0,
                    "hfov": 15.3,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8E570427_A6CD_AC96_41C1_CF43028E66BF",
            "data": {
                "label": "Arrow 01b"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_16_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 2.27,
                    "hfov": 20.77,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": 1.04
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 7)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_A00525FA_B718_CF4C_41D5_DA0CBDBD21AF",
                    "pitch": 1.04,
                    "yaw": 2.27,
                    "hfov": 20.77,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_B82F88FC_B719_C544_41E2_419138950D4F",
            "data": {
                "label": "Arrow 01a"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0_HS_2_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -6.99,
                    "hfov": 15.39,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -22.19
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_18D0788B_1348_5CC7_4191_217370E98EAE, this.camera_B94C7FBD_B7D2_C373_41DF_6B17A83C80E2); this.mainPlayList.set('selectedIndex', 1)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80E1C96B_A6F5_A49F_41CC_92E89B62D266",
                    "pitch": -22.19,
                    "yaw": -6.99,
                    "hfov": 15.39,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_814C5679_A6CF_AD7A_41E2_3BC2EA75E59C",
            "data": {
                "label": "Arrow 01c"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0_HS_3_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 176.6,
                    "hfov": 15.13,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -24.46
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_1F3A89CE_1349_DC40_4197_496928E9DA69, this.camera_B97C5FC6_B7D2_C311_41CB_540D6BE6301F); this.mainPlayList.set('selectedIndex', 3)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80E1896B_A6F5_A49F_419E_CADE79741898",
                    "pitch": -24.46,
                    "yaw": 176.6,
                    "hfov": 15.13,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_800094C3_A6CF_6D8F_41E0_E5B42B8C7C3D",
            "data": {
                "label": "Arrow 01c"
            }
        },
        {
            "horizontalAlign": "center",
            "id": "IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291",
            "left": "12%",
            "width": 32,
            "backgroundOpacity": 0,
            "borderRadius": 0,
            "rollOverIconURL": "skin/IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291_rollover.png",
            "minHeight": 0,
            "propagateClick": false,
            "verticalAlign": "middle",
            "paddingRight": 0,
            "bottom": "27.18%",
            "height": 32,
            "minWidth": 0,
            "mode": "push",
            "paddingTop": 0,
            "pressedIconURL": "skin/IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291_pressed.png",
            "paddingBottom": 0,
            "borderSize": 0,
            "paddingLeft": 0,
            "iconURL": "skin/IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291.png",
            "transparencyActive": true,
            "shadow": false,
            "data": {
                "name": "Button37499"
            },
            "class": "IconButton",
            "cursor": "hand"
        },
        {
            "horizontalAlign": "center",
            "id": "IconButton_A7361280_BCBD_AC04_41C9_358137CF7140",
            "left": "10%",
            "width": 32,
            "backgroundOpacity": 0,
            "borderRadius": 0,
            "rollOverIconURL": "skin/IconButton_A7361280_BCBD_AC04_41C9_358137CF7140_rollover.png",
            "minHeight": 0,
            "propagateClick": false,
            "top": "4.75%",
            "verticalAlign": "middle",
            "paddingRight": 0,
            "height": 32,
            "minWidth": 0,
            "mode": "push",
            "paddingTop": 0,
            "pressedIconURL": "skin/IconButton_A7361280_BCBD_AC04_41C9_358137CF7140_pressed.png",
            "paddingBottom": 0,
            "borderSize": 0,
            "paddingLeft": 0,
            "iconURL": "skin/IconButton_A7361280_BCBD_AC04_41C9_358137CF7140.png",
            "transparencyActive": true,
            "shadow": false,
            "data": {
                "name": "Button37510"
            },
            "class": "IconButton",
            "cursor": "hand"
        },
        {
            "progressBarBorderSize": 0,
            "id": "MapViewer",
            "left": "0%",
            "width": "100%",
            "playbackBarProgressBorderRadius": 0,
            "toolTipShadowOpacity": 1,
            "playbackBarHeadShadowHorizontalLength": 0,
            "playbackBarBorderRadius": 0,
            "progressBarBorderRadius": 0,
            "toolTipFontStyle": "normal",
            "playbackBarProgressBorderColor": "#000000",
            "playbackBarHeadBorderRadius": 0,
            "toolTipFontFamily": "Arial",
            "playbackBarHeadBorderColor": "#000000",
            "toolTipTextShadowOpacity": 0,
            "minHeight": 1,
            "progressLeft": 0,
            "propagateClick": false,
            "paddingRight": 0,
            "playbackBarProgressOpacity": 1,
            "playbackBarBorderSize": 0,
            "playbackBarHeadBorderSize": 0,
            "minWidth": 1,
            "playbackBarBackgroundOpacity": 1,
            "toolTipShadowHorizontalLength": 0,
            "toolTipFontColor": "#606060",
            "transitionDuration": 0,
            "vrPointerSelectionColor": "#FF6600",
            "borderSize": 0,
            "playbackBarHeadShadowColor": "#000000",
            "toolTipShadowVerticalLength": 0,
            "toolTipBackgroundColor": "#F6F6F6",
            "progressRight": 0,
            "firstTransitionDuration": 0,
            "progressOpacity": 1,
            "playbackBarHeadBackgroundColor": [
                "#111111",
                "#666666"
            ],
            "vrPointerSelectionTime": 2000,
            "progressBarBackgroundColorDirection": "vertical",
            "progressBottom": 2,
            "progressHeight": 10,
            "playbackBarHeadShadow": true,
            "shadow": false,
            "playbackBarHeadShadowVerticalLength": 0,
            "playbackBarHeadBackgroundColorDirection": "vertical",
            "class": "ViewerArea",
            "playbackBarProgressBackgroundColor": [
                "#3399FF"
            ],
            "playbackBarOpacity": 1,
            "progressBackgroundOpacity": 1,
            "toolTipPaddingRight": 6,
            "playbackBarHeadShadowOpacity": 0.7,
            "toolTipBorderSize": 1,
            "toolTipPaddingLeft": 6,
            "toolTipPaddingTop": 4,
            "vrPointerColor": "#FFFFFF",
            "toolTipDisplayTime": 600,
            "progressBarOpacity": 1,
            "playbackBarBorderColor": "#FFFFFF",
            "progressBorderSize": 0,
            "transitionMode": "fade_out_fade_in",
            "displayTooltipInTouchScreens": true,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "progressBorderRadius": 0,
            "playbackBarProgressBackgroundColorRatios": [
                0
            ],
            "playbackBarLeft": 0,
            "progressBackgroundColorRatios": [
                0
            ],
            "playbackBarHeadHeight": 15,
            "top": "0%",
            "playbackBarHeadShadowBlurRadius": 3,
            "bottom": "0%",
            "playbackBarHeadBackgroundColorRatios": [
                0,
                1
            ],
            "progressBarBorderColor": "#000000",
            "toolTipBorderColor": "#767676",
            "progressBarBackgroundColorRatios": [
                0
            ],
            "progressBackgroundColorDirection": "vertical",
            "toolTipShadowSpread": 0,
            "playbackBarHeadOpacity": 1,
            "playbackBarBottom": 0,
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "toolTipShadowBlurRadius": 3,
            "progressBarBackgroundColor": [
                "#3399FF"
            ],
            "paddingTop": 0,
            "progressBorderColor": "#003366",
            "toolTipPaddingBottom": 4,
            "paddingBottom": 0,
            "toolTipFontSize": "1.65vmin",
            "toolTipTextShadowBlurRadius": 3,
            "progressBackgroundColor": [
                "#FFFFFF"
            ],
            "paddingLeft": 0,
            "click": "this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, true, 0, null, null, false)",
            "playbackBarProgressBackgroundColorDirection": "vertical",
            "toolTipShadowColor": "#333333",
            "playbackBarBackgroundColor": [
                "#FFFFFF"
            ],
            "data": {
                "name": "Floor Plan mini"
            },
            "playbackBarHeight": 10,
            "toolTipFontWeight": "normal",
            "playbackBarBackgroundColorDirection": "vertical",
            "playbackBarHeadWidth": 6,
            "playbackBarProgressBorderSize": 0,
            "playbackBarRight": 0
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_16_0_0_map.gif",
                                "width": 19,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 72.89,
                    "hfov": 44.12,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": 18.16
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 72.89,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_16_0.png",
                                "width": 759,
                                "class": "ImageResourceLevel",
                                "height": 619
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": 18.16,
                    "hfov": 44.12,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_B9CFD241_B718_44BC_41E1_1F979402BBF3",
            "data": {
                "label": "Image"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_3_1_0_map.gif",
                                "width": 184,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 59.97,
                    "hfov": 58.26,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -17.28
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Tangga ke Lantai 2",
                    "click": "this.openLink('../Lantai 2/index.htm', '_self')"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 59.97,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_3_0.png",
                                "width": 1044,
                                "class": "ImageResourceLevel",
                                "height": 1135
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -17.28,
                    "hfov": 58.26,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_849C3F49_A67D_9C9A_41E1_8FD94536211F",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_4_1_0_map.gif",
                                "width": 100,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -39.97,
                    "hfov": 27.28,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -12.2
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lemari Barang"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -39.97,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_4_0.png",
                                "width": 454,
                                "class": "ImageResourceLevel",
                                "height": 905
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -12.2,
                    "hfov": 27.28,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8330B47B_A677_6D7E_41D0_7661F675535D",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_5_1_0_map.gif",
                                "width": 94,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -98.41,
                    "hfov": 15.11,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -7.4
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lemari Barang"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -98.41,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_5_0.png",
                                "width": 248,
                                "class": "ImageResourceLevel",
                                "height": 524
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -7.4,
                    "hfov": 15.11,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_812B1E83_A674_9D8F_41E4_9FC55CCDB7CE",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_6_1_0_map.gif",
                                "width": 137,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -114.16,
                    "hfov": 18.48,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -6.62
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lemari Barang"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -114.16,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_6_0.png",
                                "width": 304,
                                "class": "ImageResourceLevel",
                                "height": 442
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -6.62,
                    "hfov": 18.48,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_83BE67B5_A64B_AB8B_418F_D50BB9FB73B9",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_7_1_0_map.gif",
                                "width": 28,
                                "class": "ImageResourceLevel",
                                "height": 86
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -82.46,
                    "hfov": 3.53,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -14.6
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Kotak Sampah"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -82.46,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_7_0.png",
                                "width": 57,
                                "class": "ImageResourceLevel",
                                "height": 173
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -14.6,
                    "hfov": 3.53,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_82D9D76D_A64D_EC9A_41B7_C3682516990B",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_8_1_0_map.gif",
                                "width": 70,
                                "class": "ImageResourceLevel",
                                "height": 108
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -56.49,
                    "hfov": 8.59,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -13.33
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Kursi Tunggu"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -56.49,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_8_0.png",
                                "width": 140,
                                "class": "ImageResourceLevel",
                                "height": 217
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -13.33,
                    "hfov": 8.59,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8159377D_A64D_AB7B_41C3_AA26CFC8B822",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_9_1_0_map.gif",
                                "width": 69,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 95.4,
                    "hfov": 11.34,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -6.55
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lemari Alat Pelindung Diri (APD)"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 95.4,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_9_0.png",
                                "width": 186,
                                "class": "ImageResourceLevel",
                                "height": 534
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -6.55,
                    "hfov": 11.34,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_82A180AA_A654_A59E_41D2_0D6EB0052B2E",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_10_1_0_map.gif",
                                "width": 115,
                                "class": "ImageResourceLevel",
                                "height": 107
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -136.54,
                    "hfov": 14.01,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -12.94
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -136.54,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_10_0.png",
                                "width": 230,
                                "class": "ImageResourceLevel",
                                "height": 214
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -12.94,
                    "hfov": 14.01,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_83385661_A655_EC8A_41CC_00DD78F35CCE",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_11_1_0_map.gif",
                                "width": 103,
                                "class": "ImageResourceLevel",
                                "height": 115
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 125.04,
                    "hfov": 12.55,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -13.32
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Kursi Tunggu"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 125.04,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_11_0.png",
                                "width": 206,
                                "class": "ImageResourceLevel",
                                "height": 230
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -13.32,
                    "hfov": 12.55,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_830815C4_A65D_AF89_41C6_DED740C5D2E8",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_12_1_0_map.gif",
                                "width": 42,
                                "class": "ImageResourceLevel",
                                "height": 146
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 102.88,
                    "hfov": 5.23,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -3.31
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Rak Sepatu"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 102.88,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_12_0.png",
                                "width": 85,
                                "class": "ImageResourceLevel",
                                "height": 292
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -3.31,
                    "hfov": 5.23,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_82321A0C_A65F_649A_41CB_EFB9F583E6F9",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_13_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 46.46,
                    "hfov": 20.68,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": 5.57
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA, this.camera_B8E4102C_B7D2_DD11_41B4_2D0F8530D664); this.mainPlayList.set('selectedIndex', 7)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80ED896D_A6F5_A49B_41A0_F2D472E9818D",
                    "pitch": 5.57,
                    "yaw": 46.46,
                    "hfov": 20.68,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_81B7FD45_A6CB_9C8B_41D3_98901F1014E0",
            "data": {
                "label": "Arrow 01a"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_14_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 111.63,
                    "hfov": 15.9,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -16.9
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF, this.camera_B8842049_B7D2_DD10_41C0_DD1F7444C646); this.mainPlayList.set('selectedIndex', 5)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80EC396D_A6F5_A49B_41D8_D036956A7B2C",
                    "pitch": -16.9,
                    "yaw": 111.63,
                    "hfov": 15.9,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_81A6D461_A6CB_6C8A_41DF_BB7A691F3527",
            "data": {
                "label": "Arrow 01c"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_15_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -162.62,
                    "hfov": 14.32,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -30.5
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_1F3A89CE_1349_DC40_4197_496928E9DA69, this.camera_B894003B_B7D2_DD70_41C4_68CD7C85C949); this.mainPlayList.set('selectedIndex', 3)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80ECD96D_A6F5_A49B_41E1_725D74AFC74C",
                    "pitch": -30.5,
                    "yaw": -162.62,
                    "hfov": 14.32,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_81457F0C_A6F4_BC9A_41B1_E5049EF2A302",
            "data": {
                "label": "Arrow 01c"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_0_0_0_map.gif",
                                "width": 16,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -4.4,
                    "hfov": 17.42,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": 2.8
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Laboratorium Pembelajaran Fisika",
                    "click": "this.openLink('../Labfis/index.htm', '_self')"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_B9C65B92_A5BB_BAED_41D5_588C62A32F96",
                    "pitch": 2.8,
                    "yaw": -4.4,
                    "hfov": 17.42,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_03CD4A96_1358_5CC0_41AD_D9548CF79F9A",
            "data": {
                "label": "Pintu Labmat"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_2_0_map.gif",
                                "width": 106,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 2.55,
                    "hfov": 59.48,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -14.72
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Laboratorium Pembelajaran Matematika",
                    "click": "this.openLink('../Labmath/index.htm', '_self')"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_2_0.png",
                                "width": 1005,
                                "class": "ImageResourceLevel",
                                "height": 151
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -14.72,
                    "yaw": 2.55,
                    "hfov": 59.48,
                    "distance": 50
                }
            ],
            "id": "overlay_B30620F7_A5A4_E613_41DF_912F2E83F5F9",
            "data": {
                "label": "Laboratorium Pembelajaran Fisika"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_3_1_0_map.gif",
                                "width": 61,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -68.75,
                    "hfov": 21.67,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -10.48
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Rak Sepatu"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -68.75,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_3_0.png",
                                "width": 358,
                                "class": "ImageResourceLevel",
                                "height": 1170
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -10.48,
                    "hfov": 21.67,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_82333FC0_A6B5_FB8A_41DA_E653BA62BF4A",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_4_1_0_map.gif",
                                "width": 50,
                                "class": "ImageResourceLevel",
                                "height": 173
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -84.81,
                    "hfov": 6.12,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -4.63
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lemari Alat Pelindung Diri (APD)"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -84.81,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_4_0.png",
                                "width": 100,
                                "class": "ImageResourceLevel",
                                "height": 346
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -4.63,
                    "hfov": 6.12,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_82DDFCC9_A6B5_BD9B_41BF_D11AA728D48E",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_6_0_6_map.gif",
                                "width": 16,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 43.76,
                    "hfov": 9.6,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": 4.25
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.showPopupPanoramaOverlay(this.popup_807CC53C_A6DB_6CF9_41D1_1D3F37446BD6, {'pressedBackgroundOpacity':0.3,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconColor':'#888888','rollOverBorderSize':0,'backgroundOpacity':0.3,'iconWidth':20,'borderSize':0,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'iconHeight':20,'paddingBottom':5,'pressedBorderColor':'#000000','rollOverBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','iconColor':'#000000','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'pressedIconLineWidth':5,'pressedBorderSize':0,'rollOverBorderColor':'#000000','iconLineWidth':5,'rollOverBackgroundOpacity':0.3,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconHeight':20,'rollOverIconColor':'#666666','rollOverIconWidth':20,'pressedBackgroundColorDirection':'vertical','pressedIconWidth':20,'pressedIconHeight':20,'paddingRight':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconLineWidth':5,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderColor':'#000000'}, this.ImageResource_8098297B_A6F5_A77F_41DB_B3E45FBEF4AA, null, null, null, null, false)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80E8796E_A6F5_A496_41E0_1107B6D5DC8B",
                    "pitch": 4.25,
                    "yaw": 43.76,
                    "hfov": 9.6,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8F275BCC_A6BD_9B99_41BB_570C4111AC46",
            "data": {
                "label": "Info 02"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_7_1_6_map.gif",
                                "width": 86,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 122.58,
                    "hfov": 11.14,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -7.46
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Ruang Dosen"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": 122.58,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_7_0.png",
                                "width": 182,
                                "class": "ImageResourceLevel",
                                "height": 840
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -7.46,
                    "hfov": 11.14,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8F655E39_A6DB_9CFA_41B5_6E2848EDDAA4",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_8_1_6_map.gif",
                                "width": 103,
                                "class": "ImageResourceLevel",
                                "height": 112
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -108.42,
                    "hfov": 12.6,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -13.13
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -108.42,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_8_0.png",
                                "width": 206,
                                "class": "ImageResourceLevel",
                                "height": 224
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -13.13,
                    "hfov": 12.6,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_80689B47_A6D5_6496_41D9_558CB37D55E3",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_10_1_0_map.gif",
                                "width": 55,
                                "class": "ImageResourceLevel",
                                "height": 94
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -121.69,
                    "hfov": 6.75,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -22.69
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Kotak Sampah"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -121.69,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_10_0.png",
                                "width": 110,
                                "class": "ImageResourceLevel",
                                "height": 189
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -22.69,
                    "hfov": 6.75,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8279BD78_A6CB_BF79_41C5_145A9809E9C2",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_11_0_6_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -96.52,
                    "hfov": 15.55,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -20.68
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF, this.camera_B92BAFF0_B7D2_C2F1_41E6_2354B750AE01); this.mainPlayList.set('selectedIndex', 5)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_8097496F_A6F5_A496_41A4_56EACB79B6ED",
                    "pitch": -20.68,
                    "yaw": -96.52,
                    "hfov": 15.55,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8161687C_A6F5_6579_41E4_C82C4CAE7C75",
            "data": {
                "label": "Arrow 01c"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_13_1_0_map.gif",
                                "width": 30,
                                "class": "ImageResourceLevel",
                                "height": 200
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -120.08,
                    "hfov": 5.36,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -4.89
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": true,
            "enabledInCardboard": true,
            "items": [
                {
                    "yaw": -120.08,
                    "roll": 0,
                    "distance": 50,
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_13_0.png",
                                "width": 87,
                                "class": "ImageResourceLevel",
                                "height": 559
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": -4.89,
                    "hfov": 5.36,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_803CA8F4_A6BC_A589_41E0_922831E71F81",
            "data": {
                "label": "Polygon"
            }
        },
        {
            "media": "this.panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC",
            "end": "this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D43C90_A5A4_5EED_41D8_81A155CD02FE, 'showEffect', false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true, -1, this.effect_B3D5FC91_A5A4_5EEF_41D4_23A05265552B, 'showEffect', false)",
            "start": "this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true)",
            "class": "PanoramaPlayListItem",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_B98E0F8E_B7D2_C311_41D3_B5CCE8543A4F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D47C90_A5A4_5EED_41AF_D5EBD2AE7615, 'showEffect', false); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true, -1, this.effect_B3D5DC90_A5A4_5EED_41AD_BDAF394A08F7, 'showEffect', false)",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_B98E0F8E_B7D2_C311_41D3_B5CCE8543A4F",
            "camera": "this.panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_camera"
        },
        {
            "media": "this.panorama_18D0788B_1348_5CC7_4191_217370E98EAE",
            "end": "this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D57C91_A5A4_5EEF_41E3_2066C4CEC116, 'showEffect', false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true, -1, this.effect_B3D6DC91_A5A4_5EEF_41E1_353B52D89CE8, 'showEffect', false)",
            "start": "this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true)",
            "class": "PanoramaPlayListItem",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_B9B2FF91_B7D2_C330_41C0_DAD39F6A9066, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D54C91_A5A4_5EEF_41E0_3F49599ECA96, 'showEffect', false); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true, -1, this.effect_B3D51C91_A5A4_5EEF_41C8_53BFFDB80376, 'showEffect', false)",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_B9B2FF91_B7D2_C330_41C0_DAD39F6A9066",
            "camera": "this.panorama_18D0788B_1348_5CC7_4191_217370E98EAE_camera"
        },
        {
            "media": "this.panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7",
            "end": "this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true, -1, this.effect_B3D41C91_A5A4_5EEF_41D6_5CC73C694B5E, 'showEffect', false)",
            "start": "this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true)",
            "class": "PanoramaPlayListItem",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_B9B30F92_B7D2_C330_41E1_E34C82797A43, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true, -1, this.effect_B3D46C91_A5A4_5EEF_41DB_8689912F9C31, 'showEffect', false)",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_B9B30F92_B7D2_C330_41E1_E34C82797A43",
            "camera": "this.panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_camera"
        },
        {
            "media": "this.panorama_1F3A89CE_1349_DC40_4197_496928E9DA69",
            "end": "this.setComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true, -1, this.effect_B3D59C91_A5A4_5EEF_41DF_1CEDB4F5CA60, 'showEffect', false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D5AC91_A5A4_5EEF_41DB_D4047327BCC6, 'showEffect', false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false, -1, this.effect_B3D51C91_A5A4_5EEF_41C2_E93F5593D28A, 'hideEffect', false); this.setComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false, -1, this.effect_B3D6DC91_A5A4_5EEF_41C3_B61C4E101F94, 'hideEffect', false)",
            "start": "this.keepComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true); this.keepComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, true)",
            "class": "PanoramaPlayListItem",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_B9B15F93_B7D2_C330_4187_1D957994203C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4); this.keepComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, false); this.setComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true, -1, this.effect_B3D5FC91_A5A4_5EEF_41D9_7C3A0A15D0C8, 'showEffect', false); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D58C91_A5A4_5EEF_41DC_F2925CD97BCF, 'showEffect', false); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false, -1, this.effect_B3D57C91_A5A4_5EEF_41DE_F1E687D202EF, 'hideEffect', false); this.keepComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false); this.setComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false, -1, this.effect_B3D53C91_A5A4_5EEF_41E3_6A5CCCF1FF08, 'hideEffect', false)",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_B9B15F93_B7D2_C330_4187_1D957994203C",
            "camera": "this.panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_camera"
        },
        {
            "media": "this.panorama_18D5F0D5_1349_CC43_414C_531D97C056B0",
            "end": "this.setComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true, -1, this.effect_B3D65C92_A5A4_5EED_41DD_C8A10345FAF6, 'showEffect', false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D60C92_A5A4_5EED_41CA_322CCB28E377, 'showEffect', false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false, -1, this.effect_B3D62C92_A5A4_5EED_41D8_87CBB4EAC67D, 'hideEffect', false); this.setComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false, -1, this.effect_B3D7BC92_A5A4_5EED_41D7_BE6C605EF077, 'hideEffect', false)",
            "start": "this.keepComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true); this.keepComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, true)",
            "class": "PanoramaPlayListItem",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_B9B18F93_B7D2_C330_41E0_C6DCE40997F6, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5); this.keepComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, false); this.setComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true, -1, this.effect_B3D68C92_A5A4_5EED_41E0_8D3E8D1E6DA6, 'showEffect', false); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D66C92_A5A4_5EED_41E3_43370C97EB97, 'showEffect', false); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false, -1, this.effect_B3D63C92_A5A4_5EED_41C1_595623F48705, 'hideEffect', false); this.keepComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false); this.setComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false, -1, this.effect_B3D7FC92_A5A4_5EED_41D4_4C8FFCE5C0EB, 'hideEffect', false)",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_B9B18F93_B7D2_C330_41E0_C6DCE40997F6",
            "camera": "this.panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_camera"
        },
        {
            "media": "this.panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF",
            "end": "this.setComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true, -1, this.effect_B3D70C92_A5A4_5EED_4181_BDF87938A527, 'showEffect', false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D0CC92_A5A4_5EED_41E4_82C9E6E38728, 'showEffect', false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false, -1, this.effect_B3D61C92_A5A4_5EED_41DC_7875F3D654D0, 'hideEffect', false); this.setComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false, -1, this.effect_B3D62C92_A5A4_5EED_41D7_2EF607B123F3, 'hideEffect', false)",
            "start": "this.keepComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true); this.keepComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, true)",
            "class": "PanoramaPlayListItem",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_B9B61F93_B7D2_C330_41D6_3E113A1D8DFC, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6); this.keepComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, false); this.setComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true, -1, this.effect_B3D76C92_A5A4_5EED_41DE_D9D143976466, 'showEffect', false); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D72C92_A5A4_5EED_41E1_525D83C18BC8, 'showEffect', false); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false, -1, this.effect_B3D0FC92_A5A4_5EED_41C9_FD52A5E9C12E, 'hideEffect', false); this.keepComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false); this.setComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false, -1, this.effect_B3D60C92_A5A4_5EED_41E2_FC693C134BB9, 'hideEffect', false)",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_B9B61F93_B7D2_C330_41D6_3E113A1D8DFC",
            "camera": "this.panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_camera"
        },
        {
            "media": "this.panorama_18D01CC6_1348_3440_41A2_BD2321889440",
            "end": "this.setComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true, -1, this.effect_B3D7BC94_A5A4_5E14_41D9_C71B3B268653, 'showEffect', false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D71C94_A5A4_5E14_41BB_DF32683A789C, 'showEffect', false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false, -1, this.effect_B3D73C94_A5A4_5E14_41D7_C4573E985F86, 'hideEffect', false); this.setComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false, -1, this.effect_B3D0FC94_A5A4_5E14_41DB_17F3DD38431B, 'hideEffect', false)",
            "start": "this.keepComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true); this.keepComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, true)",
            "class": "PanoramaPlayListItem",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_B9B75F94_B7D2_C330_41E2_5D88B32B6FE7, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7); this.keepComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, false); this.setComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true, -1, this.effect_B3D78C92_A5A4_5EED_41C3_10FFA0E3EE4D, 'showEffect', false); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D75C94_A5A4_5E14_41C1_1089E808AA69, 'showEffect', false); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false, -1, this.effect_B3D70C94_A5A4_5E14_41C4_FA6A58355F59, 'hideEffect', false); this.keepComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false); this.setComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false, -1, this.effect_B3D0DC94_A5A4_5E14_41D7_B55F06645924, 'hideEffect', false)",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_B9B75F94_B7D2_C330_41E2_5D88B32B6FE7",
            "camera": "this.panorama_18D01CC6_1348_3440_41A2_BD2321889440_camera"
        },
        {
            "media": "this.panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA",
            "end": "this.setComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true, -1, this.effect_B3D07C94_A5A4_5E14_41C3_EB30AFDA1D68, 'showEffect', false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D03C94_A5A4_5E14_41E2_4B380C4ECC34, 'showEffect', false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false, -1, this.effect_B3D1FC94_A5A4_5E14_41D7_EAADDD9AE89D, 'hideEffect', false); this.setComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false, -1, this.effect_B3D1AC94_A5A4_5E14_41C4_FDBBFF1716DB, 'hideEffect', false); this.trigger('tourEnded')",
            "start": "this.keepComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, true); this.keepComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, true)",
            "class": "PanoramaPlayListItem",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_B9B7DF94_B7D2_C330_419E_F8A75A6207E5, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 0); this.keepComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, false); this.setComponentVisibility(this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C, true, -1, this.effect_B3D0AC94_A5A4_5E14_41E1_C976603C7103, 'showEffect', false); this.keepComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, false); this.setComponentVisibility(this.Image_B654614C_A5AC_A675_41C4_6D473AA17B3D, true, -1, this.effect_B3D06C94_A5A4_5E14_41CE_9C268C54CE54, 'showEffect', false); this.keepComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false); this.setComponentVisibility(this.Container_B1A4ED6C_A5A4_7E35_41E3_56759BA589E1, false, -1, this.effect_B3D1DC94_A5A4_5E14_41DE_8002643BB427, 'hideEffect', false); this.keepComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false); this.setComponentVisibility(this.Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06, false, -1, this.effect_B3D18C94_A5A4_5E14_41D8_FCB3FFFC3339, 'hideEffect', false)",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_B9B7DF94_B7D2_C330_419E_F8A75A6207E5",
            "camera": "this.panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_camera"
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 107.18,
                "x": 36.15,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_0_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 135.98,
                "y": 1159.37
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 0)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": true,
            "id": "overlay_1AE9A4DF_17EB_EDA4_41AF_434A923CD2CA",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 36.15,
                "height": 135.98,
                "y": 1159.37,
                "width": 107.18,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_0.png",
                            "width": 106,
                            "class": "ImageResourceLevel",
                            "height": 134
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 107.18,
                "x": 249.11,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_1_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 135.98,
                "y": 1184.12
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 1)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": true,
            "id": "overlay_19B73809_17F4_64AF_4198_BFE07171FADA",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 249.11,
                "height": 135.98,
                "y": 1184.12,
                "width": 107.18,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_1.png",
                            "width": 106,
                            "class": "ImageResourceLevel",
                            "height": 134
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 107.18,
                "x": 377.67,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_2_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 135.98,
                "y": 1170.94
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 2)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": true,
            "id": "overlay_190D6D4A_17F4_9CAD_41AD_AE676A1F0D78",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 377.67,
                "height": 135.98,
                "y": 1170.94,
                "width": 107.18,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_2.png",
                            "width": 106,
                            "class": "ImageResourceLevel",
                            "height": 134
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 107.18,
                "x": 631.23,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_3_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 135.98,
                "y": 1161.5
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 3)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": true,
            "id": "overlay_1A05496D_17F4_E767_4199_0CFF1F628473",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 631.23,
                "height": 135.98,
                "y": 1161.5,
                "width": 107.18,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_3.png",
                            "width": 106,
                            "class": "ImageResourceLevel",
                            "height": 134
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 107.18,
                "x": 765.49,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_4_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 135.98,
                "y": 1157.41
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 4)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": true,
            "id": "overlay_1A6BE89E_17F4_E5A5_41AC_778EF90968F6",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 765.49,
                "height": 135.98,
                "y": 1157.41,
                "width": 107.18,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_4.png",
                            "width": 106,
                            "class": "ImageResourceLevel",
                            "height": 134
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 107.18,
                "x": 1290.06,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_5_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 135.98,
                "y": 1170.94
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 7)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": true,
            "id": "overlay_19D36A30_17F4_A4FC_41B2_FB1697C0EC8D",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 1290.06,
                "height": 135.98,
                "y": 1170.94,
                "width": 107.18,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_5.png",
                            "width": 106,
                            "class": "ImageResourceLevel",
                            "height": 134
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 107.18,
                "x": 778.85,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_6_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 135.98,
                "y": 1622.86
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 5)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": true,
            "id": "overlay_1A0A66F8_17F4_6D6C_41A6_0AB491743C39",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 778.85,
                "height": 135.98,
                "y": 1622.86,
                "width": 107.18,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_6.png",
                            "width": 106,
                            "class": "ImageResourceLevel",
                            "height": 134
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 107.18,
                "x": 764.78,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_7_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 135.98,
                "y": 1978.81
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 6)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": true,
            "id": "overlay_19F9CBD6_17F5_9BA5_4197_FFC573153A72",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 764.78,
                "height": 135.98,
                "y": 1978.81,
                "width": 107.18,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_1B0E5F5C_17EC_9CA5_41B4_240F73C6E463_HS_7.png",
                            "width": 106,
                            "class": "ImageResourceLevel",
                            "height": 134
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "toolTipBorderSize": 1,
            "horizontalAlign": "center",
            "toolTipPaddingLeft": 6,
            "maxWidth": 58,
            "id": "IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781",
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "maxHeight": 58,
            "toolTipPaddingTop": 4,
            "toolTipShadowOpacity": 1,
            "width": 58,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipFontStyle": "normal",
            "minHeight": 1,
            "toolTipFontFamily": "Arial",
            "propagateClick": true,
            "toolTipTextShadowOpacity": 0,
            "verticalAlign": "middle",
            "toolTip": "Nonaktifkan Hotspot",
            "paddingRight": 0,
            "height": 58,
            "toolTipBorderColor": "#767676",
            "minWidth": 1,
            "mode": "toggle",
            "toolTipShadowHorizontalLength": 0,
            "toolTipShadowSpread": 0,
            "toolTipShadowBlurRadius": 3,
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "toolTipFontColor": "#606060",
            "toolTipShadowVerticalLength": 0,
            "paddingTop": 0,
            "pressedIconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_pressed.png",
            "toolTipPaddingBottom": 4,
            "paddingBottom": 0,
            "toolTipFontSize": "1.65vmin",
            "borderSize": 0,
            "toolTipTextShadowBlurRadius": 3,
            "paddingLeft": 0,
            "toolTipShadowColor": "#333333",
            "iconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781.png",
            "transparencyActive": true,
            "shadow": false,
            "toolTipFontWeight": "normal",
            "data": {
                "name": "IconButton HS "
            },
            "class": "IconButton",
            "pressedRollOverIconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_pressed_rollover.png",
            "cursor": "hand",
            "toolTipPaddingRight": 6
        },
        {
            "toolTipBorderSize": 1,
            "horizontalAlign": "center",
            "toolTipPaddingLeft": 6,
            "maxWidth": 58,
            "id": "IconButton_B156C269_BF46_B846_41B6_1BAAE2858250",
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "maxHeight": 58,
            "toolTipPaddingTop": 4,
            "toolTipShadowOpacity": 1,
            "width": 58,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipFontStyle": "normal",
            "minHeight": 1,
            "toolTipFontFamily": "Arial",
            "propagateClick": true,
            "toolTipTextShadowOpacity": 0,
            "verticalAlign": "middle",
            "toolTip": "Gyroscope",
            "paddingRight": 0,
            "height": 58,
            "toolTipBorderColor": "#767676",
            "minWidth": 1,
            "mode": "toggle",
            "toolTipShadowHorizontalLength": 0,
            "toolTipShadowSpread": 0,
            "toolTipShadowBlurRadius": 3,
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "toolTipFontColor": "#606060",
            "toolTipShadowVerticalLength": 0,
            "paddingTop": 0,
            "pressedIconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_pressed.png",
            "toolTipPaddingBottom": 4,
            "paddingBottom": 0,
            "toolTipFontSize": "1.65vmin",
            "borderSize": 0,
            "toolTipTextShadowBlurRadius": 3,
            "paddingLeft": 0,
            "toolTipShadowColor": "#333333",
            "iconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250.png",
            "transparencyActive": true,
            "shadow": false,
            "toolTipFontWeight": "normal",
            "data": {
                "name": "IconButton GYRO"
            },
            "class": "IconButton",
            "pressedRollOverIconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_pressed_rollover.png",
            "cursor": "hand",
            "toolTipPaddingRight": 6
        },
        {
            "toolTipBorderSize": 1,
            "horizontalAlign": "center",
            "toolTipPaddingLeft": 6,
            "maxWidth": 58,
            "id": "IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7",
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "maxHeight": 58,
            "toolTipPaddingTop": 4,
            "toolTipShadowOpacity": 1,
            "width": 58,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipFontStyle": "normal",
            "rollOverIconURL": "skin/IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7_rollover.png",
            "minHeight": 1,
            "toolTipFontFamily": "Arial",
            "propagateClick": true,
            "toolTipTextShadowOpacity": 0,
            "verticalAlign": "middle",
            "toolTip": "VR Mode",
            "paddingRight": 0,
            "height": 58,
            "toolTipBorderColor": "#767676",
            "minWidth": 1,
            "mode": "push",
            "toolTipShadowHorizontalLength": 0,
            "toolTipShadowSpread": 0,
            "toolTipShadowBlurRadius": 3,
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "toolTipFontColor": "#606060",
            "toolTipShadowVerticalLength": 0,
            "paddingTop": 0,
            "toolTipPaddingBottom": 4,
            "paddingBottom": 0,
            "toolTipFontSize": "1.65vmin",
            "borderSize": 0,
            "toolTipTextShadowBlurRadius": 3,
            "paddingLeft": 0,
            "toolTipShadowColor": "#333333",
            "iconURL": "skin/IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7.png",
            "transparencyActive": true,
            "shadow": false,
            "toolTipFontWeight": "normal",
            "data": {
                "name": "IconButton VR"
            },
            "class": "IconButton",
            "cursor": "hand",
            "toolTipPaddingRight": 6
        },
        {
            "progressBarBorderSize": 0,
            "id": "ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4",
            "left": "15%",
            "playbackBarHeadShadowHorizontalLength": 0,
            "playbackBarProgressBorderRadius": 0,
            "toolTipShadowOpacity": 1,
            "right": "15%",
            "playbackBarBorderRadius": 0,
            "progressBarBorderRadius": 0,
            "toolTipFontStyle": "normal",
            "playbackBarProgressBorderColor": "#000000",
            "playbackBarHeadBorderRadius": 0,
            "toolTipFontFamily": "Arial",
            "playbackBarHeadBorderColor": "#000000",
            "toolTipTextShadowOpacity": 0,
            "minHeight": 1,
            "progressLeft": 0,
            "propagateClick": false,
            "paddingRight": 0,
            "playbackBarProgressOpacity": 1,
            "playbackBarBorderSize": 0,
            "transitionDuration": 500,
            "playbackBarHeadBorderSize": 0,
            "minWidth": 1,
            "playbackBarBackgroundOpacity": 1,
            "toolTipShadowHorizontalLength": 0,
            "toolTipFontColor": "#606060",
            "toolTipShadowVerticalLength": 0,
            "vrPointerSelectionColor": "#FF6600",
            "borderSize": 0,
            "playbackBarHeadShadowColor": "#000000",
            "toolTipBackgroundColor": "#F6F6F6",
            "progressRight": 0,
            "firstTransitionDuration": 0,
            "progressOpacity": 1,
            "playbackBarHeadBackgroundColor": [
                "#111111",
                "#666666"
            ],
            "vrPointerSelectionTime": 2000,
            "progressBarBackgroundColorDirection": "vertical",
            "progressBottom": 2,
            "progressHeight": 10,
            "playbackBarHeadShadow": true,
            "shadow": false,
            "playbackBarHeadShadowVerticalLength": 0,
            "playbackBarHeadBackgroundColorDirection": "vertical",
            "class": "ViewerArea",
            "playbackBarProgressBackgroundColor": [
                "#3399FF"
            ],
            "playbackBarOpacity": 1,
            "progressBackgroundOpacity": 1,
            "toolTipPaddingRight": 6,
            "playbackBarHeadShadowOpacity": 0.7,
            "toolTipBorderSize": 1,
            "toolTipPaddingLeft": 6,
            "toolTipPaddingTop": 4,
            "vrPointerColor": "#FFFFFF",
            "toolTipDisplayTime": 600,
            "progressBarOpacity": 1,
            "playbackBarBorderColor": "#FFFFFF",
            "progressBorderSize": 0,
            "transitionMode": "blending",
            "displayTooltipInTouchScreens": true,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "progressBorderRadius": 0,
            "playbackBarProgressBackgroundColorRatios": [
                0
            ],
            "playbackBarLeft": 0,
            "progressBackgroundColorRatios": [
                0.01
            ],
            "playbackBarHeadHeight": 15,
            "top": "10%",
            "playbackBarHeadShadowBlurRadius": 3,
            "bottom": "10%",
            "playbackBarHeadBackgroundColorRatios": [
                0,
                1
            ],
            "progressBarBorderColor": "#0066FF",
            "toolTipBorderColor": "#767676",
            "progressBarBackgroundColorRatios": [
                0
            ],
            "progressBackgroundColorDirection": "vertical",
            "toolTipShadowSpread": 0,
            "playbackBarHeadOpacity": 1,
            "playbackBarBottom": 0,
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "toolTipShadowBlurRadius": 3,
            "progressBarBackgroundColor": [
                "#3399FF"
            ],
            "paddingTop": 0,
            "progressBorderColor": "#FFFFFF",
            "toolTipPaddingBottom": 4,
            "paddingBottom": 0,
            "toolTipFontSize": 12,
            "toolTipTextShadowBlurRadius": 3,
            "progressBackgroundColor": [
                "#FFFFFF"
            ],
            "paddingLeft": 0,
            "click": "this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, false, 0, null, null, false)",
            "playbackBarProgressBackgroundColorDirection": "vertical",
            "toolTipShadowColor": "#333333",
            "playbackBarBackgroundColor": [
                "#FFFFFF"
            ],
            "data": {
                "name": "Floor Plan big"
            },
            "playbackBarHeight": 10,
            "toolTipFontWeight": "normal",
            "playbackBarBackgroundColorDirection": "vertical",
            "playbackBarHeadWidth": 6,
            "playbackBarProgressBorderSize": 0,
            "playbackBarRight": 0
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0_HS_2_0_map.gif",
                                "width": 16,
                                "class": "ImageResourceLevel",
                                "height": 22
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 1.71,
                    "hfov": 8.71,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": 13.32
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0_HS_2_0.png",
                                "width": 296,
                                "class": "ImageResourceLevel",
                                "height": 415
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "pitch": 13.32,
                    "yaw": 1.71,
                    "hfov": 8.71,
                    "distance": 50
                }
            ],
            "id": "overlay_2811B2EA_3A9F_CB26_41CC_41A189179DF0",
            "data": {
                "label": "L"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0_HS_3_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -6.99,
                    "hfov": 15.39,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -22.19
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7, this.camera_B8D5A001_B7D2_DD10_41DE_F3E380E347DF); this.mainPlayList.set('selectedIndex', 2)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80E1596A_A6F5_A49E_41A3_DD67463CDD61",
                    "pitch": -22.19,
                    "yaw": -6.99,
                    "hfov": 15.39,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_812745FF_A6CF_6F77_41D1_B3B0601270D6",
            "data": {
                "label": "Arrow 01c"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0_HS_4_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 179.62,
                    "hfov": 16.05,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -15.02
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "click": "this.startPanoramaWithCamera(this.panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC, this.camera_B8CA5010_B7D2_DD31_41C5_0E91EEA808C8); this.mainPlayList.set('selectedIndex', 0)",
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_80E1196B_A6F5_A49F_41B6_79C09971D0D0",
                    "pitch": -15.02,
                    "yaw": 179.62,
                    "hfov": 16.05,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8F6DB907_A6CF_A495_41BB_743B4C40B4AE",
            "data": {
                "label": "Arrow 01c"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 87.24,
                "x": 1116.43,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_0_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 110.12,
                "y": 1591.24
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 0)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "id": "overlay_02595D63_2A24_1369_4184_974001AFE141",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 1116.16,
                "height": 110.12,
                "y": 1591.1,
                "width": 87.24,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_0.png",
                            "width": 86,
                            "class": "ImageResourceLevel",
                            "height": 110
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 87.24,
                "x": 1132.37,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_1_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 110.12,
                "y": 1361.87
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 1)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "id": "overlay_0FAC13D2_2A24_17AB_41B0_EE0012666144",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 1132.23,
                "height": 110.12,
                "y": 1361.74,
                "width": 87.24,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_1.png",
                            "width": 86,
                            "class": "ImageResourceLevel",
                            "height": 110
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 87.24,
                "x": 1162.92,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_2_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 110.12,
                "y": 1245.85
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 1)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "id": "overlay_0E84F714_2A27_F0AF_41B1_E0EE4AA39B58",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 1162.65,
                "height": 110.12,
                "y": 1245.71,
                "width": 87.24,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_2.png",
                            "width": 86,
                            "class": "ImageResourceLevel",
                            "height": 110
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 87.24,
                "x": 1184.35,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_3_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 110.12,
                "y": 982.85
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 3)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "id": "overlay_0C2A42E0_2A24_3167_418D_00F498BB8F5A",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 1184.22,
                "height": 110.12,
                "y": 982.72,
                "width": 87.24,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_3.png",
                            "width": 86,
                            "class": "ImageResourceLevel",
                            "height": 110
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 87.24,
                "x": 1189.98,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_4_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 110.12,
                "y": 806.67
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 4)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "id": "overlay_0039477D_2A24_7F59_41B0_4AC7AC68A709",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 1189.84,
                "height": 110.12,
                "y": 806.54,
                "width": 87.24,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_4.png",
                            "width": 86,
                            "class": "ImageResourceLevel",
                            "height": 110
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 87.24,
                "x": 1622.72,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_5_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 110.12,
                "y": 827.44
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 5)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "id": "overlay_0D15C41D_2A24_10D9_41B2_AAA56CEB7B6C",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 1622.45,
                "height": 110.12,
                "y": 827.3,
                "width": 87.24,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_5.png",
                            "width": 86,
                            "class": "ImageResourceLevel",
                            "height": 110
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 87.24,
                "x": 1989.55,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_6_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 110.12,
                "y": 830.92
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 6)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "id": "overlay_0D481E59_2A24_3159_4196_9F2BF3543B3E",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 1989.42,
                "height": 110.12,
                "y": 830.79,
                "width": 87.24,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_6.png",
                            "width": 86,
                            "class": "ImageResourceLevel",
                            "height": 110
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "map": {
                "width": 87.24,
                "x": 1200.29,
                "class": "HotspotMapOverlayMap",
                "offsetX": 0,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_7_map.gif",
                            "width": 16,
                            "class": "ImageResourceLevel",
                            "height": 20
                        }
                    ],
                    "class": "ImageResource"
                },
                "offsetY": 0,
                "height": 110.12,
                "y": 349.54
            },
            "class": "AreaHotspotMapOverlay",
            "areas": [
                {
                    "click": "this.mainPlayList.set('selectedIndex', 7)",
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000"
                }
            ],
            "rollOverDisplay": false,
            "id": "overlay_02F28305_2A24_F0A9_41A5_35A6DFFC3541",
            "data": {
                "label": "Image"
            },
            "image": {
                "x": 1200.03,
                "height": 110.12,
                "y": 349.41,
                "width": 87.24,
                "image": {
                    "levels": [
                        {
                            "url": "media/map_0EA0810D_2A24_30B9_41A7_BE6E28AD0F14_HS_7.png",
                            "width": 86,
                            "class": "ImageResourceLevel",
                            "height": 110
                        }
                    ],
                    "class": "ImageResource"
                },
                "class": "HotspotMapOverlayImage"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0_HS_2_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": -15.68,
                    "hfov": 16.1,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -39.19
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "click": "this.startPanoramaWithCamera(this.panorama_18D5F0D5_1349_CC43_414C_531D97C056B0, this.camera_B95DBFB4_B7D2_C371_4193_AA7E344616BE); this.mainPlayList.set('selectedIndex', 4)",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lantai 1"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_8097E96F_A6F5_A496_41C8_2FFB4159A707",
                    "pitch": -39.19,
                    "yaw": -15.68,
                    "hfov": 16.1,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_80D50356_A6F5_A489_41C8_92B6172C1117",
            "data": {
                "label": "Arrow 01b"
            }
        },
        {
            "useHandCursor": true,
            "maps": [
                {
                    "image": {
                        "levels": [
                            {
                                "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0_HS_3_0_0_map.gif",
                                "width": 26,
                                "class": "ImageResourceLevel",
                                "height": 16
                            }
                        ],
                        "class": "ImageResource"
                    },
                    "yaw": 20.97,
                    "hfov": 20.56,
                    "class": "HotspotPanoramaOverlayMap",
                    "pitch": -8.22
                }
            ],
            "class": "HotspotPanoramaOverlay",
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea",
                    "toolTip": "Lantai 2",
                    "click": "this.openLink('../Lantai 2/index.htm', '_self')"
                }
            ],
            "rollOverDisplay": false,
            "enabledInCardboard": true,
            "items": [
                {
                    "image": "this.AnimatedImageResource_8097996F_A6F5_A496_41D8_DFF9A13E8728",
                    "pitch": -8.22,
                    "yaw": 20.97,
                    "hfov": 20.56,
                    "distance": 100,
                    "class": "HotspotPanoramaOverlayImage"
                }
            ],
            "id": "overlay_8E03C53C_A6F5_6CFA_41D0_780CB96FDDDD",
            "data": {
                "label": "Lantai 2"
            }
        },
        {
            "horizontalAlign": "center",
            "scrollBarOpacity": 0.5,
            "id": "Container_B1571269_BF46_B846_41D9_B94D861499DF",
            "backgroundOpacity": 0,
            "width": 110,
            "scrollBarVisible": "rollOver",
            "right": "0%",
            "children": [
                "this.IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8"
            ],
            "scrollBarMargin": 2,
            "borderRadius": 0,
            "overflow": "visible",
            "minHeight": 1,
            "propagateClick": true,
            "top": "0%",
            "verticalAlign": "middle",
            "paddingRight": 0,
            "scrollBarWidth": 10,
            "height": 110,
            "minWidth": 1,
            "layout": "horizontal",
            "borderSize": 0,
            "paddingBottom": 0,
            "gap": 10,
            "paddingTop": 0,
            "paddingLeft": 0,
            "contentOpaque": false,
            "scrollBarColor": "#000000",
            "data": {
                "name": "button menu sup"
            },
            "shadow": false,
            "class": "Container"
        },
        {
            "horizontalAlign": "center",
            "scrollBarOpacity": 0.5,
            "id": "Container_B1573269_BF46_B846_41AD_E3E55F50C328",
            "backgroundOpacity": 0,
            "children": [
                "this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7",
                "this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250",
                "this.IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781",
                "this.IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0",
                "this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081",
                "this.IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6"
            ],
            "scrollBarVisible": "rollOver",
            "right": "0%",
            "width": "91.265%",
            "scrollBarMargin": 2,
            "borderRadius": 0,
            "overflow": "scroll",
            "minHeight": 1,
            "propagateClick": true,
            "top": "14.96%",
            "paddingRight": 0,
            "height": "59.417%",
            "verticalAlign": "top",
            "minWidth": 1,
            "layout": "vertical",
            "scrollBarWidth": 10,
            "paddingTop": 0,
            "paddingBottom": 0,
            "gap": 3,
            "borderSize": 0,
            "paddingLeft": 0,
            "contentOpaque": false,
            "scrollBarColor": "#000000",
            "data": {
                "name": "-button set"
            },
            "shadow": false,
            "visible": false,
            "class": "Container"
        },
        {
            "horizontalAlign": "left",
            "maxHeight": 222,
            "maxWidth": 2000,
            "id": "Image_B654614C_A5AC_A675_41C4_6D473AA17B3D",
            "left": "0%",
            "backgroundOpacity": 0,
            "width": "100%",
            "borderRadius": 0,
            "url": "skin/Image_B654614C_A5AC_A675_41C4_6D473AA17B3D.png",
            "minHeight": 1,
            "propagateClick": false,
            "top": "0%",
            "paddingRight": 0,
            "height": "58.392%",
            "verticalAlign": "top",
            "minWidth": 1,
            "paddingTop": 0,
            "paddingBottom": 0,
            "borderSize": 0,
            "paddingLeft": 0,
            "scaleMode": "fit_inside",
            "data": {
                "name": "gdl1"
            },
            "shadow": false,
            "class": "Image"
        },
        {
            "horizontalAlign": "left",
            "maxHeight": 222,
            "maxWidth": 2000,
            "id": "Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06",
            "left": "0%",
            "backgroundOpacity": 0,
            "width": "100%",
            "borderRadius": 0,
            "url": "skin/Image_B6F4E51B_A5AB_EE13_41D8_CEFDFEB53C06.png",
            "minHeight": 1,
            "propagateClick": false,
            "top": "0%",
            "paddingRight": 0,
            "height": "58.392%",
            "verticalAlign": "top",
            "minWidth": 1,
            "paddingTop": 0,
            "paddingBottom": 0,
            "borderSize": 0,
            "paddingLeft": 0,
            "scaleMode": "fit_inside",
            "data": {
                "name": "gdl"
            },
            "shadow": false,
            "class": "Image"
        },
        {
            "horizontalAlign": "left",
            "scrollBarOpacity": 0.5,
            "id": "Container_B0DBDFD9_BF4E_E879_41D9_B737EF8BC042",
            "left": "0%",
            "width": 190,
            "scrollBarVisible": "rollOver",
            "backgroundOpacity": 0.24,
            "overflow": "scroll",
            "children": [
                "this.MapViewer"
            ],
            "scrollBarMargin": 2,
            "borderRadius": 0,
            "backgroundColorRatios": [
                0,
                1
            ],
            "propagateClick": false,
            "minHeight": 1,
            "scrollBarWidth": 10,
            "top": "0%",
            "verticalAlign": "top",
            "paddingRight": 0,
            "backgroundColor": [
                "#FFFFFF",
                "#FFFFFF"
            ],
            "minWidth": 1,
            "layout": "absolute",
            "height": 190,
            "borderSize": 0,
            "paddingTop": 0,
            "backgroundColorDirection": "vertical",
            "paddingBottom": 0,
            "gap": 10,
            "paddingLeft": 0,
            "contentOpaque": false,
            "scrollBarColor": "#000000",
            "data": {
                "name": "minimap"
            },
            "shadow": false,
            "class": "Container"
        },
        {
            "horizontalAlign": "left",
            "scrollBarOpacity": 0.5,
            "id": "Container_0458057F_17F5_EF63_41B5_2CE2DF0373FD",
            "backgroundOpacity": 0,
            "children": [
                "this.IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291",
                "this.IconButton_A7361280_BCBD_AC04_41C9_358137CF7140"
            ],
            "scrollBarVisible": "rollOver",
            "right": "0%",
            "width": "20.833%",
            "scrollBarMargin": 2,
            "borderRadius": 0,
            "overflow": "scroll",
            "minHeight": 1,
            "propagateClick": false,
            "top": "0%",
            "paddingRight": 0,
            "height": "54.211%",
            "verticalAlign": "top",
            "minWidth": 1,
            "layout": "absolute",
            "scrollBarWidth": 10,
            "paddingTop": 0,
            "paddingBottom": 0,
            "gap": 10,
            "borderSize": 0,
            "paddingLeft": 0,
            "contentOpaque": false,
            "scrollBarColor": "#000000",
            "data": {
                "name": "zoom in out"
            },
            "shadow": false,
            "class": "Container"
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_2_0.png",
                    "width": 800,
                    "class": "ImageResourceLevel",
                    "height": 1200
                }
            ],
            "id": "AnimatedImageResource_80EC996D_A6F5_A49B_41E1_547CF3DE0D54",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_11_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_80EA096D_A6F5_A49B_41E4_54AD89A16751",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D1E6D0_1348_3440_41B1_0006B0CFE8CF_0_HS_12_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_80EAB96D_A6F5_A49B_41DB_4215F811116C",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D0E997_1348_5CC0_41AC_A55305EE68DC_0_HS_3_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_80E2E96A_A6F5_A499_41C5_A95FF1B7FF6D",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_12_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_80EFA96C_A6F5_A499_41D6_BA2E77535428",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_14_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_8EE9E612_A6CD_EC8E_41D3_E39485DFE053",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_1F3A89CE_1349_DC40_4197_496928E9DA69_0_HS_16_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_A00525FA_B718_CF4C_41D5_DA0CBDBD21AF",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0_HS_2_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_80E1C96B_A6F5_A49F_41CC_92E89B62D266",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D06EBD_1348_74C3_41AE_5ACF451956E7_0_HS_3_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_80E1896B_A6F5_A49F_419E_CADE79741898",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_13_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_80ED896D_A6F5_A49B_41A0_F2D472E9818D",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_14_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_80EC396D_A6F5_A49B_41D8_D036956A7B2C",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D5F0D5_1349_CC43_414C_531D97C056B0_0_HS_15_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_80ECD96D_A6F5_A49B_41E1_725D74AFC74C",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_0_0.png",
                    "width": 800,
                    "class": "ImageResourceLevel",
                    "height": 1200
                }
            ],
            "id": "AnimatedImageResource_B9C65B92_A5BB_BAED_41D5_588C62A32F96",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_6_0.png",
                    "width": 460,
                    "class": "ImageResourceLevel",
                    "height": 690
                }
            ],
            "id": "AnimatedImageResource_80E8796E_A6F5_A496_41E0_1107B6D5DC8B",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D01CC6_1348_3440_41A2_BD2321889440_0_HS_11_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_8097496F_A6F5_A496_41A4_56EACB79B6ED",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0_HS_3_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_80E1596A_A6F5_A49E_41A3_DD67463CDD61",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D0788B_1348_5CC7_4191_217370E98EAE_0_HS_4_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_80E1196B_A6F5_A49F_41B6_79C09971D0D0",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0_HS_2_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_8097E96F_A6F5_A496_41C8_2FFB4159A707",
            "rowCount": 6
        },
        {
            "colCount": 4,
            "frameCount": 24,
            "class": "AnimatedImageResource",
            "frameDuration": 41,
            "levels": [
                {
                    "url": "media/panorama_18D002C8_1348_4C40_418B_91BB3F0E51DA_0_HS_3_0.png",
                    "width": 400,
                    "class": "ImageResourceLevel",
                    "height": 360
                }
            ],
            "id": "AnimatedImageResource_8097996F_A6F5_A496_41D8_DFF9A13E8728",
            "rowCount": 6
        },
        {
            "toolTipBorderSize": 1,
            "horizontalAlign": "center",
            "toolTipPaddingLeft": 6,
            "maxWidth": 60,
            "id": "IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8",
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "maxHeight": 60,
            "toolTipPaddingTop": 4,
            "toolTipShadowOpacity": 1,
            "width": 60,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipFontStyle": "normal",
            "minHeight": 1,
            "toolTipFontFamily": "Arial",
            "propagateClick": true,
            "toolTipTextShadowOpacity": 0,
            "verticalAlign": "middle",
            "toolTip": "Pilihan",
            "paddingRight": 0,
            "height": 60,
            "toolTipBorderColor": "#767676",
            "minWidth": 1,
            "mode": "toggle",
            "toolTipShadowHorizontalLength": 0,
            "toolTipShadowSpread": 0,
            "toolTipShadowBlurRadius": 3,
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "toolTipFontColor": "#606060",
            "toolTipShadowVerticalLength": 0,
            "paddingTop": 0,
            "pressedIconURL": "skin/IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8_pressed.png",
            "toolTipPaddingBottom": 4,
            "paddingBottom": 0,
            "click": "if(!this.Container_B1573269_BF46_B846_41AD_E3E55F50C328.get('visible')){ this.setComponentVisibility(this.Container_B1573269_BF46_B846_41AD_E3E55F50C328, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_B1573269_BF46_B846_41AD_E3E55F50C328, false, 0, null, null, false) }",
            "toolTipFontSize": "1.65vmin",
            "borderSize": 0,
            "toolTipTextShadowBlurRadius": 3,
            "paddingLeft": 0,
            "toolTipShadowColor": "#333333",
            "iconURL": "skin/IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8.png",
            "transparencyActive": true,
            "shadow": false,
            "toolTipFontWeight": "normal",
            "data": {
                "name": "image button menu"
            },
            "class": "IconButton",
            "pressedRollOverIconURL": "skin/IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8_pressed_rollover.png",
            "cursor": "hand",
            "toolTipPaddingRight": 6
        },
        {
            "toolTipBorderSize": 1,
            "horizontalAlign": "center",
            "toolTipPaddingLeft": 6,
            "toolTipPaddingTop": 4,
            "id": "IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0",
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "width": 45.5,
            "toolTipShadowOpacity": 1,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipFontStyle": "normal",
            "rollOverIconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0_rollover.png",
            "minHeight": 0,
            "toolTipFontFamily": "Arial",
            "propagateClick": false,
            "toolTipTextShadowOpacity": 0,
            "verticalAlign": "middle",
            "toolTip": "Ruangan",
            "paddingRight": 0,
            "height": 51.5,
            "toolTipBorderColor": "#767676",
            "minWidth": 0,
            "mode": "toggle",
            "toolTipShadowHorizontalLength": 0,
            "toolTipFontColor": "#606060",
            "toolTipShadowBlurRadius": 3,
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "toolTipShadowSpread": 0,
            "toolTipShadowVerticalLength": 0,
            "paddingTop": 0,
            "pressedIconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0_pressed.png",
            "toolTipPaddingBottom": 4,
            "paddingBottom": 0,
            "toolTipFontSize": "1.65vmin",
            "borderSize": 0,
            "toolTipTextShadowBlurRadius": 3,
            "paddingLeft": 0,
            "toolTipShadowColor": "#333333",
            "iconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0.png",
            "transparencyActive": true,
            "shadow": false,
            "toolTipFontWeight": "normal",
            "data": {
                "name": "Button1170"
            },
            "class": "IconButton",
            "pressedRollOverIconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0_pressed_rollover.png",
            "click": "document.getElementById('roomModal').style.display='flex'",
            "cursor": "hand",
            "toolTipPaddingRight": 6
        },
        {
            "toolTipBorderSize": 1,
            "horizontalAlign": "center",
            "toolTipPaddingLeft": 6,
            "toolTipPaddingTop": 4,
            "id": "IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6",
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "width": 44,
            "toolTipShadowOpacity": 1,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipFontStyle": "normal",
            "rollOverIconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6_rollover.png",
            "minHeight": 0,
            "toolTipFontFamily": "Arial",
            "propagateClick": true,
            "toolTipTextShadowOpacity": 0,
            "verticalAlign": "middle",
            "toolTip": "Panduan",
            "paddingRight": 0,
            "height": 50,
            "toolTipBorderColor": "#767676",
            "minWidth": 0,
            "mode": "push",
            "toolTipShadowHorizontalLength": 0,
            "toolTipFontColor": "#606060",
            "toolTipShadowBlurRadius": 3,
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "toolTipShadowVerticalLength": 0,
            "paddingTop": 0,
            "pressedIconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6_pressed.png",
            "toolTipPaddingBottom": 4,
            "paddingBottom": 0,
            "click": "this.showPopupImage(this.ImageResource_B82CF0F6_B7CE_7B72_41C3_BE96B87E9996, null, '90%', '90%', this.FadeInEffect_B82CE0F6_B7CE_7B72_41E1_9C33A3BDCF22, this.FadeOutEffect_B82C90F6_B7CE_7B72_41DA_95FFDBE41BD6, {'pressedBackgroundOpacity':0.3,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconColor':'#888888','rollOverBorderSize':0,'backgroundOpacity':0.3,'iconWidth':20,'borderSize':0,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'iconHeight':20,'paddingBottom':5,'pressedBorderColor':'#000000','rollOverBackgroundColorDirection':'vertical','backgroundColorDirection':'vertical','iconColor':'#000000','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'paddingLeft':5,'pressedIconLineWidth':5,'pressedBorderSize':0,'rollOverBorderColor':'#000000','iconLineWidth':5,'rollOverBackgroundOpacity':0.3,'backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconHeight':20,'rollOverIconColor':'#666666','rollOverIconWidth':20,'pressedBackgroundColorDirection':'vertical','pressedIconWidth':20,'pressedIconHeight':20,'paddingRight':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverIconLineWidth':5,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderColor':'#000000'}, null, null, false)",
            "toolTipShadowSpread": 0,
            "toolTipFontSize": "1.65vmin",
            "borderSize": 0,
            "toolTipTextShadowBlurRadius": 3,
            "paddingLeft": 0,
            "toolTipShadowColor": "#333333",
            "iconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6.png",
            "transparencyActive": false,
            "shadow": false,
            "toolTipFontWeight": "normal",
            "data": {
                "name": "Information"
            },
            "class": "IconButton",
            "pressedRollOverIconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6_pressed_rollover.png",
            "cursor": "hand",
            "toolTipPaddingRight": 6
        }],
        "backgroundPreloadEnabled": true,
        "paddingTop": 0,
        "paddingBottom": 0,
        "borderSize": 0,
        "paddingLeft": 0,
        "contentOpaque": false,
        "scripts": {
            "playAudioList": function (audios) { if (audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function () { if (++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
            "triggerOverlay": function (overlay, eventName) { if (overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for (var i = 0; i < areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
            "pauseGlobalAudios": function (caller, exclude) { if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i < count; ++i) { var objAudios = values[i]; for (var j = 0; j < objAudios.length; ++j) { var a = objAudios[j]; if (audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
            "setEndToItemIndex": function (playList, fromIndex, toIndex) { var endFunction = function () { if (playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
            "changePlayListWithSameSpot": function (playList, newIndex) { var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
            "setMainMediaByIndex": function (index) { var item = undefined; if (index >= 0 && index < this.mainPlayList.get('items').length) { this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
            "getCurrentPlayerWithMedia": function (media) { var playerClass = undefined; var mediaPropertyName = undefined; switch (media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if (playerClass != undefined) { var players = this.getByClassName(playerClass); for (var i = 0; i < players.length; ++i) { var player = players[i]; if (player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
            "updateMediaLabelFromPlayList": function (playList, htmlText, playListItemStopToDispose) { var changeFunction = function () { var index = playList.get('selectedIndex'); if (index >= 0) { var beginFunction = function () { playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function (index) { var media = playListItem.get('media'); var text = media.get('data'); if (!text) text = media.get('label'); setHtml(text); }; var setHtml = function (text) { if (text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if (htmlText.get('html')) { setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else { setMediaLabel(index); } } }; var disposeFunction = function () { htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if (playListItemStopToDispose) { playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
            "setComponentVisibility": function (component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout) { var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if (keepVisibility) return; this.unregisterKey('visibility_' + component.get('id')); var changeVisibility = function () { if (effect && propertyEffect) { component.set(propertyEffect, effect); } component.set('visible', visible); if (component.get('class') == 'ViewerArea') { try { if (visible) component.restart(); else if (component.get('playbackState') == 'playing') component.pause(); } catch (e) { }; } }; var effectTimeoutName = 'effectTimeout_' + component.get('id'); if (!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)) { var effectTimeout = window[effectTimeoutName]; if (effectTimeout instanceof Array) { for (var i = 0; i < effectTimeout.length; i++) { clearTimeout(effectTimeout[i]) } } else { clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if (visible == component.get('visible') && !ignoreClearTimeout) return; if (applyAt && applyAt > 0) { var effectTimeout = setTimeout(function () { if (window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if (arrayTimeoutVal.length == 0) { delete window[effectTimeoutName]; } } else { delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if (window.hasOwnProperty(effectTimeoutName)) { window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; } else { window[effectTimeoutName] = effectTimeout; } } else { changeVisibility(); } },
            "registerKey": function (key, value) { window[key] = value; },
            "getPlayListItemByMedia": function (playList, media) { var items = playList.get('items'); for (var j = 0, countJ = items.length; j < countJ; ++j) { var item = items[j]; if (item.get('media') == media) return item; } return undefined; },
            "getPlayListItems": function (media, player) { var itemClass = (function () { switch (media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length - 1; i >= 0; --i) { var item = items[i]; if (item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
            "setOverlayBehaviour": function (overlay, media, action) { var executeFunc = function () { switch (action) { case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if (overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if (window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function () { delete window.overlaysDispatched[id]; }, 2000); }; if (window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if (playList != undefined) { var item = this.getPlayListItemByMedia(playList, media); if (playList.get('items').indexOf(item) != playList.get('selectedIndex')) { var beginFunc = function (e) { item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
            "setMapLocation": function (panoramaPlayListItem, mapPlayer) { var resetFunction = function () { panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
            "pauseGlobalAudio": function (audio) { var audios = window.currentGlobalAudios; if (audios) { audio = audios[audio.get('id')]; } if (audio.get('state') == 'playing') audio.pause(); },
            "showPopupPanoramaVideoOverlay": function (popupPanoramaOverlay, closeButtonProperties, stopAudios) { var self = this; var showEndFunction = function () { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function () { if (!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function () { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if (stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function () { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if (closeButtonProperties) { for (var key in closeButtonProperties) { closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if (stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
            "setStartTimeVideoSync": function (video, player) { this.setStartTimeVideo(video, player.get('currentTime')); },
            "startPanoramaWithCamera": function (media, camera) { if (window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1) { return; } var playLists = this.getByClassName('PlayList'); if (playLists.length == 0) return; var restoreItems = []; for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; var items = playList.get('items'); for (var j = 0, countJ = items.length; j < countJ; ++j) { var item = items[j]; if (item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')) { restoreItems.push({ camera: item.get('camera'), item: item }); item.set('camera', camera); } } } if (restoreItems.length > 0) { if (window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function () { var index = window.currentPanoramasWithCameraChanged.indexOf(media); if (index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
            "showPopupImage": function (image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback) { var self = this; var closed = false; var playerClickFunction = function () { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function () { zoomImage.unbind('click', clearAutoClose, this); if (timeoutID != undefined) { clearTimeout(timeoutID); } }; var resizeFunction = function () { setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function () { self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function () { timeoutID = undefined; if (autoCloseMilliSeconds) { var autoCloseFunction = function () { hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if (toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if (loadedCallback) loadedCallback(); }; var hideFunction = function () { self.MainViewer.set('toolTipEnabled', true); closed = true; if (timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if (autoCloseMilliSeconds) clearAutoClose(); if (hideCallback) hideCallback(); zoomImage.set('visible', false); if (hideEffect && hideEffect.get('duration') > 0) { hideEffect.bind('end', endEffectFunction, this); } else { zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if (toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function () { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function () { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function () { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function () { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if (right < 10) right = 10; if (top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function () { if (timeoutUserInteractionID) { clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else { closeButton.set('visible', false); } }; var userInteractionEndFunction = function () { if (!closed) { timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function () { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if (closeButtonProperties) { for (var key in closeButtonProperties) { closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function () { self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
            "isCardboardViewMode": function () { var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
            "syncPlaylists": function (playLists) { var changeToMedia = function (media, playListDispatched) { for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; if (playList != playListDispatched) { var items = playList.get('items'); for (var j = 0, countJ = items.length; j < countJ; ++j) { if (items[j].get('media') == media) { if (playList.get('selectedIndex') != j) { playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function (event) { var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if (selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function (event) { var panoramaMapLocation = event.source.get('panoramaMapLocation'); if (panoramaMapLocation) { var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for (var i = 0, count = playLists.length; i < count; ++i) { playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for (var i = 0, count = mapPlayers.length; i < count; ++i) { mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
            "getPixels": function (value) { var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch (unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
            "getKey": function (key) { return window[key]; },
            "executeFunctionWhenChange": function (playList, index, endFunction, changeFunction) { var endObject = undefined; var changePlayListFunction = function (event) { if (event.data.previousSelectedIndex == index) { if (changeFunction) changeFunction.call(this); if (endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if (endFunction) { var playListItem = playList.get('items')[index]; if (playListItem.get('class') == 'PanoramaPlayListItem') { var camera = playListItem.get('camera'); if (camera != undefined) endObject = camera.get('initialSequence'); if (endObject == undefined) endObject = camera.get('idleSequence'); } else { endObject = playListItem.get('media'); } if (endObject) { endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
            "showComponentsWhileMouseOver": function (parentComponent, components, durationVisibleWhileOut) { var setVisibility = function (visible) { for (var i = 0, length = components.length; i < length; i++) { var component = components[i]; if (component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true) { setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function () { setVisibility(true); if (timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function () { var timeoutFunction = function () { setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
            "init": function () { if (!Object.hasOwnProperty('values')) { Object.values = function (o) { return Object.keys(o).map(function (e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function (e) { var playList = e.source; var index = playList.get('selectedIndex'); if (index < 0) return; var id = playList.get('id'); if (!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
            "existsKey": function (key) { return key in window; },
            "historyGoBack": function (playList) { var history = this.get('data')['history'][playList.get('id')]; if (history != undefined) { history.back(); } },
            "initGA": function () { var sendFunc = function (category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for (var i = 0, countI = media.length; i < countI; ++i) { var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for (var j = 0, countJ = overlays.length; j < countJ; ++j) { var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch (overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z < areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for (var i = 0, countI = components.length; i < countI; ++i) { var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for (var i = 0, countI = items.length; i < countI; ++i) { var item = items[i]; var media = item.get('media'); if (!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
            "stopAndGoCamera": function (camera, ms) { var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function () { sequence.play(); }; setTimeout(timeoutFunction, ms); },
            "getActivePlayerWithViewer": function (viewerArea) { var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while (i-- > 0) { var player = players[i]; if (player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if (playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if ((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if (playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if (playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
            "getComponentByName": function (name) { var list = this.getByClassName('UIComponent'); for (var i = 0, count = list.length; i < count; ++i) { var component = list[i]; var data = component.get('data'); if (data != undefined && data.name == name) { return component; } } return undefined; },
            "getMediaWidth": function (media) { switch (media.get('class')) { case 'Video360': var res = media.get('video'); if (res instanceof Array) { var maxW = 0; for (var i = 0; i < res.length; i++) { var r = res[i]; if (r.get('width') > maxW) maxW = r.get('width'); } return maxW; } else { return r.get('width') } default: return media.get('width'); } },
            "changeBackgroundWhilePlay": function (playList, index, color) { var stopFunction = function (event) { playListItem.unbind('stop', stopFunction, this); if ((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))) { viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if ((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)) { viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
            "getPlayListWithMedia": function (media, onlySelected) { var playLists = this.getByClassName('PlayList'); for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; if (onlySelected && playList.get('selectedIndex') == -1) continue; if (this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
            "getCurrentPlayers": function () { var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
            "pauseCurrentPlayers": function (onlyPauseCameraIfPanorama) { var players = this.getCurrentPlayers(); var i = players.length; while (i-- > 0) { var player = players[i]; if (player.get('state') == 'playing') { if (onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined') { player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
            "getPanoramaOverlayByName": function (panorama, name) { var overlays = this.getOverlays(panorama); for (var i = 0, count = overlays.length; i < count; ++i) { var overlay = overlays[i]; var data = overlay.get('data'); if (data != undefined && data.label == name) { return overlay; } } return undefined; },
            "showPopupMedia": function (w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios) { var self = this; var closeFunction = function () { playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if (stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if (isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function () { w.hide(); }; var resizeFunction = function () { var getWinValue = function (property) { return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if (!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if (parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if (windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if (windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if (autoCloseWhenFinished) { this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if (isVideo) { this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if (stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
            "playGlobalAudioWhilePlay": function (playList, index, audio, endCallback) { var changeFunction = function (event) { if (event.data.previousSelectedIndex == index) { this.stopGlobalAudio(audio); if (isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if (endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if (audios && audio.get('id') in audios) { audio = audios[audio.get('id')]; if (audio.get('state') != 'playing') { audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if (isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if (audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for (var i = 0; i < stateChangeFunctions.length; ++i) { var f = stateChangeFunctions[i]; if (typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
            "showPopupPanoramaOverlay": function (popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio) { var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if (!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function () { var loadedFunction = function () { if (!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function () { var restoreShowDurationFunction = function () { popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if (popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if (!imageHD) { imageHD = popupPanoramaOverlay.get('image'); } if (!toggleImageHD && toggleImage) { toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function () { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
            "shareTwitter": function (url) { window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
            "setMediaBehaviour": function (playList, index, mediaDispatcher) { var self = this; var stateChangeFunction = function (event) { if (event.data.state == 'stopped') { dispose.call(this, true); } }; var onBeginFunction = function () { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if (media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)) { player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function () { var index = playListDispatcher.get('selectedIndex'); if (index != -1) { indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function () { dispose.call(this, false); }; var dispose = function (forceDispose) { if (!playListDispatcher) return; var media = item.get('media'); if ((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if (panoramaSequence && panoramaSequenceIndex != -1) { if (panoramaSequence) { if (panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex - 1].get('class') == 'TargetPanoramaCameraMovement') { var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex - 1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function (event) { initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if (player) { item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for (var i = 0; i < buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if (sameViewerArea) { var currentMedia = this.getMediaFromPlayer(player); if (currentMedia == undefined || currentMedia == item.get('media')) { playListDispatcher.set('selectedIndex', indexDispatcher); } if (playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else { viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if (!mediaDispatcher) { var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if (currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if (!playListDispatcher) { playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if (playList.get('selectedIndex') == index || indexDispatcher == -1) { return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if (sameViewerArea) { if (playList != playListDispatcher) { playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else { viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if (camera) { panoramaSequence = camera.get('initialSequence'); if (panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function (property) { var value = player.get(property); if (value == undefined) return; if (Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for (var i = 0; i < buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if (player != itemDispatcher.get('player') || !mediaDispatcherByParam) { item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
            "playGlobalAudio": function (audio, endCallback) { var endFunction = function () { audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if (endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if (!audios) { audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if (audio.get('state') == 'playing') { return audio; } if (!audio.get('loop')) { audio.bind('end', endFunction, this); } audio.play(); return audio; },
            "loopAlbum": function (playList, index) { var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function () { player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
            "shareFacebook": function (url) { window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
            "setCameraSameSpotAsMedia": function (camera, media) { var player = this.getCurrentPlayerWithMedia(media); if (player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
            "pauseGlobalAudiosWhilePlayItem": function (playList, index, exclude) { var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function () { if (playList.get('selectedIndex') != index) { if (hasState) { player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function (event) { var state = event.data.state; if (state == 'stopped') { this.resumeGlobalAudios(caller); } else if (state == 'playing') { this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if (hasState) { player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
            "setPanoramaCameraWithCurrentSpot": function (playListItem) { var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if (currentPlayer == undefined) { return; } var playerClass = currentPlayer.get('class'); if (playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player') { return; } var fromMedia = currentPlayer.get('panorama'); if (fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
            "cloneCamera": function (camera) { var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
            "keepComponentVisibility": function (component, keep) { var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if (value == undefined && keep) { this.registerKey(key, keep); } else if (value != undefined && !keep) { this.unregisterKey(key); } },
            "historyGoForward": function (playList) { var history = this.get('data')['history'][playList.get('id')]; if (history != undefined) { history.forward(); } },
            "getMediaByName": function (name) { var list = this.getByClassName('Media'); for (var i = 0, count = list.length; i < count; ++i) { var media = list[i]; if ((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name) { return media; } } return undefined; },
            "unregisterKey": function (key) { delete window[key]; },
            "autotriggerAtStart": function (playList, callback, once) { var onChange = function (event) { callback(); if (once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
            "setPanoramaCameraWithSpot": function (playListItem, yaw, pitch) { var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
            "setMainMediaByName": function (name) { var items = this.mainPlayList.get('items'); for (var i = 0; i < items.length; ++i) { var item = items[i]; if (item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
            "resumeGlobalAudios": function (caller) { if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i < count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length - 1; j >= 0; --j) { var a = audiosPaused[j]; if (objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i < count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
            "getGlobalAudio": function (audio) { var audios = window.currentGlobalAudios; if (audios != undefined && audio.get('id') in audios) { audio = audios[audio.get('id')]; } return audio; },
            "fixTogglePlayPauseButton": function (player) { var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if (typeof buttons !== 'undefined' && player.get('state') == 'playing') { if (!Array.isArray(buttons)) buttons = [buttons]; for (var i = 0; i < buttons.length; ++i) buttons[i].set('pressed', true); } },
            "setStartTimeVideo": function (video, time) { var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function () { for (var i = 0; i < items.length; ++i) { var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for (var i = 0; i < items.length; ++i) { var item = items[i]; var player = item.get('player'); if (player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
            "visibleComponentsIfPlayerFlagEnabled": function (components, playerFlag) { var enabled = this.get(playerFlag); for (var i in components) { components[i].set('visible', enabled); } },
            "shareWhatsapp": function (url) { window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
            "getMediaFromPlayer": function (player) { switch (player.get('class')) { case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
            "getOverlays": function (media) { switch (media.get('class')) { case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for (var j = 0; j < frames.length; ++j) { overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
            "stopGlobalAudio": function (audio) { var audios = window.currentGlobalAudios; if (audios) { audio = audios[audio.get('id')]; if (audio) { delete audios[audio.get('id')]; if (Object.keys(audios).length == 0) { window.currentGlobalAudios = undefined; } } } if (audio) audio.stop(); },
            "loadFromCurrentMediaPlayList": function (playList, delta) { var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while (newIndex < 0) { newIndex = totalItems + newIndex; }; if (currentIndex != newIndex) { playList.set('selectedIndex', newIndex); } },
            "resumePlayers": function (players, onlyResumeCameraIfPanorama) { for (var i = 0; i < players.length; ++i) { var player = players[i]; if (onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined') { player.resumeCamera(); } else { player.play(); } } },
            "getMediaHeight": function (media) { switch (media.get('class')) { case 'Video360': var res = media.get('video'); if (res instanceof Array) { var maxH = 0; for (var i = 0; i < res.length; i++) { var r = res[i]; if (r.get('height') > maxH) maxH = r.get('height'); } return maxH; } else { return r.get('height') } default: return media.get('height'); } },
            "showWindow": function (w, autoCloseMilliSeconds, containsAudio) { if (w.get('visible') == true) { return; } var closeFunction = function () { clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function () { w.unbind('click', clearAutoClose, this); if (timeoutID != undefined) { clearTimeout(timeoutID); } }; var timeoutID = undefined; if (autoCloseMilliSeconds) { var autoCloseFunction = function () { w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
            "updateVideoCues": function (playList, index) { var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if (video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function () { if (playList.get('selectedIndex') != index) { video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function (event) { var activeCues = event.data.activeCues; for (var i = 0, count = cues.length; i < count; ++i) { var cue = cues[i]; if (activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime') + 0.5)) { cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
            "openLink": function (url, name) { if (url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if (extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if (isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } }
        },
        "buttonToggleFullscreen": "this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081",
        "scrollBarColor": "#000000",
        "data": {
            "name": "Player1268"
        },
        "mouseWheelEnabled": true,
        "shadow": false,
        "class": "Player",
        "downloadEnabled": false,
        "defaultVRPointer": "laser",
        "gap": 10
    };


    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function (index) {
        if (this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function () {
        if (!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function () {
        if (!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function () {
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function () {
        return this.pointer >= 0 && this.pointer < this.list.length - 1;
    };
    //

    if (script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
