System.register("chunks:///_virtual/BackpackDemo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './VList.ts', './Res.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Label, Sprite, SpriteFrame, Canvas, NodeEventType, UITransform, v3, lerp, Component, VList, VListEvent, Res;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      Canvas = module.Canvas;
      NodeEventType = module.NodeEventType;
      UITransform = module.UITransform;
      v3 = module.v3;
      lerp = module.lerp;
      Component = module.Component;
    }, function (module) {
      VList = module.VList;
      VListEvent = module.VListEvent;
    }, function (module) {
      Res = module.Res;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;
      cclegacy._RF.push({}, "c3c12kuoC5KxpsAie45cHFl", "BackpackDemo", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var minCol = 1;
      var maxCol = 6;
      var minRow = 1;
      var maxRow = 6;
      var BackpackDemo = exports('BackpackDemo', (_dec = ccclass('BackpackDemo'), _dec2 = property(Node), _dec3 = property(VList), _dec4 = property(Label), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Sprite), _dec8 = property(Sprite), _dec9 = property(VList), _dec10 = property(SpriteFrame), _dec11 = property(Node), _dec12 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BackpackDemo, _Component);
        function BackpackDemo() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "tabs", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "backpackPages", _descriptor2, _assertThisInitialized(_this));
          //data:IBackpackItemData
          _initializerDefineProperty(_this, "pageLbl", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "leftPageBtn", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rightPageBtn", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "addSlotBtn", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "subSlotBtn", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "buffList", _descriptor8, _assertThisInitialized(_this));
          //data:IBuffData
          _initializerDefineProperty(_this, "buffFrames", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "detailPanel", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "movingSlot", _descriptor11, _assertThisInitialized(_this));
          _this.selectTabIdx = -1;
          _this.selectSlotIdx = -1;
          _this.col = 4;
          _this.row = 4;
          _this.allSlotCnt = 48;
          _this.inventory = {
            //装备的 slotIdx:Item  映射
            equipmentIdxMap: new Map(),
            //道具的 slotIdx:Item  映射
            propIdxMap: new Map()
          };
          _this.movingItem = null;
          _this.previewGridIdx = void 0;
          return _this;
        }
        var _proto = BackpackDemo.prototype;
        _proto.start = function start() {
          var _this2 = this;
          var canvas = this.node.parent.parent.getComponent(Canvas);
          canvas.node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
          // input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
          var inventoryList = [{
            itemId: 2,
            isEquip: false,
            slotIdx: 2,
            num: 1
          }, {
            itemId: 3,
            isEquip: false,
            slotIdx: 4,
            num: 1
          }, {
            itemId: 5,
            isEquip: false,
            slotIdx: 1,
            num: 1
          }, {
            itemId: 2,
            isEquip: true,
            slotIdx: 8,
            num: 1
          }, {
            itemId: 7,
            isEquip: false,
            slotIdx: 2,
            num: 3
          }, {
            itemId: 9,
            isEquip: false,
            slotIdx: 5,
            num: 2
          }, {
            itemId: 10,
            isEquip: false,
            slotIdx: 3,
            num: 3
          }];
          this.inventory.equipmentIdxMap.clear();
          this.inventory.propIdxMap.clear();
          inventoryList.forEach(function (e) {
            var cfg = _this2.dataMap.get(e.itemId);
            if (cfg.isProp) _this2.inventory.propIdxMap.set(e.slotIdx, e);else _this2.inventory.equipmentIdxMap.set(e.slotIdx, e);
          });
          this.tabs.forEach(function (e, i) {
            e.on(NodeEventType.TOUCH_END, function () {
              _this2.switchTab(i);
            }, _this2);
          });
          this.initBackpackPage(this.backpackPages);
          this.buffList.init({
            onData: function onData(info) {
              var buffData = info.data;
              var buffFrame = _this2.buffFrames[buffData.buffIdx];
              info.get("_icon", Sprite).spriteFrame = buffFrame;
              info.get("_time", Label).string = buffData.time.toFixed() + "s";
            },
            onUpdate: function onUpdate(info, dt) {
              var buffData = info.data;
              buffData.time -= dt;
              info.get("_time", Label).string = buffData.time.toFixed() + "s";
              if (buffData.time <= 0) {
                _this2.buffList.deleteIdx(info.idx);
              }
            }
          });
          this.backpackPages.node.on(VListEvent.OnTurnPage, this.onRefreshIndicator, this);
          this.leftPageBtn.on(NodeEventType.TOUCH_END, this.onTurnLeft, this);
          this.rightPageBtn.on(NodeEventType.TOUCH_END, this.onTurnRight, this);
          this.switchTab(0);
          this.refreshBackpack();
          this.refreshDetailPanel();
        }

        //slotIdx和所在page的gridIdx相互转换
        ;

        _proto.slot2gridIdx = function slot2gridIdx(slotIdx) {
          return slotIdx % this.gridCnt;
        };
        _proto.grid2slotIdx = function grid2slotIdx(gridIdx) {
          return gridIdx + this.pageIdx * this.gridCnt;
        };
        _proto.slot2pageIdx = function slot2pageIdx(slotIdx) {
          return Math.floor(slotIdx / this.gridCnt);
        };
        _proto.gridIdx2slotIdx = function gridIdx2slotIdx(gridIdx) {
          return gridIdx + this.pageIdx * this.gridCnt;
        };
        _proto.initBackpackPage = function initBackpackPage(page) {
          var _this3 = this;
          page.node.on(NodeEventType.TOUCH_START, this.onCancelAll, this);
          page.init({
            //onData，onShow，onHide，onInstantiate等方法都将保证在有node节点时调用
            onInstantiate: function onInstantiate(info) {
              var gridList = info.node.getComponent(VList);
              _this3.initSlotGrid(gridList);
            },
            //这里由于可以直接通过info的索引来获取当前页面包含哪些slot，所以单个页面不用传入数据，直接使用闭包的数据（即BackpackDemo本身）进行计算
            onData: function onData(info) {
              var gridList = info.node.getComponent(VList);
              gridList.col = _this3.col;
              gridList.row = _this3.row;
              var pageIdx = info.idx;
              var gridCnt = _this3.gridCnt;
              var maxGridIdx = Math.min(pageIdx * gridCnt + gridCnt - 1, _this3.allSlotCnt - 1);
              var gridDatas = [];
              var slotMap = _this3.selectTabIdx == 0 ? _this3.inventory.equipmentIdxMap : _this3.inventory.propIdxMap;
              for (var slotIdx = pageIdx * gridCnt; slotIdx <= maxGridIdx; slotIdx++) {
                gridDatas.push(slotMap.get(slotIdx) || null);
              }
              gridList.setData(gridDatas);
            }
          });
        };
        _proto.initSlotGrid = function initSlotGrid(gridList) {
          var _this4 = this;
          //register方法用于给节点注册事件，第一个参数为子节点key，即info.get中使用的key，如果传""则为列表项本身
          //请保证同一个节点不要重复注册同一种事件，否则将不利于管理，组件内部对此不做检查
          gridList.register("", NodeEventType.MOUSE_ENTER, this.onMouseEnter, this);
          gridList.register("", NodeEventType.MOUSE_LEAVE, this.onMouseExit, this);
          gridList.init({
            onData: function onData(info) {
              //这里也可以通过挂载防分层节点VListLayerCom来利用树状结构的统一控制
              var flag = !!info.data;
              info.getNode("_icon").active = flag;
              info.getNode("_tag").active = flag;
              info.getNode("_equiped").active = flag;
              info.getNode("_banBg").active = flag;
              info.getNode("_numLbl").active = flag;
              info.getNode("_select").active = flag && info.data.slotIdx == _this4.selectSlotIdx;
              if (flag) {
                var itemData = _this4.dataMap.get(info.data.itemId);
                info.get("_icon", Sprite).spriteFrame = itemData.isProp ? Res.Ins.propFrames[itemData.spriteFrameIdx] : Res.Ins.equipmentFrames[itemData.spriteFrameIdx];
                info.get("_tag", Sprite).spriteFrame = Res.Ins.qualityTags[itemData.quality - 1];
                info.getNode("_equiped").active = info.data.isEquip;
                info.getNode("_banBg").active = !itemData.canOperate;
                info.getNode("_numLbl").active = itemData.isProp;
                if (itemData.isProp) {
                  info.get("_numLbl", Label).string = "x" + info.data.num.toFixed();
                }
              }
            },
            //onClick回调等同于gridList.register("", NodeEventType.TOUCH_END, this.onClick, this);
            onClick: this.onClickSlot.bind(this)
          });
        };
        _proto.onMouseEnter = function onMouseEnter(info) {
          this.previewGridIdx = info.idx;
        };
        _proto.onMouseExit = function onMouseExit(info) {
          if (this.previewGridIdx == info.idx) this.previewGridIdx = -1;
        };
        _proto.onSelectInfo = function onSelectInfo(info) {
          this.selectSlotIdx = info.idx + this.pageIdx * this.gridCnt;
          //这里要刷新指定数据有三种方法

          //通过execute传lambda方法（这里不推荐直接操作info.node，因为在scrollList模式下虚拟列表中可能没有展示此节点，而通过execute方法刷新则会避免相关错误）
          // info.list.execute(info.idx, (info2: IVListItemInfo<IBackpackItemData>) => {
          //     info2.getNode("_select").active = true;
          // }, true);

          //通过execute传lambda方法，不过不定义形参，直接用所在方法onSelectInfo方法的info参数
          // info.list.execute(info.idx, () => {
          //     info.getNode("_select").active = true;
          // }, true);

          //【推荐】使用refreshItem刷新指定idx的展示，本质是在该条目显示时立即调用onData方法
          info.list.refreshItem(info.idx);
        };
        _proto.onCancelSelect = function onCancelSelect(info) {
          if (this.selectSlotIdx == this.gridIdx2slotIdx(info.idx)) {
            this.selectSlotIdx = -1;
            this.refreshDetailPanel();
          }
          info.list.refreshItem(info.idx);
        };
        _proto.onCancelSelectCurrent = function onCancelSelectCurrent() {
          var _this5 = this;
          if (this.selectSlotIdx < 0) return;
          var pageIdx = this.slot2pageIdx(this.selectSlotIdx);
          var gridIdx = this.slot2gridIdx(this.selectSlotIdx);
          //execute方法会保证操作方法在node生成后执行，如果node不存在，将不会执行方法
          //如果需要保持此时想要对node的更改，可以在execute方法第三个参数传入false，方法将延迟到node生成时执行
          this.backpackPages.infos[pageIdx].call(function (info) {
            var gridInfo = info.node.getComponent(VList).infos[gridIdx];
            _this5.onCancelSelect(gridInfo);
          });
          this.selectSlotIdx = -1;
        };
        _proto.switchTab = function switchTab(idx) {
          if (this.selectTabIdx == idx) return;
          if (this.movingItem) {
            this.onCancelMove();
            return;
          }
          this.onCancelSelectCurrent();
          this.selectTabIdx = idx;
          this.tabs.forEach(function (e, i) {
            e.getChildByName("selectedTab").active = i == idx;
            e.getChildByName("unselectedTab").active = i != idx;
          });
          this.refreshBackpack();
          this.onRefreshIndicator();
        };
        _proto.setSlotData = function setSlotData(slot, data) {
          var cfg = this.dataMap.get(data.itemId);
          slot.getChildByName("_icon").getComponent(Sprite).spriteFrame = cfg.isProp ? Res.Ins.propFrames[cfg.spriteFrameIdx] : Res.Ins.equipmentFrames[cfg.spriteFrameIdx];
          slot.getChildByName("_tag").getComponent(Sprite).spriteFrame = Res.Ins.qualityTags[cfg.quality - 1];
          slot.getChildByName("_equiped").active = data.isEquip;
          slot.getChildByName("_banBg").active = false;
          var numLbl = slot.getChildByName("_numLbl").getComponent(Label);
          numLbl.node.active = cfg.isProp;
          if (cfg.isProp) {
            numLbl.string = "x" + data.num.toFixed();
          }
          slot.getChildByName("_select").active = false;
        };
        _proto.refreshDetailPanel = function refreshDetailPanel() {
          var _this6 = this;
          var root = this.detailPanel.getChildByName("root");
          var emptyTips = this.detailPanel.getChildByName("emptyTips");
          var emptyFlag = this.selectSlotIdx < 0;
          root.active = !emptyFlag;
          emptyTips.active = emptyFlag;
          if (!emptyFlag) {
            var pageIdx = this.slot2pageIdx(this.selectSlotIdx);
            var gridIdx = this.slot2gridIdx(this.selectSlotIdx);
            this.backpackPages.infos[pageIdx].call(function (info) {
              var data = info.node.getComponent(VList).infos[gridIdx].data;
              var cfg = _this6.dataMap.get(data.itemId);
              var slot = root.getChildByName("slot");
              _this6.setSlotData(slot, data);
              root.getChildByName("nameLbl").getComponent(Label).string = cfg.name;
              root.getChildByName("descLbl").getComponent(Label).string = cfg.desc;
              root.getChildByName("effectBtn").getComponent(Sprite).grayscale = !cfg.canOperate;
              var lbl = root.getChildByPath("effectBtn/Label").getComponent(Label);
              if (cfg.isProp) lbl.string = "使用";else if (data.isEquip) lbl.string = "卸下";else lbl.string = "装备";
            });
          }
        }
        //如果关键数据列表存在VList中（如buffList），那么本地尽量不要再维护一个数据列表，只取得VList.infos中的数据进行修改
        //通过VList.addData()和VList.deleteData()或VList.deleteIdx()进行增删和增量刷新
        ;

        _proto.addBuff = function addBuff(buffIdx) {
          var buffListIdx = this.buffList.infos.findIndex(function (e) {
            return e.data.buffIdx == buffIdx;
          });
          if (buffListIdx < 0) {
            var buffData = {
              buffIdx: buffIdx,
              time: 5
            };
            this.buffList.addData(buffData);
          } else {
            this.buffList.infos[buffListIdx].data.time += 5;
            this.buffList.refreshItem(buffListIdx);
          }
        }
        //如果关键数据列表不存在VList中（如inventory），那么当数据有变动时，尽量不要通过VList.addData和VList.deleteData进行增删，再同步inventory
        //建议选择使用统一的函数，调用setData进行全量刷新，如果需要增量刷新，则参考buffList将关键数据列表交由VList管理
        ;

        _proto.refreshBackpack = function refreshBackpack(ignoreReset) {
          if (ignoreReset === void 0) {
            ignoreReset = false;
          }
          //由于每个页面的数据已经通过闭包自行计算，无需分配页面数据，所以这里只需要告知列表所有的页数，即长度为this.allPage的空数组
          //new Array(this.allPage)本身无法表示一个有效数组，必须有填充
          this.backpackPages.setData(new Array(this.allPage).fill(null), ignoreReset);
        };
        _proto.onGetEquipment = function onGetEquipment() {
          if (this.movingItem) {
            this.onCancelMove();
            return;
          }
          var datas = Array.from(this.inventory.equipmentIdxMap.values()).sort(function (a, b) {
            return a.slotIdx - b.slotIdx;
          });
          var i = 0;
          for (i = 0; i < datas.length && i >= datas[i].slotIdx; i++);
          var minSlotIdx = i;
          this.inventory.equipmentIdxMap.set(minSlotIdx, {
            itemId: Math.floor(Math.random() * 6 + 1),
            slotIdx: minSlotIdx,
            isEquip: false,
            num: 1
          });
          if (this.selectTabIdx != 0) this.switchTab(0);else this.refreshBackpack(true);
        };
        _proto.onGetProp = function onGetProp() {
          if (this.movingItem) {
            this.onCancelMove();
            return;
          }
          var propId = Math.floor(Math.random() * 6 + 7);
          var datas = Array.from(this.inventory.propIdxMap.values()).sort(function (a, b) {
            return a.slotIdx - b.slotIdx;
          });
          var curData = datas.find(function (e) {
            return e.itemId == propId;
          });
          if (curData) {
            curData.num++;
          } else {
            var i = 0;
            for (i = 0; i < datas.length && i >= datas[i].slotIdx; i++);
            var minSlotIdx = i;
            this.inventory.propIdxMap.set(minSlotIdx, {
              itemId: propId,
              slotIdx: minSlotIdx,
              isEquip: false,
              num: 1
            });
          }
          if (this.selectTabIdx != 1) this.switchTab(1);else this.refreshBackpack(true);
        };
        _proto.onClickSlot = function onClickSlot(info) {
          var slotIdx = this.gridIdx2slotIdx(info.idx);
          if (!this.movingItem) {
            if (this.selectSlotIdx == slotIdx) {
              this.onCancelSelect(info);
              this.selectSlotIdx = -1;
            } else {
              this.onCancelSelectCurrent();
              if (info.data != null) this.onSelectInfo(info);
            }
            this.refreshDetailPanel();
          } else if (info.data == null) {
            this.movingItem.slotIdx = slotIdx;
            (this.dataMap.get(this.movingItem.itemId).isProp ? this.inventory.propIdxMap : this.inventory.equipmentIdxMap).set(this.movingItem.slotIdx, this.movingItem);
            this.movingItem = null;
            this.movingSlot.active = false;
            this.selectSlotIdx = slotIdx;
            this.refreshBackpack();
          } else {
            this.onCancelMove();
          }
        };
        _proto.onCancelMove = function onCancelMove() {
          if (!this.movingItem) return;
          (this.dataMap.get(this.movingItem.itemId).isProp ? this.inventory.propIdxMap : this.inventory.equipmentIdxMap).set(this.movingItem.slotIdx, this.movingItem);
          this.selectSlotIdx = this.movingItem.slotIdx;
          this.movingItem = null;
          this.movingSlot.active = false;
          this.refreshBackpack();
        };
        _proto.onCancelAll = function onCancelAll() {
          this.onCancelMove();
          this.onCancelSelectCurrent();
        };
        _proto.onClickEffect = function onClickEffect() {
          var _this7 = this;
          if (this.movingItem) {
            this.onCancelMove();
            return;
          }
          var slotIdx = this.selectSlotIdx;
          var data = [this.inventory.equipmentIdxMap, this.inventory.propIdxMap][this.selectTabIdx].get(slotIdx);
          var cfg = this.dataMap.get(data.itemId);
          if (!cfg.canOperate) return;
          if (cfg.isProp) {
            data.num--;
            this.addBuff(cfg.buffIdx);
            if (data.num <= 0) {
              this.inventory.propIdxMap["delete"](slotIdx);
              this.selectSlotIdx = -1;
              this.refreshDetailPanel();
            }
          } else if (data.isEquip) {
            data.isEquip = false;
          } else {
            var lastEquip = Array.from(this.inventory.equipmentIdxMap.values()).find(function (e) {
              return e && e.isEquip;
            });
            if (lastEquip) {
              lastEquip.isEquip = false;
              var pageIdx = Math.floor(lastEquip.slotIdx / this.gridCnt);
              this.backpackPages.infos[pageIdx].call(function (info) {
                info.node.getComponent(VList).refreshItem(slotIdx % _this7.gridCnt);
              }, false);
            }
            data.isEquip = true;
          }
          //只刷新当前页面
          this.backpackPages.refreshItem(this.pageIdx);

          //或只刷新当前格子，与上面的方法二选一即可
          var gridIdx = this.slot2gridIdx(slotIdx);
          this.backpackPages.curPageInfo.call(function (pageInfo) {
            var gridList = pageInfo.node.getComponent(VList);
            gridList.refreshItem(gridIdx);
          });
        };
        _proto.onClickMove = function onClickMove() {
          if (this.movingItem) {
            this.onCancelMove();
            return;
          }
          this.movingItem = this.backpackPages.curPageInfo.node.getComponent(VList).infos[this.selectSlotIdx % this.gridCnt].data;
          this.movingSlot.active = true;
          this.selectSlotIdx = -1;
          this.setSlotData(this.movingSlot, this.movingItem);
          this.movingSlot.position = this.getComponent(UITransform).convertToNodeSpaceAR(this.detailPanel.getChildByPath("root/moveBtn").getComponent(UITransform).convertToWorldSpaceAR(v3()));
          var cfg = this.dataMap.get(this.movingItem.itemId);
          (cfg.isProp ? this.inventory.propIdxMap : this.inventory.equipmentIdxMap)["delete"](this.movingItem.slotIdx);
          //只刷新当前页面
          this.backpackPages.refreshItem(this.pageIdx);
        };
        _proto.onTurnLeft = function onTurnLeft() {
          if (this.movingItem) {
            this.onCancelMove();
            return;
          }
          this.onCancelSelectCurrent();
          this.backpackPages.turnPrevious();
          this.refreshDetailPanel();
          this.onRefreshIndicator();
        };
        _proto.onTurnRight = function onTurnRight() {
          if (this.movingItem) {
            this.onCancelMove();
            return;
          }
          this.onCancelSelectCurrent();
          this.backpackPages.turnNext();
          this.refreshDetailPanel();
          this.onRefreshIndicator();
        };
        _proto.onChangeCol = function onChangeCol(slider) {
          if (this.movingItem) {
            this.onCancelMove();
            return;
          }
          this.onCancelSelectCurrent();
          var col = Math.round(lerp(minCol, maxCol, slider.progress));
          if (col != this.col) {
            this.col = col;
            this.refreshBackpack();
          }
        };
        _proto.onChangeRow = function onChangeRow(slider) {
          if (this.movingItem) {
            this.onCancelMove();
            return;
          }
          this.onCancelSelectCurrent();
          var row = Math.round(lerp(minRow, maxRow, slider.progress));
          if (this.row != row) {
            this.row = row;
            this.refreshBackpack();
          }
        };
        _proto.onAddSlot = function onAddSlot() {
          if (this.movingItem) {
            this.onCancelMove();
            return;
          }
          this.allSlotCnt = Math.min(this.allSlotCnt + 5, 60);
          this.onCancelSelectCurrent();
          this.refreshDetailPanel();
          this.refreshBackpack(true);
          this.onRefreshIndicator();
          this.refreshChangeSlotBtn();
        };
        _proto.onSubSlot = function onSubSlot() {
          if (this.movingItem) {
            this.onCancelMove();
            return;
          }
          this.allSlotCnt = Math.max(this.allSlotCnt - 5, 30);
          this.onCancelSelectCurrent();
          this.refreshDetailPanel();
          this.refreshBackpack(true);
          this.onRefreshIndicator();
          this.refreshChangeSlotBtn();
        };
        _proto.refreshChangeSlotBtn = function refreshChangeSlotBtn() {
          this.addSlotBtn.getComponent(Sprite).grayscale = this.allSlotCnt >= 60;
          this.subSlotBtn.getComponent(Sprite).grayscale = this.allSlotCnt <= 30;
        };
        _proto.onRefreshIndicator = function onRefreshIndicator() {
          var pageIdx = this.pageIdx;
          this.pageLbl.string = (pageIdx + 1).toFixed();
          this.rightPageBtn.active = pageIdx < this.backpackPages.pageCnt - 1;
          this.leftPageBtn.active = pageIdx > 0;
        };
        _proto.onMouseMove = function onMouseMove(e) {
          var _this8 = this;
          if (this.movingItem) {
            var pos = e.getUILocation();
            var wp = v3(pos.x, pos.y, 0);
            if (this.previewGridIdx >= 0) {
              this.backpackPages.curPageInfo.call(function (info) {
                info.node.getComponent(VList).infos[_this8.previewGridIdx].call(function (gridInfo) {
                  wp = gridInfo.node.getComponent(UITransform).convertToWorldSpaceAR(v3());
                });
              });
            }
            this.movingSlot.position = this.getComponent(UITransform).convertToNodeSpaceAR(wp);
          }
        };
        _createClass(BackpackDemo, [{
          key: "gridCnt",
          get: function get() {
            return this.col * this.row;
          }
        }, {
          key: "pageIdx",
          get: function get() {
            return this.backpackPages.pageIdx;
          }
        }, {
          key: "allPage",
          get: function get() {
            return Math.ceil(this.allSlotCnt / this.gridCnt);
          }
        }, {
          key: "dataMap",
          get: function get() {
            return Res.dataMap;
          }
        }]);
        return BackpackDemo;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "backpackPages", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pageLbl", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "leftPageBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rightPageBtn", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "addSlotBtn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "subSlotBtn", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "buffList", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "buffFrames", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "detailPanel", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "movingSlot", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);
        function DebugViewRuntimeControl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));
          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }
        var _proto = DebugViewRuntimeControl.prototype;
        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);
          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }
          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
            y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
            height = 20;

          // new nodes
          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles';

          // title
          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;
            var _labelComponent = newLabel.getComponent(Label);
            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }
          y -= height;
          // single
          var currentRow = 0;
          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }
            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }
          x += width;
          // buttons
          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent;

          // misc
          y -= 40;
          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);
            _newNode.setPosition(x, y - height * _i2, 0.0);
            _newNode.setScale(0.5, 0.5, 0.5);
            _newNode.parent = miscNode;
            var _textComponent = _newNode.getComponentInChildren(RichText);
            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;
            var toggleComponent = _newNode.getComponent(Toggle);
            toggleComponent.isChecked = _i2 ? true : false;
            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);
            this.miscModeToggleList[_i2] = _newNode;
          }

          // composite
          y -= 150;
          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;
            _newNode2.setPosition(x, y - height * _i3, 0.0);
            _newNode2.setScale(0.5, 0.5, 0.5);
            _newNode2.parent = this.compositeModeToggle.parent;
            var _textComponent2 = _newNode2.getComponentInChildren(RichText);
            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;
            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);
            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };
        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');
          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };
        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };
        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };
        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };
        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };
        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);
          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);
            _toggleComponent.isChecked = true;
          }
          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };
        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };
        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;
          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }
          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }
          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };
        _proto.onLoad = function onLoad() {};
        _proto.update = function update(deltaTime) {};
        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Defer.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e178bg3ruFDNJfZMm7HjWV7", "Defer", undefined);
      var Defer = exports('Defer', /*#__PURE__*/function () {
        function Defer() {
          var _this = this;
          this.resolve = void 0;
          this.reject = void 0;
          this.resolved = false;
          this.promise = void 0;
          this.promise = new Promise(function (resolve, reject) {
            _this.resolve = function (value) {
              _this.resolved = true;
              resolve(value);
            };
            _this.reject = reject;
          });
        }
        Defer.delay = function delay(ms) {
          var defer = new Defer();
          setTimeout(function () {
            return defer.resolve();
          }, ms);
          return defer;
        };
        return Defer;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FixedScrollView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Vec3, UITransform, ScrollView, v2;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      UITransform = module.UITransform;
      ScrollView = module.ScrollView;
      v2 = module.v2;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "d01f4e9mgJLBJnyeHkZUl5I", "FixedScrollView", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FixedScrollView = exports('FixedScrollView', (_dec = ccclass('FixedScrollView'), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_ScrollView) {
        _inheritsLoose(FixedScrollView, _ScrollView);
        function FixedScrollView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ScrollView.call.apply(_ScrollView, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "allowTouch", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isHandleReleaseScroll", _descriptor2, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = FixedScrollView.prototype;
        _proto._calculateMovePercentDelta = function _calculateMovePercentDelta(options) {
          var anchor = options.anchor;
          var applyToHorizontal = options.applyToHorizontal;
          var applyToVertical = options.applyToVertical;
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          var self = this;
          self._calculateBoundary();
          var bottomDelta = self._getContentBottomBoundary() - self._bottomBoundary;
          bottomDelta = -bottomDelta;
          var leftDelta = self._getContentLeftBoundary() - self._leftBoundary;
          leftDelta = -leftDelta;
          var moveDelta = new Vec3();
          if (self._content && self.view) {
            var totalScrollDelta = 0;
            var uiTrans = self._content.getComponent(UITransform);
            var contentSize = uiTrans.contentSize;
            var scrollSize = self.view.contentSize;
            if (applyToHorizontal) {
              totalScrollDelta = contentSize.width - scrollSize.width;
              moveDelta.x = leftDelta - totalScrollDelta * anchor.x;
            }
            if (applyToVertical) {
              totalScrollDelta = contentSize.height - scrollSize.height;
              moveDelta.y = bottomDelta - totalScrollDelta * anchor.y;
            }
          }
          return moveDelta;
        };
        _proto._processAutoScrolling = function _processAutoScrolling(dt) {
          _ScrollView.prototype._processAutoScrolling.call(this, dt);
          var self = this;
          if (!self._autoScrolling) {
            self.node.emit(FixedScrollView.FINISH_AUTO_SCROLL);
          }
        };
        _proto._onTouchCancelled = function _onTouchCancelled(event, captureListeners) {
          if (!this.allowTouch) return;
          _ScrollView.prototype._onTouchCancelled.call(this, event, captureListeners);
          if (event && !event.simulate) {
            this._dispatchEvent(ScrollView.EventType.TOUCH_UP);
          }
        };
        _proto._handleReleaseLogic = function _handleReleaseLogic(touch) {
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          var self = this;
          self._getLocalAxisAlignDelta(self._deltaPos, touch);
          self._gatherTouchMove(self._deltaPos);
          if (self.isHandleReleaseScroll || this._isOutOfBoundary()) self._processInertiaScroll();
          if (self._scrolling) {
            self._scrolling = false;
            if (!self._autoScrolling) {
              self._dispatchEvent(ScrollView.EventType.SCROLL_ENDED);
            }
          }
        };
        _proto._onTouchBegan = function _onTouchBegan(event, captureListeners) {
          if (!this.allowTouch) return;
          _ScrollView.prototype._onTouchBegan.call(this, event, captureListeners);
        };
        _proto._onTouchMoved = function _onTouchMoved(event, captureListeners) {
          if (!this.allowTouch) return;
          _ScrollView.prototype._onTouchMoved.call(this, event, captureListeners);
        };
        _proto._onTouchEnded = function _onTouchEnded(event, captureListeners) {
          if (!this.allowTouch) return;
          _ScrollView.prototype._onTouchEnded.call(this, event, captureListeners);
        };
        _createClass(FixedScrollView, [{
          key: "isOutOfBoundary",
          get: function get() {
            return this._isOutOfBoundary();
          }
        }, {
          key: "scrollAnchor",
          get: function get() {
            var offset = this.getScrollOffset();
            var max = this.getMaxScrollOffset();
            return v2(max.x == 0 ? 0 : offset.x / max.x, max.y == 0 ? 0 : 1 - offset.y / max.y);
          }
        }]);
        return FixedScrollView;
      }(ScrollView), _class3.FINISH_AUTO_SCROLL = "finishAutoScroll", _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "allowTouch", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isHandleReleaseScroll", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GainRewardDemo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './VList.ts', './Res.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, UIOpacity, Sprite, Label, NodeEventType, AnimationComponent, Widget, tween, Component, VList, Res;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      Sprite = module.Sprite;
      Label = module.Label;
      NodeEventType = module.NodeEventType;
      AnimationComponent = module.AnimationComponent;
      Widget = module.Widget;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      VList = module.VList;
    }, function (module) {
      Res = module.Res;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "6de2bxGIc9CxKDnjPTPUGpK", "GainRewardDemo", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GainRewardDemo = exports('GainRewardDemo', (_dec = ccclass('GainRewardDemo'), _dec2 = property(VList), _dec3 = property(UIOpacity), _dec4 = property(UIOpacity), _dec5 = property(UIOpacity), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GainRewardDemo, _Component);
        function GainRewardDemo() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "slotList", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bg", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "title", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "tips", _descriptor4, _assertThisInitialized(_this));
          _this.isComplete = false;
          _this.isInited = false;
          _this.twns = [];
          return _this;
        }
        var _proto = GainRewardDemo.prototype;
        _proto.start = function start() {
          if (!this.isInited) this.init();
        };
        _proto.init = function init() {
          var _this2 = this;
          this.isInited = true;
          this.slotList.init({
            onData: function onData(info) {
              var showInfo = Res.Ins.getItemShow(info.data);
              info.get("_icon", Sprite).spriteFrame = showInfo.icon;
              info.get("_tag", Sprite).spriteFrame = showInfo.tag;
              info.get("_numLbl", Label).string = info.data.num.toFixed();
            }
          });
          this.node.on(NodeEventType.TOUCH_END, function () {
            _this2.node.active = false;
            _this2.isComplete = true;
            _this2.twns.forEach(function (e) {
              return e.stop();
            });
            _this2.twns = [];
            _this2.slotList.infos.forEach(function (e) {
              return e.call(function (info) {
                return info.node.getComponent(AnimationComponent).stop();
              });
            });
          }, this);
        };
        _proto.startTwn = function startTwn(t) {
          var _this3 = this;
          this.twns.push(t);
          t.call(function () {
            return _this3.twns.splice(_this3.twns.indexOf(t), 1);
          });
          t.start();
        };
        _proto.onEnable = function onEnable() {
          var _this4 = this;
          setTimeout(function () {
            return _this4.getComponent(Widget).updateAlignment();
          }, 10);
        };
        _proto.gain = function gain(rewards) {
          var _this5 = this;
          if (!this.isInited) this.init();
          this.isComplete = false;
          this.node.active = true;
          this.bg.opacity = 0;
          this.title.opacity = 0;
          this.title.opacity = 0;
          this.tips.opacity = 0;
          this.slotList.setData([]);
          this.twns = [];
          this.startTwn(tween(this.bg).to(0.3, {
            opacity: 255
          }));
          this.startTwn(tween(this.title).to(0.3, {
            opacity: 255
          }));
          this.startTwn(tween(this.tips).to(0.5, {
            opacity: 255
          }));
          this.startTwn(tween(this.slotList).delay(0.1).call( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var i;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  i = 0;
                case 1:
                  if (!(i < rewards.length)) {
                    _context.next = 13;
                    break;
                  }
                  if (!_this5.isComplete) {
                    _context.next = 4;
                    break;
                  }
                  return _context.abrupt("return");
                case 4:
                  _this5.slotList.addData(rewards[i]);
                  _context.next = 7;
                  return _this5.slotList.exePromise();
                case 7:
                  _this5.slotList.infos[_this5.slotList.infos.length - 1].call(function (info) {
                    return info.node.getComponent(AnimationComponent).play("rewardItem");
                  });
                  _context.next = 10;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 200);
                  });
                case 10:
                  i++;
                  _context.next = 1;
                  break;
                case 13:
                  _context.next = 15;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 300);
                  });
                case 15:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }))));
          this.startTwn(tween(this).delay(rewards.length * 0.2 + 0.3 + 0.1));
        };
        return GainRewardDemo;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "slotList", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "tips", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ItemDataBase.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d80f2roKTVGBbHP9+tURdm6", "ItemDataBase", undefined);
      var ItemDataBase = exports('ItemDataBase', [{
        id: 1,
        isProp: false,
        quality: 1,
        spriteFrameIdx: 0,
        canOperate: true,
        name: "斧子",
        desc: "一把锋利的斧子",
        buffIdx: -1
      }, {
        id: 2,
        isProp: false,
        quality: 2,
        spriteFrameIdx: 1,
        canOperate: true,
        name: "镐子",
        desc: "一把锋利的镐子",
        buffIdx: -1
      }, {
        id: 3,
        isProp: false,
        quality: 2,
        spriteFrameIdx: 2,
        canOperate: true,
        name: "锤子",
        desc: "一把笨重的锤子",
        buffIdx: -1
      }, {
        id: 4,
        isProp: false,
        quality: 3,
        spriteFrameIdx: 3,
        canOperate: true,
        name: "手机",
        desc: "记录了所有信息的收集",
        buffIdx: -1
      }, {
        id: 5,
        isProp: false,
        quality: 3,
        spriteFrameIdx: 4,
        canOperate: false,
        name: "手柄",
        desc: "用来玩游戏",
        buffIdx: -1
      }, {
        id: 6,
        isProp: false,
        quality: 4,
        spriteFrameIdx: 5,
        canOperate: true,
        name: "耳机",
        desc: "用来听音乐很合适",
        buffIdx: -1
      }, {
        id: 7,
        isProp: true,
        quality: 1,
        spriteFrameIdx: 0,
        canOperate: true,
        name: "红色药丸",
        desc: "增加攻击力5秒",
        buffIdx: 0
      }, {
        id: 8,
        isProp: true,
        quality: 2,
        spriteFrameIdx: 1,
        canOperate: true,
        name: "蓝色药丸",
        desc: "增加防御力5秒",
        buffIdx: 2
      }, {
        id: 9,
        isProp: true,
        quality: 2,
        spriteFrameIdx: 2,
        canOperate: true,
        name: "创可贴",
        desc: "治愈效果5秒",
        buffIdx: 6
      }, {
        id: 10,
        isProp: true,
        quality: 3,
        spriteFrameIdx: 3,
        canOperate: true,
        name: "骨头",
        desc: "增加暴击率5秒",
        buffIdx: 4
      }, {
        id: 11,
        isProp: true,
        quality: 3,
        spriteFrameIdx: 4,
        canOperate: false,
        name: "威士忌",
        desc: "增加法术值5秒",
        buffIdx: 1
      }, {
        id: 12,
        isProp: true,
        quality: 4,
        spriteFrameIdx: 5,
        canOperate: true,
        name: "啤酒",
        desc: "增加魔力值5秒",
        buffIdx: 7
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './FixedScrollView.ts', './VList.ts', './VListLayerCom.ts', './Defer.ts', './ItemDataBase.ts', './MainScene.ts', './Res.ts', './BackpackDemo.ts', './RankDemo.ts', './RankItem.ts', './GainRewardDemo.ts', './ShopDemo.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MainScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Defer.ts', './RankDemo.ts', './GainRewardDemo.ts', './ShopDemo.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, _createClass, cclegacy, _decorator, Node, Prefab, view, ResolutionPolicy, Slider, NodeEventType, Widget, profiler, v3, UITransform, Component, lerp, v2, instantiate, Defer, RankDemo, GainRewardDemo, ShopDemo;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      view = module.view;
      ResolutionPolicy = module.ResolutionPolicy;
      Slider = module.Slider;
      NodeEventType = module.NodeEventType;
      Widget = module.Widget;
      profiler = module.profiler;
      v3 = module.v3;
      UITransform = module.UITransform;
      Component = module.Component;
      lerp = module.lerp;
      v2 = module.v2;
      instantiate = module.instantiate;
    }, function (module) {
      Defer = module.Defer;
    }, function (module) {
      RankDemo = module.RankDemo;
    }, function (module) {
      GainRewardDemo = module.GainRewardDemo;
    }, function (module) {
      ShopDemo = module.ShopDemo;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "fdc36fMXFRFb4gb7WfBj6NW", "MainScene", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var maxHeight = 1020;
      var MainScene = exports('MainScene', (_dec = ccclass('MainScene'), _dec2 = property(Node), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property(Prefab), _dec6 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MainScene, _Component);
        function MainScene() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.ratioSlider = void 0;
          _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rankDemoPrefab", _descriptor2, _assertThisInitialized(_this));
          _this.rankDefer = void 0;
          _initializerDefineProperty(_this, "backpackDemoPrefab", _descriptor3, _assertThisInitialized(_this));
          _this.backpackDefer = void 0;
          _initializerDefineProperty(_this, "shopDemoPrefab", _descriptor4, _assertThisInitialized(_this));
          _this.shopDefer = void 0;
          _initializerDefineProperty(_this, "rewardsDemoPrefab", _descriptor5, _assertThisInitialized(_this));
          _this.rankDemo = null;
          _this.backpackDemo = null;
          _this.shopDemo = null;
          _this.statsNode = null;
          _this.isShowProfiler = false;
          _this.exeFuncs = [];
          _this.nextExe = [];
          return _this;
        }
        var _proto = MainScene.prototype;
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          this.loadingDemo();
          this.ratioSlider = this.node.getChildByPath("ctrl/slider").getComponent(Slider);
          this.node.getChildByPath("ctrl/rankBtn").on(NodeEventType.TOUCH_END, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this2.rankDefer.promise;
                case 2:
                  _this2.title.active = false;
                  _this2.demos.forEach(function (e) {
                    return e && (e.active = e == _this2.rankDemo);
                  });
                  _this2.nextExe.push(function () {
                    _this2.rankDemo.getComponent(Widget).updateAlignment();
                    setTimeout(function () {
                      return _this2.rankDemo.getComponent(RankDemo).updateMyItem();
                    }, 10);
                  });
                case 5:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
          this.node.getChildByPath("ctrl/backpackBtn").on(NodeEventType.TOUCH_END, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this2.backpackDefer.promise;
                case 2:
                  _this2.title.active = false;
                  _this2.demos.forEach(function (e) {
                    return e && (e.active = e == _this2.backpackDemo);
                  });
                  _this2.nextExe.push(function () {
                    return _this2.backpackDemo.getComponent(Widget).updateAlignment();
                  });
                case 5:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          })));
          this.node.getChildByPath("ctrl/shopBtn").on(NodeEventType.TOUCH_END, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _this2.shopDefer.promise;
                case 2:
                  _this2.title.active = false;
                  _this2.demos.forEach(function (e) {
                    return e && (e.active = e == _this2.shopDemo);
                  });
                  _this2.nextExe.push(function () {
                    return _this2.shopDemo.getComponent(Widget).updateAlignment();
                  });
                case 5:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          })));
          this.statsNode = this.node.getChildByPath("ctrl/stats");
          profiler.hideStats();
          this.onChangeRatio();
        };
        _proto.loadingDemo = /*#__PURE__*/function () {
          var _loadingDemo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var root, rewardsDemo;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  root = this.node.getChildByName("root");
                  this.rankDefer = new Defer();
                  this.backpackDefer = new Defer();
                  this.shopDefer = new Defer();
                  this.rankDemo = instantiate(this.rankDemoPrefab);
                  this.rankDemo.setParent(root);
                  this.rankDemo.active = false;
                  this.rankDefer.resolve();
                  _context4.next = 10;
                  return Defer.delay(10).promise;
                case 10:
                  this.backpackDemo = instantiate(this.backpackDemoPrefab);
                  this.backpackDemo.setParent(root);
                  this.backpackDemo.active = false;
                  this.backpackDefer.resolve();
                  _context4.next = 16;
                  return Defer.delay(10).promise;
                case 16:
                  this.shopDemo = instantiate(this.shopDemoPrefab);
                  this.shopDemo.setParent(root);
                  this.shopDemo.active = false;
                  _context4.next = 21;
                  return Defer.delay(10).promise;
                case 21:
                  rewardsDemo = instantiate(this.rewardsDemoPrefab);
                  rewardsDemo.setParent(root);
                  rewardsDemo.active = false;
                  this.shopDemo.getComponent(ShopDemo).gainReward = rewardsDemo.getComponent(GainRewardDemo);
                  this.shopDefer.resolve();
                case 26:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function loadingDemo() {
            return _loadingDemo.apply(this, arguments);
          }
          return loadingDemo;
        }();
        _proto.onChangeRatio = function onChangeRatio() {
          var scale = maxHeight / this.size.y;
          var root = this.node.getChildByName("root");
          root.scale = v3(scale, scale, 1);
          root.getComponent(UITransform).height = this.size.y;
        };
        _proto.onSwitchProfiler = function onSwitchProfiler() {
          this.isShowProfiler = !this.isShowProfiler;
          if (this.isShowProfiler) profiler.showStats();else profiler.hideStats();
          this.node.getChildByName("profilerModal").active = this.isShowProfiler;
        };
        _proto.update = function update() {
          this.exeFuncs.forEach(function (e) {
            return e();
          });
          this.exeFuncs = this.nextExe;
          this.nextExe = [];
        };
        _createClass(MainScene, [{
          key: "ratio",
          get: function get() {
            return lerp(13 / 9, 19.5 / 9, this.ratioSlider.progress);
          }
        }, {
          key: "size",
          get: function get() {
            return v2(750, 750 * this.ratio);
          }
        }, {
          key: "demos",
          get: function get() {
            return [this.rankDemo, this.backpackDemo, this.shopDemo];
          }
        }]);
        return MainScene;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rankDemoPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "backpackDemoPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "shopDemoPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rewardsDemoPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      view.setDesignResolutionSize(750, 1334, ResolutionPolicy.SHOW_ALL);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RankDemo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './VList.ts', './Res.ts', './RankItem.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, Label, Sprite, NodeEventType, UITransform, v3, clamp, Component, VList, VListEvent, Res, RankItem;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Label = module.Label;
      Sprite = module.Sprite;
      NodeEventType = module.NodeEventType;
      UITransform = module.UITransform;
      v3 = module.v3;
      clamp = module.clamp;
      Component = module.Component;
    }, function (module) {
      VList = module.VList;
      VListEvent = module.VListEvent;
    }, function (module) {
      Res = module.Res;
    }, function (module) {
      RankItem = module.RankItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "a0effu5bX1BdpO174Rv4w7L", "RankDemo", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RankDemo = exports('RankDemo', (_dec = ccclass('RankDemo'), _dec2 = property(VList), _dec3 = property(SpriteFrame), _dec4 = property(RankItem), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RankDemo, _Component);
        function RankDemo() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "list", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "heads", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "myItem", _descriptor3, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = RankDemo.prototype;
        _proto.start = function start() {
          var _this2 = this;
          this.list.init({
            onData: function onData(info) {
              info.getNode("_bg").active = !info.data.isCurUser;
              info.getNode("_myBg").active = info.data.isCurUser;
              var rankKeys = ["_gold", "_silver", "_copper", "_ranklbl"];
              rankKeys.forEach(function (e) {
                return info.getNode(e).active = false;
              });
              if (info.data.rank > 3) {
                info.getNode("_ranklbl").active = true;
                info.get("_ranklbl", Label).string = info.data.rank.toFixed();
              } else info.getNode(rankKeys[info.data.rank - 1]).active = true;
              info.get("_headIcon", Sprite).spriteFrame = _this2.heads[info.data.headIdx];
              info.get("_name", Label).string = info.data.name;
              var boxIcon = info.get("_boxIcon", Sprite);
              boxIcon.node.active = true;
              if (info.data.rank <= 3) boxIcon.spriteFrame = Res.Ins.boxes[info.data.rank - 1];else boxIcon.node.active = false;
              info.get("_score", Label).string = info.data.score.toFixed();

              //或者
              info.node.getComponent(RankItem).setData(info.data);
            }
          });
          this.node.on(NodeEventType.SIZE_CHANGED, this.updateMyItem, this);
          var dataList = [];
          for (var i = 0; i < 50; i++) {
            dataList.push({
              rank: 0,
              score: Math.random() * 1000,
              name: "\u6E38\u5BA2" + (Math.random() * 10000).toFixed(),
              headIdx: Math.floor(Math.random() * this.heads.length),
              isCurUser: false
            });
          }
          var myData = dataList[25];
          myData.isCurUser = true;
          dataList.sort(function (b, a) {
            return a.score - b.score;
          }).forEach(function (e, i) {
            return e.rank = i + 1;
          });
          this.myItem.setData(myData);
          this.list.setData(dataList);
          this.list.node.on(VListEvent.OnScrolling, this.updateMyItem, this);
          this.updateMyItem();
        };
        _proto.updateMyItem = function updateMyItem() {
          var size = this.list.getComponent(UITransform).contentSize;

          //在list坐标系下的最大和最小y坐标
          var maxY = this.list.node.position.y + size.height / 2 - this.list.itemSize.height / 2;
          var minY = this.list.node.position.y - size.height / 2 + this.list.itemSize.height / 2;

          //计算当前我所在的y坐标
          var myIdx = this.list.infos.findIndex(function (e) {
            return e.data.isCurUser;
          });
          var myPos = this.list.getPosInfo(myIdx).center;
          var curY = this.myItem.node.parent.getComponent(UITransform).convertToNodeSpaceAR(this.list.lp2wp(v3(myPos.x, myPos.y, 0))).y;
          this.myItem.node.position = v3(0, clamp(curY, minY, maxY), 0);
        };
        _proto.addScore = function addScore() {
          var datas = this.list.infos.map(function (e) {
            return e.data;
          });
          datas.find(function (e) {
            return e.isCurUser;
          }).score += 20;
          this.refreshScore();
        };
        _proto.subScore = function subScore() {
          var datas = this.list.infos.map(function (e) {
            return e.data;
          });
          datas.find(function (e) {
            return e.isCurUser;
          }).score -= 20;
          this.refreshScore();
        };
        _proto.refreshScore = function refreshScore() {
          var datas = this.list.infos.map(function (e) {
            return e.data;
          });
          datas.sort(function (b, a) {
            return a.score - b.score;
          }).forEach(function (e, i) {
            return e.rank = i + 1;
          });
          this.list.setData(datas, true);
          this.myItem.setData(datas.find(function (e) {
            return e.isCurUser;
          }));
          this.updateMyItem();
        };
        _proto.moveToMyPos = function moveToMyPos() {
          var idx = this.list.infos.findIndex(function (e) {
            return e.data.isCurUser;
          });
          this.list.focus(idx, 0.1);
        };
        _proto.scrollToTop = function scrollToTop() {
          this.list.focus("Top", 0.5);
        };
        _proto.scrollToBottom = function scrollToBottom() {
          this.list.focus("Bottom", 0.5);
        };
        return RankDemo;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "list", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "heads", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "myItem", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RankItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Sprite, Label, SpriteFrame, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Sprite = module.Sprite;
      Label = module.Label;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
      cclegacy._RF.push({}, "023abmzBq5HZZ2BNO69GSvd", "RankItem", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var RankItem = exports('RankItem', (_dec = ccclass('RankItem'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Sprite), _dec6 = property(Label), _dec7 = property(Sprite), _dec8 = property(Label), _dec9 = property(SpriteFrame), _dec10 = property(SpriteFrame), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RankItem, _Component);
        function RankItem() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "myBg", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bg", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rankNodes", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "headIcon", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nameLbl", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "boxIcon", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scoreLbl", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "heads", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "boxes", _descriptor9, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = RankItem.prototype;
        _proto.setData = function setData(data) {
          this.bg.active = !data.isCurUser;
          this.myBg.active = data.isCurUser;
          this.rankNodes.forEach(function (e) {
            return e.active = false;
          });
          if (data.rank > 3) {
            this.rankNodes[3].active = true;
            this.rankNodes[3].getComponent(Label).string = data.rank.toFixed();
          } else {
            this.rankNodes[data.rank - 1].active = true;
          }
          this.headIcon.spriteFrame = this.heads[data.headIdx];
          this.nameLbl.string = data.name;
          this.boxIcon.node.active = true;
          if (data.rank <= 3) this.boxIcon.spriteFrame = this.boxes[data.rank - 1];else this.boxIcon.node.active = false;
          this.scoreLbl.string = data.score.toFixed();
        };
        return RankItem;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "myBg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rankNodes", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "headIcon", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "nameLbl", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "boxIcon", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "scoreLbl", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "heads", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "boxes", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Res.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ItemDataBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, SpriteFrame, Component, ItemDataBase;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }, function (module) {
      ItemDataBase = module.ItemDataBase;
    }],
    execute: function () {
      exports('getCfg', getCfg);
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3;
      cclegacy._RF.push({}, "b5339TxNqJEqoU3JuouS+Zr", "Res", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Res = exports('Res', (_dec = ccclass('Res'), _dec2 = property(SpriteFrame), _dec3 = property(SpriteFrame), _dec4 = property(SpriteFrame), _dec5 = property(SpriteFrame), _dec6 = property(SpriteFrame), _dec7 = property(SpriteFrame), _dec8 = property(SpriteFrame), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Res, _Component);
        function Res() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "taskScoreFrame", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rewardScoreFrame", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "coinFrame", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "qualityTags", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "propFrames", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "equipmentFrames", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "boxes", _descriptor7, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = Res.prototype;
        _proto.onLoad = function onLoad() {
          Res.instance = this;
        };
        _proto.getSpriteFrame = function getSpriteFrame(itemId) {
          return (getCfg(itemId).isProp ? this.propFrames : this.equipmentFrames)[getCfg(itemId).spriteFrameIdx];
        };
        _proto.getItemShow = function getItemShow(info) {
          return {
            icon: info.type == 4 ? this.getSpriteFrame(info.itemId) : [this.taskScoreFrame, this.rewardScoreFrame, this.coinFrame][info.type - 1],
            tag: info.type == 4 ? this.qualityTags[getCfg(info.itemId).quality - 1] : null,
            name: info.type == 4 ? getCfg(info.itemId).name : ["每日积分", "通行证积分", "金币"][info.type - 1]
          };
        };
        _proto.getQualityFrame = function getQualityFrame(itemId) {
          return this.qualityTags[getCfg(itemId).quality - 1];
        };
        _createClass(Res, null, [{
          key: "Ins",
          get: function get() {
            return this.instance;
          }
        }]);
        return Res;
      }(Component), _class3.instance = null, _class3.dataMap = new Map(), _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "taskScoreFrame", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rewardScoreFrame", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "coinFrame", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "qualityTags", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "propFrames", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "equipmentFrames", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "boxes", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      function getCfg(itemId) {
        return Res.dataMap.get(itemId);
      }
      ItemDataBase.forEach(function (e) {
        Res.dataMap.set(e.id, e);
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShopDemo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './VList.ts', './Res.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, NodeEventType, Sprite, Label, Component, VList, getCfg, Res;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      NodeEventType = module.NodeEventType;
      Sprite = module.Sprite;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      VList = module.VList;
    }, function (module) {
      getCfg = module.getCfg;
      Res = module.Res;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "acabdk+/SFOzoIKK3E2BccO", "ShopDemo", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ETaskType = exports('ETaskType', {
        BuyEquipment: 1,
        BuyProp: 2,
        BuyCoin: 3
      });
      var maxExp = 100;
      var fundItemNum = 20;
      var taskScoreRequire = [40, 70, 100, 130];
      var ShopDemo = exports('ShopDemo', (_dec = ccclass('ShopDemo'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShopDemo, _Component);
        function ShopDemo() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.gainReward = null;
          _initializerDefineProperty(_this, "tabs", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "panels", _descriptor2, _assertThisInitialized(_this));
          _this.curTabIdx = -1;
          _this.curTaskScore = 0;
          _this.curFundExp = 0;
          _this.taskListDatas = [];
          _this.fundListDatas = [];
          _this.scoreBoxDatas = [];
          _this.hasUnlockGreat = false;
          _this.shopListDatas = [];
          _this.v_scoreReward = void 0;
          _this.v_taskList = void 0;
          _this.v_fundList = void 0;
          return _this;
        }
        var _proto = ShopDemo.prototype;
        _proto.start = function start() {
          var _this2 = this;
          this.resetTaskDatas();
          this.resetFundDatas();
          this.resetShopDatas();
          this.v_scoreReward = this.panels[0].getChildByPath("rewards/v_scoreRewardList").getComponent(VList);
          this.initScoreBoxList(this.v_scoreReward);
          this.v_taskList = this.panels[0].getChildByPath("v_taskList").getComponent(VList);
          this.initTaskList(this.v_taskList);
          this.v_fundList = this.panels[1].getChildByPath("v_list").getComponent(VList);
          this.initFundList(this.v_fundList);
          this.initFundLevelList(this.panels[1].getChildByPath("v_list_level").getComponent(VList));
          this.initShopList(this.panels[2].getChildByPath("v_shopList").getComponent(VList));
          this.panels[1].getChildByPath("claimBtn").on(NodeEventType.TOUCH_END, this.onClaimFund, this);
          this.panels[1].getChildByPath("unlockBtn").on(NodeEventType.TOUCH_END, this.onUnlockGreat, this);
          this.panels[0].getChildByPath("reset").on(NodeEventType.TOUCH_END, function () {
            _this2.resetTaskDatas();
            _this2.refreshTaskPanel(_this2.panels[0]);
          });
          this.panels[1].getChildByPath("reset").on(NodeEventType.TOUCH_END, function () {
            _this2.resetFundDatas();
            _this2.refreshTaskPanel(_this2.panels[1]);
          });
          this.switchTab(0);
          this.tabs.forEach(function (e, i) {
            return e.on(NodeEventType.TOUCH_END, function () {
              return _this2.switchTab(i);
            });
          });
        }
        //#region  reset datas
        ;

        _proto.resetTaskDatas = function resetTaskDatas() {
          this.curTaskScore = 0;
          this.taskListDatas = [];
          for (var i = 0; i < 9; i++) {
            var stage = Math.floor(i / 3);
            this.taskListDatas.push({
              id: i,
              hasClaimed: false,
              cur: 0,
              taskType: [ETaskType.BuyCoin, ETaskType.BuyEquipment, ETaskType.BuyProp][i % 3],
              str: "\u5728\u5546\u5E97\u8D2D\u4E70" + (stage * 2 + 3) + "\u6B21" + ["金币", "装备", "道具"][i % 3],
              max: stage * 2 + 3,
              rewardSlots: [{
                type: 1,
                num: stage * 5 + 10
              }, {
                type: 2,
                num: stage * 5 + 10
              }, {
                type: 3,
                num: stage * 20 + 30
              }]
            });
          }
          this.scoreBoxDatas = [];
          for (var _i = 0; _i < 4; _i++) {
            var rewards = [];
            for (var j = 0; j < _i + 2; j++) rewards.push({
              type: 4,
              itemId: j + _i + 6,
              num: _i + 1
            });
            this.scoreBoxDatas.push({
              requireScore: taskScoreRequire[_i],
              hasClaimed: false,
              rewards: [{
                type: 2,
                num: 30
              }].concat(rewards)
            });
          }
        };
        _proto.resetFundDatas = function resetFundDatas() {
          this.curFundExp = 0;
          this.fundListDatas = [];
          for (var i = 0; i < fundItemNum; i++) {
            var propId = Math.floor(Math.random() * 6) + 7;
            this.fundListDatas.push({
              level: i + 1,
              commonSlots: [{
                type: 3,
                num: i % 5 == 0 ? 50 : 10,
                state: 1,
                hasLight: false
              }, {
                type: 4,
                itemId: propId,
                num: i % 5 == 0 ? 3 : 1,
                state: 1,
                hasLight: false
              }],
              greatSlots: [{
                type: 3,
                num: i % 5 == 0 ? 100 : 30,
                state: 0,
                hasLight: true
              }, {
                type: 4,
                itemId: propId,
                num: i % 5 == 0 ? 5 : 2,
                state: 0,
                hasLight: true
              }],
              claimState: 0
            });
          }
        };
        _proto.resetShopDatas = function resetShopDatas() {
          var coinGoodsDatas = [];
          for (var i = 0; i < 6; i++) {
            var price = [6, 18, 68, 128, 328, 648][i];
            coinGoodsDatas.push({
              price: price,
              priceType: 1,
              itemId: -1,
              title: ['一点金币', '一些金币', '一堆金币', '一大堆金币', '一大盒金币', '一大箱金币'][i],
              num: price * 10,
              type: 3,
              taskType: ETaskType.BuyCoin
            });
          }
          var equipmentGoodsDatas = [];
          for (var _i2 = 0; _i2 < 6; _i2++) {
            equipmentGoodsDatas.push({
              price: 2000,
              priceType: 0,
              itemId: _i2 + 1,
              title: getCfg(_i2 + 1).name,
              num: 1,
              type: 4,
              taskType: ETaskType.BuyEquipment
            });
          }
          var propGoodsDatas = [];
          for (var _i3 = 0; _i3 < 6; _i3++) {
            propGoodsDatas.push({
              price: 300,
              priceType: 0,
              itemId: _i3 + 7,
              title: getCfg(_i3 + 7).name,
              num: 5,
              type: 4,
              taskType: ETaskType.BuyProp
            });
          }
          this.shopListDatas = [{
            taskType: ETaskType.BuyEquipment,
            goodsData: equipmentGoodsDatas,
            shopTitle: "购买装备"
          }, {
            taskType: ETaskType.BuyProp,
            goodsData: propGoodsDatas,
            shopTitle: "购买道具"
          }, {
            taskType: ETaskType.BuyCoin,
            goodsData: coinGoodsDatas,
            shopTitle: "金币直充"
          }];
        }
        //#endregion
        //#region  全量刷新
        ;

        _proto.refreshTaskPanel = function refreshTaskPanel(panel) {
          var progress = 0;
          var last = 0;
          for (var i = 0; i < taskScoreRequire.length; i++) {
            if (this.curTaskScore >= taskScoreRequire[i]) progress += 1 / taskScoreRequire.length;else {
              progress += (this.curTaskScore - last) / (taskScoreRequire[i] - last) / taskScoreRequire.length;
              break;
            }
            last = taskScoreRequire[i];
          }
          panel.getChildByPath("rewards/progressBar").getComponent(Sprite).fillRange = progress;
          panel.getChildByPath("rewards/v_scoreRewardList").getComponent(VList).setData(this.scoreBoxDatas, true);
          panel.getChildByPath("rewards/curScore").getComponent(Label).string = this.curTaskScore.toFixed(0);
          this.v_taskList.getComponent(VList).setData(this.taskListDatas, true);
          this.sortTaskList();
        };
        _proto.sortTaskList = function sortTaskList() {
          this.v_taskList.sort(function (a, b) {
            var getOrder = function getOrder(t) {
              var order = 0;
              if (t.cur >= t.max && !t.hasClaimed) order -= 1000;else if (t.hasClaimed) order += 1000;
              order += t.id;
              return order;
            };
            return getOrder(a.data) - getOrder(b.data);
          });
        };
        _proto.refreshFundPanel = function refreshFundPanel(panel) {
          panel.getChildByPath("level/bar").getComponent(Sprite).fillRange = this.curFundExp % maxExp / 100;
          panel.getChildByPath("level/levelLbl").getComponent(Label).string = this.curFundLevel.toFixed();
          panel.getChildByPath("level/progressLbl").getComponent(Label).string = this.curFundExp % maxExp + "/" + maxExp;
          panel.getChildByPath("v_list").getComponent(VList).setData(this.fundListDatas);
          panel.getChildByPath("v_list_level").getComponent(VList).setData(new Array(fundItemNum).fill(null));
        };
        _proto.refreshMarketPanel = function refreshMarketPanel(panel) {
          panel.getChildByPath("v_shopList").getComponent(VList).setData(this.shopListDatas);
        }
        //#endregion
        //#region  VList init
        //如果在定义VList的时候就指定类型，则回调参数会隐形指定为对应的数据泛型
        ;

        _proto.initScoreBoxList = function initScoreBoxList(list) {
          var _this3 = this;
          list.init({
            onData: function onData(info) {
              info.get("_box", Sprite).spriteFrame = Res.Ins.boxes[Math.max(0, info.idx - 1)];
              info.getNode("_reddot").active = !info.data.hasClaimed && _this3.curTaskScore >= info.data.requireScore;
              info.getNode("_checked").active = info.data.hasClaimed;
              info.get("_require", Label).string = info.data.requireScore.toFixed(0);
            },
            onClick: function onClick(info) {
              if (!info.data.hasClaimed && _this3.curTaskScore >= info.data.requireScore) {
                info.data.hasClaimed = true;
                info.list.refreshItem(info.idx);
                _this3.gain(info.data.rewards);
              }
            }
          });
        };
        _proto.initTaskList = function initTaskList(list) {
          var _this4 = this;
          list.register("_claimBtn", NodeEventType.TOUCH_END, function (info) {
            _this4.onClickFinishTask(info.data);
          }, this);
          list.init({
            onInstantiate: function onInstantiate(info) {
              info.get("_v_rewardList", VList).init({
                onData: function onData(info2) {
                  var showInfo = Res.Ins.getItemShow(info2.data);
                  info2.get("_icon", Sprite).spriteFrame = showInfo.icon;
                  info2.get("_tag", Sprite).spriteFrame = showInfo.tag;
                  info2.getNode("_equiped").active = false;
                  info2.get("_numLbl", Label).string = info2.data.num.toFixed();
                  info2.getNode("_select").active = false;
                  info2.getNode("_banBg").active = false;
                }
              });
            },
            onData: function onData(info) {
              info.get("_v_rewardList", VList).setData(info.data.rewardSlots);
              info.get("_desc", Label).string = info.data.str;
              info.get("_progressLbl", Label).string = info.data.cur.toFixed() + "/" + info.data.max.toFixed();
              info.get("_bar", Sprite).fillRange = info.data.cur / info.data.max;
              var btn = info.get("_claimBtn", Sprite);
              btn.node.active = !info.data.hasClaimed;
              btn.grayscale = info.data.cur < info.data.max;
              info.getNode("_checked").active = info.data.hasClaimed;
            }
          });
        }
        //如果在定义VList的时候不指定类型，则在回调参数中手动指定参数类型也可以
        ;

        _proto.initFundList = function initFundList(list) {
          var _this5 = this;
          list.init({
            onInstantiate: function onInstantiate(info) {
              _this5.initFundSlotList(info.get("_v_commonList", VList));
              _this5.initFundSlotList(info.get("_v_greatList", VList));
            },
            onData: function onData(info) {
              _this5.refreshFundSlotDataState(info.data);
              info.get("_v_commonList", VList).setData(info.data.commonSlots);
              info.get("_v_greatList", VList).setData(info.data.greatSlots);
            }
          });
        };
        _proto.initFundSlotList = function initFundSlotList(list) {
          list.init({
            onData: function onData(info) {
              info.getNode("_light").active = info.data.hasLight;
              var showInfo = Res.Ins.getItemShow(info.data);
              info.get("_icon", Sprite).spriteFrame = showInfo.icon;
              info.get("_tag", Sprite).spriteFrame = showInfo.tag;
              info.get("_numLbl", Label).string = info.data.num.toFixed();
              info.getNode("_lock").active = info.data.state == 0;
              info.getNode("_reddot").active = info.data.state == 2;
              info.getNode("_checked").active = info.data.state == 3;
            }
          });
        };
        _proto.initFundLevelList = function initFundLevelList(list) {
          var _this6 = this;
          list.init({
            onData: function onData(info) {
              info.get("_lbl", Label).string = (info.idx + 1).toFixed();
              var level = info.idx + 1;
              var range = 0;
              if (_this6.curFundLevel < level - 1) range = 0;else if (_this6.curFundLevel >= level) range = 1;else range = _this6.curFundExp % maxExp / 100;
              info.get("_bar", Sprite).fillRange = range;
              info.getNode("_longBar").active = info.idx == 0;
            }
          });
        };
        _proto.initShopList = function initShopList(list) {
          var _this7 = this;
          list.init({
            onInstantiate: function onInstantiate(info) {
              _this7.initGoodsList(info.get("_v_goodsList", VList));
            },
            onData: function onData(info) {
              info.get("_v_goodsList", VList).setData(info.data.goodsData);
              info.get("_shopTitle", Label).string = info.data.shopTitle;
            }
          });
        };
        _proto.initGoodsList = function initGoodsList(list) {
          var _this8 = this;
          list.register("_buyBtn", NodeEventType.TOUCH_END, function (info) {
            _this8.onBuyGoods(info.data);
          });
          list.init({
            onData: function onData(info) {
              var showInfo = Res.Ins.getItemShow(info.data);
              info.get("_icon", Sprite).spriteFrame = showInfo.icon;
              info.get("_tag", Sprite).spriteFrame = showInfo.tag;
              info.get("_num", Label).string = "x" + info.data.num.toFixed();
              info.get("_name", Label).string = info.data.title;
              info.getNode("_priceIcon").active = info.data.priceType == 0;
              info.get("_priceLbl", Label).string = info.data.price.toFixed();
            }
          });
        }
        //#endregion

        //#region  operator
        ;

        _proto.switchTab = function switchTab(idx) {
          if (idx == this.curTabIdx) return;
          this.curTabIdx = idx;
          this.tabs.forEach(function (e, i) {
            return e.getChildByName("cover").active = i == idx;
          });
          this.panels.forEach(function (e, i) {
            return e.active = i == idx;
          });
          [this.refreshTaskPanel.bind(this), this.refreshFundPanel.bind(this), this.refreshMarketPanel.bind(this)][this.curTabIdx](this.panels[this.curTabIdx]);
          this.node.getChildByName("title").getComponent(Label).string = ["任务", "通行证", "商店"][this.curTabIdx];
        };
        _proto.onGainFundScore = function onGainFundScore(num) {
          this.curFundExp += num;
          if (this.curTabIdx == 1) {
            this.refreshFundPanel(this.panels[1]);
          }
        };
        _proto.onGainTaskScore = function onGainTaskScore(num) {
          this.curTaskScore += num;
          if (this.curTabIdx == 0) this.refreshTaskPanel(this.panels[0]);
        };
        _proto.onBuyGoods = function onBuyGoods(data) {
          this.gain([data]);
          var refreshFlag = this.curTabIdx == 0;
          this.v_taskList.infos.forEach(function (info) {
            var d = info.data;
            if (data.taskType == d.taskType) {
              d.cur++;
              refreshFlag && info.list.refreshItem(info.idx);
            }
          });
        };
        _proto.onClaimFund = function onClaimFund() {
          var _this9 = this;
          var fundInfos = this.v_fundList.infos.filter(function (e) {
            return e.data.level <= _this9.curFundLevel;
          });
          var rewards = [];
          var addReward = function addReward(r) {
            var target = rewards.find(function (e) {
              return e.type == r.type && (!e.itemId || e.itemId == r.itemId);
            });
            if (target && !(r.type == 4 && !getCfg(r.itemId).isProp)) {
              target.num += r.num;
            } else rewards.push(r);
          };
          fundInfos.forEach(function (e) {
            if (e.data.claimState < 1) {
              e.data.commonSlots.forEach(function (f) {
                return addReward(f);
              });
              e.data.claimState = 1;
            }
            if (e.data.claimState < 2 && _this9.hasUnlockGreat) {
              e.data.greatSlots.forEach(function (f) {
                return addReward(f);
              });
              e.data.claimState = 2;
            }
            _this9.refreshFundSlotDataState(e.data);
            e.list.refreshItem(e.idx);
          });
          if (rewards.length == 0) return;
          this.gain(rewards);
        };
        _proto.onUnlockGreat = function onUnlockGreat() {
          this.hasUnlockGreat = true;
          this.refreshFundPanel(this.panels[1]);
        };
        _proto.onClickFinishTask = function onClickFinishTask(data) {
          if (data.cur >= data.max && !data.hasClaimed) {
            this.gain(data.rewardSlots);
            data.hasClaimed = true;
            this.sortTaskList();
          }
        };
        _proto.refreshFundSlotDataState = function refreshFundSlotDataState(data) {
          var _this10 = this;
          data.commonSlots.forEach(function (e) {
            if (data.level > _this10.curFundLevel) e.state = 1;else if (data.claimState < 1) e.state = 2;else e.state = 3;
          });
          data.greatSlots.forEach(function (e) {
            if (!_this10.hasUnlockGreat) e.state = 0;else if (data.level > _this10.curFundLevel) e.state = 1;else if (data.claimState < 2) e.state = 2;else e.state = 3;
          });
        }
        //#endregion
        ;

        _proto.gain = function gain(rewards) {
          var taskScoreReward = rewards.find(function (e) {
            return e.type == 1;
          });
          if (taskScoreReward) this.onGainTaskScore(taskScoreReward.num);
          var fundScoreReward = rewards.find(function (e) {
            return e.type == 2;
          });
          if (fundScoreReward) this.onGainFundScore(fundScoreReward.num);
          this.gainReward.gain(rewards);
        };
        _createClass(ShopDemo, [{
          key: "curFundLevel",
          get: function get() {
            return Math.floor(this.curFundExp / 100);
          }
        }]);
        return ShopDemo;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "panels", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VList.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FixedScrollView.ts', './VListLayerCom.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, v3, v2, Enum, Prefab, Size, CCString, Node, Mask, Layout, UITransform, error, warn, NodeEventType, instantiate, Widget, clamp, Vec2, tween, CCObject, Rect, Component, UIRenderer, log, FixedScrollView, VListLayerCom;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      v3 = module.v3;
      v2 = module.v2;
      Enum = module.Enum;
      Prefab = module.Prefab;
      Size = module.Size;
      CCString = module.CCString;
      Node = module.Node;
      Mask = module.Mask;
      Layout = module.Layout;
      UITransform = module.UITransform;
      error = module.error;
      warn = module.warn;
      NodeEventType = module.NodeEventType;
      instantiate = module.instantiate;
      Widget = module.Widget;
      clamp = module.clamp;
      Vec2 = module.Vec2;
      tween = module.tween;
      CCObject = module.CCObject;
      Rect = module.Rect;
      Component = module.Component;
      UIRenderer = module.UIRenderer;
      log = module.log;
    }, function (module) {
      FixedScrollView = module.FixedScrollView;
    }, function (module) {
      VListLayerCom = module.VListLayerCom;
    }],
    execute: function () {
      exports({
        V2: V2,
        V3: V3
      });
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37;
      cclegacy._RF.push({}, "ef77dO21blFFqTAQGFOOe+F", "VList", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        executeInEditMode = _decorator.executeInEditMode;
      var VListEvent = exports('VListEvent', /*#__PURE__*/function (VListEvent) {
        VListEvent["OnScrolling"] = "scrolling";
        VListEvent["OnLayout"] = "layout";
        VListEvent["OnResize"] = "size-changed";
        VListEvent["OnTurnPage"] = "turn-page";
        VListEvent["OnFinishPage"] = "finish-page";
        return VListEvent;
      }({}));
      function V3(v, z) {
        if (z === void 0) {
          z = 0;
        }
        return v3(v.x, v.y, z);
      }
      function V2(v) {
        return v2(v.x, v.y);
      }
      var RecycleNodeName = "v_recycle";
      var ScrollNodeName = "v_scrollView";
      var ContentNodeName = "v_content";
      var PageNodeName = "v_page";
      var ViewNodeName = "v_view";
      var ItemRectNodeName = "v_itemRect";

      /**滑动的目标位置（方位或索引） */

      /**列表实时布局信息 */

      /**列表数据单位 */

      var EListType = exports('EListType', /*#__PURE__*/function (EListType) {
        EListType[EListType["Layout"] = 0] = "Layout";
        EListType[EListType["ScrollList"] = 1] = "ScrollList";
        EListType[EListType["Page"] = 2] = "Page";
        return EListType;
      }({}));
      var EAlignType_Hor = exports('EAlignType_Hor', /*#__PURE__*/function (EAlignType_Hor) {
        EAlignType_Hor[EAlignType_Hor["Center"] = 0] = "Center";
        EAlignType_Hor[EAlignType_Hor["Left"] = 1] = "Left";
        EAlignType_Hor[EAlignType_Hor["Right"] = 2] = "Right";
        return EAlignType_Hor;
      }({}));
      var EAlignType_Ver = exports('EAlignType_Ver', /*#__PURE__*/function (EAlignType_Ver) {
        EAlignType_Ver[EAlignType_Ver["Center"] = 0] = "Center";
        EAlignType_Ver[EAlignType_Ver["Top"] = 1] = "Top";
        EAlignType_Ver[EAlignType_Ver["Bottom"] = 2] = "Bottom";
        return EAlignType_Ver;
      }({}));
      var EDir = exports('EDir', /*#__PURE__*/function (EDir) {
        EDir[EDir["Horizontal"] = 0] = "Horizontal";
        EDir[EDir["Vertical"] = 1] = "Vertical";
        return EDir;
      }({}));
      var EScrollDir = exports('EScrollDir', /*#__PURE__*/function (EScrollDir) {
        EScrollDir[EScrollDir["Horizontal"] = 1] = "Horizontal";
        EScrollDir[EScrollDir["Vertical"] = 2] = "Vertical";
        EScrollDir[EScrollDir["Both"] = 3] = "Both";
        return EScrollDir;
      }({}));
      var EStrechType = exports('EStrechType', /*#__PURE__*/function (EStrechType) {
        EStrechType[EStrechType["Fixed"] = 0] = "Fixed";
        EStrechType[EStrechType["ExpandFixed"] = 1] = "ExpandFixed";
        EStrechType[EStrechType["Clamp"] = 2] = "Clamp";
        EStrechType[EStrechType["Expand"] = 3] = "Expand";
        EStrechType[EStrechType["Overflow"] = 4] = "Overflow";
        return EStrechType;
      }({}));
      var VList = exports('VList', (_dec = ccclass('VList'), _dec2 = property({
        type: Enum(EListType)
      }), _dec3 = property({
        displayName: "列表类型",
        type: Enum(EListType)
      }), _dec4 = property({
        type: Enum(EScrollDir)
      }), _dec5 = property({
        displayName: "滚动方向",
        type: Enum(EScrollDir),
        visible: function visible() {
          return this.listType != EListType.Layout;
        }
      }), _dec6 = property({
        displayName: "反转渲染层级"
      }), _dec7 = property({
        displayName: "是否分层渲染（运行时生效）"
      }), _dec8 = property({
        displayName: "预览数量",
        step: 1,
        min: 0
      }), _dec9 = property(Prefab), _dec10 = property({
        displayName: "列表项预制体",
        type: Prefab,
        group: {
          name: "列表项",
          style: "tab",
          id: '0'
        }
      }), _dec11 = property({
        displayName: "列表项尺寸",
        type: Size,
        group: {
          name: "列表项",
          style: "tab",
          id: '0'
        }
      }), _dec12 = property({
        displayName: "列表项组件前缀",
        group: {
          name: "列表项",
          style: "tab",
          id: '0'
        }
      }), _dec13 = property({
        displayName: "刷新列表项组件",
        visible: function visible() {
          return !!this.itemPrefab;
        },
        group: {
          name: "列表项",
          style: "tab",
          id: '0'
        }
      }), _dec14 = property({
        readonly: true,
        displayName: "列表项组件全览",
        group: {
          name: "列表项",
          style: "tab",
          id: '0'
        },
        visible: function visible() {
          return this.itemPrefab != null;
        },
        type: CCString
      }), _dec15 = property({
        visible: function visible() {
          return false;
        },
        type: CCString
      }), _dec16 = property({
        visible: function visible() {
          return false;
        },
        type: CCString
      }), _dec17 = property(Node), _dec18 = property({
        displayName: "关联列表",
        type: Node,
        group: {
          name: "滚动关联",
          style: "tab",
          id: '0'
        },
        visible: function visible() {
          return this.listType != EListType.Layout;
        }
      }), _dec19 = property({
        displayName: "统一关联尺寸",
        group: {
          name: "滚动关联",
          style: "tab",
          id: '0'
        },
        visible: function visible() {
          return this.listType != EListType.Layout;
        }
      }), _dec20 = property({
        displayName: "滚动关联",
        group: {
          name: "滚动关联",
          style: "tab",
          id: '0'
        },
        visible: function visible() {
          return this.listType == EListType.Layout;
        }
      }), _dec21 = property({
        displayName: "允许滑动翻页",
        group: {
          name: "页面参数",
          style: "tab",
          id: '0'
        },
        visible: function visible() {
          return this.listType == EListType.Page;
        }
      }), _dec22 = property({
        displayName: "页面吸附时间（秒）",
        group: {
          name: "页面参数",
          style: "tab",
          id: '0'
        },
        visible: function visible() {
          return this._listType == EListType.Page && this.allowScrollPage;
        }
      }), _dec23 = property({
        displayName: "翻页速度阈值",
        group: {
          name: "页面参数",
          style: "tab",
          id: '0'
        },
        visible: function visible() {
          return this._listType == EListType.Page && this.allowScrollPage;
        }
      }), _dec24 = property({
        displayName: "翻页滚动阈值",
        group: {
          name: "页面参数",
          style: "tab",
          id: '0'
        },
        visible: function visible() {
          return this._listType == EListType.Page && this.allowScrollPage;
        },
        min: 0,
        max: 1,
        step: 0.1,
        slide: true
      }), _dec25 = property({
        displayName: "贴合页面尺寸",
        group: {
          name: "页面参数",
          style: "tab",
          id: '0'
        },
        visible: function visible() {
          return this._listType == EListType.Page;
        }
      }), _dec26 = property({
        displayName: "单页铺满",
        group: {
          name: "页面参数",
          style: "tab",
          id: '0'
        }
      }), _dec27 = property({
        displayName: "页面参数",
        group: {
          name: "页面参数",
          style: "tab",
          id: '0'
        },
        visible: function visible() {
          return this._listType != EListType.Page;
        }
      }), _dec28 = property({
        displayName: "提示",
        visible: function visible() {
          return this.listType == EListType.Page;
        },
        group: {
          name: "边缘留白",
          style: "tab",
          id: "1"
        }
      }), _dec29 = property({
        displayName: "上边留白",
        visible: function visible() {
          return this.listType != EListType.Page;
        },
        group: {
          name: "边缘留白",
          style: "tab",
          id: '1'
        }
      }), _dec30 = property({
        displayName: "左边留白",
        visible: function visible() {
          return this.listType != EListType.Page;
        },
        group: {
          name: "边缘留白",
          style: "tab",
          id: '1'
        }
      }), _dec31 = property({
        displayName: "下边留白",
        visible: function visible() {
          return this.listType != EListType.Page;
        },
        group: {
          name: "边缘留白",
          style: "tab",
          id: '1'
        }
      }), _dec32 = property({
        displayName: "右边留白",
        visible: function visible() {
          return this.listType != EListType.Page;
        },
        group: {
          name: "边缘留白",
          style: "tab",
          id: '1'
        }
      }), _dec33 = property({
        displayName: "水平伸展模式",
        type: Enum(EStrechType),
        group: {
          name: "伸展",
          style: "tab",
          id: '1'
        }
      }), _dec34 = property({
        displayName: "垂直伸展模式",
        type: Enum(EStrechType),
        group: {
          name: "伸展",
          style: "tab",
          id: '1'
        }
      }), _dec35 = property({
        displayName: "水平间距",
        type: CCString,
        visible: function visible() {
          return this.strech_hor == EStrechType.ExpandFixed;
        },
        group: {
          name: "伸展",
          style: "tab",
          id: '1'
        }
      }), _dec36 = property({
        displayName: "垂直间距",
        type: CCString,
        visible: function visible() {
          return this.strech_ver == EStrechType.ExpandFixed;
        },
        group: {
          name: "伸展",
          style: "tab",
          id: '1'
        }
      }), _dec37 = property({
        displayName: "水平间距",
        visible: function visible() {
          return this.strech_hor != EStrechType.Expand && this.strech_hor != EStrechType.ExpandFixed;
        },
        group: {
          name: "伸展",
          style: "tab",
          id: '1'
        }
      }), _dec38 = property({
        displayName: "垂直间距",
        visible: function visible() {
          return this.strech_ver != EStrechType.Expand && this.strech_ver != EStrechType.ExpandFixed;
        },
        group: {
          name: "伸展",
          style: "tab",
          id: '1'
        }
      }), _dec39 = property({
        displayName: "水平最小间距",
        visible: function visible() {
          return this.strech_hor == EStrechType.Expand;
        },
        group: {
          name: "伸展",
          style: "tab",
          id: '1'
        }
      }), _dec40 = property({
        displayName: "垂直最小间距",
        visible: function visible() {
          return this.strech_ver == EStrechType.Expand;
        },
        group: {
          name: "伸展",
          style: "tab",
          id: '1'
        }
      }), _dec41 = property({
        displayName: "布局方向",
        type: Enum(EDir),
        group: {
          name: "对齐",
          style: "tab",
          id: '1'
        }
      }), _dec42 = property({
        displayName: "水平对齐",
        type: CCString,
        visible: function visible() {
          return this.listType == EListType.ScrollList && !!(this.scrollDir & 1);
        },
        group: {
          name: "对齐",
          style: "tab",
          id: '1'
        }
      }), _dec43 = property({
        displayName: "水平对齐",
        type: Enum(EAlignType_Hor),
        visible: function visible() {
          return !(this.listType == EListType.ScrollList && this.scrollDir & 1);
        },
        group: {
          name: "对齐",
          style: "tab",
          id: '1'
        }
      }), _dec44 = property({
        displayName: "末行对齐",
        visible: function visible() {
          return !(this.listType == EListType.ScrollList && this.scrollDir & 1) && this.layoutDir == EDir.Horizontal;
        },
        group: {
          name: "对齐",
          style: "tab",
          id: '1'
        }
      }), _dec45 = property({
        displayName: "垂直对齐",
        type: CCString,
        visible: function visible() {
          return this.listType == EListType.ScrollList && !!(this.scrollDir & 2);
        },
        group: {
          name: "对齐",
          style: "tab",
          id: '1'
        }
      }), _dec46 = property({
        displayName: "垂直对齐",
        type: Enum(EAlignType_Ver),
        visible: function visible() {
          return !(this.listType == EListType.ScrollList && this.scrollDir & 2);
        },
        group: {
          name: "对齐",
          style: "tab",
          id: '1'
        }
      }), _dec47 = property({
        displayName: "末列对齐",
        visible: function visible() {
          return !(this.listType == EListType.ScrollList && this.scrollDir & 1) && this.layoutDir == EDir.Vertical;
        },
        group: {
          name: "对齐",
          style: "tab",
          id: '1'
        }
      }), _dec48 = property({
        displayName: "行数",
        step: 1,
        min: 1,
        visible: function visible() {
          return this.strech_ver == EStrechType.Fixed || this.strech_ver == EStrechType.ExpandFixed;
        },
        group: {
          name: "伸展",
          style: "tab",
          id: '1'
        }
      }), _dec49 = property({
        displayName: "列数",
        step: 1,
        min: 1,
        visible: function visible() {
          return this.strech_hor == EStrechType.Fixed || this.strech_hor == EStrechType.ExpandFixed;
        },
        group: {
          name: "伸展",
          style: "tab",
          id: '1'
        }
      }), _dec50 = property({
        group: {
          name: "【Readonly】List Info",
          style: "section"
        },
        readonly: true,
        displayName: "滚动偏移"
      }), _dec51 = property({
        group: {
          name: "【Readonly】List Info",
          style: "section"
        },
        displayName: "实际列数"
      }), _dec52 = property({
        group: {
          name: "【Readonly】List Info",
          style: "section"
        },
        displayName: "实际行数"
      }), _dec53 = property({
        group: {
          name: "【Readonly】List Info",
          style: "section"
        },
        displayName: "实际水平间隔"
      }), _dec54 = property({
        group: {
          name: "【Readonly】List Info",
          style: "section"
        },
        displayName: "实际垂直间隔"
      }), _dec55 = property({
        group: {
          name: "【Readonly】List Info",
          style: "section"
        },
        displayName: "列表项包围盒大小"
      }), _dec56 = property({
        type: Node,
        group: {
          name: "【Readonly】Node Reference ",
          style: "section"
        },
        readonly: true
      }), _dec57 = property({
        type: Node,
        group: {
          name: "【Readonly】Node Reference ",
          style: "section"
        },
        readonly: true
      }), _dec58 = property({
        type: Node,
        group: {
          name: "【Readonly】Node Reference ",
          style: "section"
        },
        readonly: true
      }), _dec59 = property({
        type: Node,
        group: {
          name: "【Readonly】Node Reference ",
          style: "section"
        },
        readonly: true
      }), _dec(_class = executeInEditMode(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(VList, _Component);
        function VList() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          //#region  vlist args
          _initializerDefineProperty(_this, "_listType", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_scrollDir", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_isRevertSiblingOrder", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isRenderByLayer", _descriptor4, _assertThisInitialized(_this));
          /**分层渲染所需要忽略的节点组件 */
          _this.ignoreComList = [Mask, Layout, VListLayerCom, VList];
          // @property({ group: { name: "Layout Info", style: "section" } })
          _initializerDefineProperty(_this, "_preItemNum", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_itemPrefab", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_comPrefix", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "comShowList", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "comKeyList", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "comPathList", _descriptor10, _assertThisInitialized(_this));
          /**当此列表的滚动组件滑动时，所有关联的列表组件将同步滑动进度 */
          _initializerDefineProperty(_this, "_relativeList", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_allowScrollPage", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "snapTime", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "turnSpeedThreshold", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scrollThreshold", _descriptor15, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_fullPage", _descriptor16, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_padding_top", _descriptor17, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_padding_left", _descriptor18, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_padding_bottom", _descriptor19, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_padding_right", _descriptor20, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_strech_hor", _descriptor21, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_strech_ver", _descriptor22, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_space_x", _descriptor23, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_space_y", _descriptor24, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_space_min_x", _descriptor25, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_space_min_y", _descriptor26, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_layoutDir", _descriptor27, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_alignType_hor", _descriptor28, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_isAlignChild_hor", _descriptor29, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_alignType_ver", _descriptor30, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_isAlignChild_ver", _descriptor31, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_row", _descriptor32, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "_col", _descriptor33, _assertThisInitialized(_this));
          _this._layoutInfo = {
            col: 1,
            row: 1,
            size: new Size(1, 1),
            boundSize: new Size(1, 1),
            spaceX: 0,
            spaceY: 0,
            num: 0
          };
          _this._trans = void 0;
          //锚点为(0,1)
          _initializerDefineProperty(_this, "content", _descriptor34, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "view", _descriptor35, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "recycleFolder", _descriptor36, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scrollRect", _descriptor37, _assertThisInitialized(_this));
          //#endregion
          //#region runtime args
          //分层时的节点，仅开启分层渲染有用，value中的child包括key所指的child
          _this.itemChildMap = new Map();
          _this.layerMap = new Map();
          _this.delayFuncsMap = new Map();
          _this.relativeListCom = [];
          _this.executeLock = false;
          //防止在foreach的时候更改数组
          _this._infos = [];
          _this.nodePools = [];
          _this.registerInfos = [];
          _this.cb = {};
          _this.isInited = false;
          _this._pageIdx = 0;
          _this.isInFocus = false;
          _this.focusTwn = null;
          _this.hasInitRegister = false;
          _this.scrollVelocity = v2();
          _this.lastContentOffset = v2();
          _this.exeCache = [];
          _this.startCrd = v2();
          return _this;
        }
        var _proto = VList.prototype;
        _proto.onChangeParams = function onChangeParams() {
          var _this2 = this;
          this.refreshStruct();
          {
            if (this.infos) {
              this.updateLayout(this.infos.length);
              this.infos.forEach(function (e) {
                return _this2.refreshNodeTrans(e);
              });
              this.alignContentPos();
              this.refreshView();
            }
          }
        };
        //#endregion
        _proto.refreshItemCom = function refreshItemCom() {
          var _this3 = this;
          var trans = this.itemPrefab.data.getComponent(UITransform);
          if (!trans) error("itemPrefab没有UITransform组件！");else if (trans.anchorPoint.x != 0.5 || trans.anchorPoint.y != 0.5) {
            warn("itemPrefab的anchorPoint不在中心！");
          }
          if (this.listType == EListType.Page && this.content) {
            this.content.parent.getComponent(UITransform).setContentSize(this.itemSize);
          }
          var node = this.itemPrefab.data;
          this.comKeyList = [];
          this.comPathList = [];
          this.comShowList = [];
          var subLists = [];
          var scan = function scan(n, path) {
            if (path === void 0) {
              path = "";
            }
            var subList = n.getComponent(VList);
            if (!subList) for (var i = 0; i < n.children.length; i++) {
              var c = n.children[i];
              if (c.name.startsWith(_this3.comPrefix)) {
                var renderCom = c.getComponent(UIRenderer);
                if (renderCom) _this3.comShowList.push("" + renderCom.name);else _this3.comShowList.push(c.name + "<Node>");
                _this3.comKeyList.push(c.name);
                _this3.comPathList.push("" + path + c.name);
              }
              scan(c, "" + path + c.name + "/");
            } else if (subList.itemPrefab) {
              subLists.push(subList);
              subList.refreshItemCom();
            }
          };
          scan(node);
          var _loop = function _loop() {
            var _this3$comShowList;
            var list = subLists.shift();
            (_this3$comShowList = _this3.comShowList).push.apply(_this3$comShowList, list.comShowList.map(function (e) {
              return list.node.name + " / " + e;
            }));
          };
          while (subLists.length > 0) {
            _loop();
          }
        };
        _proto.lp2wp = function lp2wp(lp) {
          return this.content.getComponent(UITransform).convertToWorldSpaceAR(lp);
        };
        _proto.wp2lp = function wp2lp(wp) {
          return this.content.getComponent(UITransform).convertToNodeSpaceAR(wp);
        };
        _proto.onInitRegister = function onInitRegister() {
          this.node.on(NodeEventType.SIZE_CHANGED, this.onChangeParams, this);
          if (this.scrollRect && this.scrollRect.isValid) {
            this.scrollRect.on(FixedScrollView.EventType.SCROLLING, this.onScrolling, this);
            this.scrollRect.on(FixedScrollView.EventType.SCROLL_BEGAN, this.onScrollStart, this);
            this.scrollRect.on(FixedScrollView.EventType.TOUCH_UP, this.onScrollEnd, this);
            this.scrollRect.on(FixedScrollView.FINISH_AUTO_SCROLL, this.onScrollFinish, this);
          }
        };
        _proto.onScrolling = function onScrolling() {
          this.refreshView();
          for (var i = 0; i < this.relativeListCom.length; i++) {
            var scrollCom = this.relativeListCom[i].scrollRect.getComponent(FixedScrollView);
            scrollCom.scrollTo(this.scrollRect.getComponent(FixedScrollView).scrollAnchor);
            this.relativeListCom[i].refreshView();
          }
          this.node.emit(VListEvent.OnScrolling);
        };
        _proto.onScrollFinish = function onScrollFinish() {
          if (this.listType == EListType.Page) {
            var idx = this.getFocus();
            var posInfo = this.getPosInfo(idx).center;
            this.content.position = v3(-posInfo.x, -posInfo.y, 0);
          }
        };
        _proto.clearPool = function clearPool() {
          if (this.recycleFolder && this.recycleFolder.isValid) [].concat(this.recycleFolder.children).forEach(function (e) {
            return e.destroy();
          });
          this.nodePools = [];
        };
        _proto.clearAll = function clearAll() {
          this.clearList();
          this.itemChildMap.clear();
          this.clearPool();
          this.registerInfos = [];
          this.cb = {};
        };
        _proto.clearList = function clearList() {
          this.recycleAll();
          this._infos = [];
          this.delayFuncsMap.clear();
        };
        _proto.init = function init(itemCallback) {
          var _this4 = this;
          this.isInited = true;
          this.cb = itemCallback;
          [].concat(this.content.children).forEach(function (e) {
            return (e.name += "XXX") && e.destroy();
          });
          if (this.isRenderByLayer && this.itemPrefab) {
            this.layerMap.clear();
            var root = this.itemPrefab.data;
            var scan = function scan(n, path) {
              if (path === void 0) {
                path = "";
              }
              var curPath = "" + path + n.name;
              var node = new Node(curPath);
              node.setParent(_this4.content);
              node.position = root.getComponent(UITransform).convertToNodeSpaceAR(n.getComponent(UITransform).convertToWorldSpaceAR(v3()));
              _this4.layerMap.set(curPath, node);
              if (!n.getComponent(VList)) if (!_this4.ignoreComList.some(function (m) {
                return n.getComponent(m);
              })) for (var i = 0; i < n.children.length; i++) {
                var c = n.children[i];
                scan(c, curPath + "-");
              }
            };
            scan(root);
          }
          this.relativeListCom = this.relativeList.map(function (e) {
            return !!e ? e.getComponent(VList) : null;
          }).filter(function (e) {
            return e && !!e.scrollRect;
          });
          this.isInited = true;
        };
        _proto.getInfoByData = function getInfoByData(data, idx) {
          var _this5 = this;
          var info = {
            idx: idx,
            data: data,
            node: null,
            funcs: [],
            isInLayout: true,
            get: null,
            getNode: null,
            call: null,
            isVisible: false,
            list: this
          };
          info.get = function (key, ctor) {
            return _this5.getItemComByKey(info.node, key, ctor);
          };
          info.getNode = function (key) {
            return _this5.getItemComByKey(info.node, key, null);
          };
          info.call = function (cb, onlyNow) {
            if (onlyNow === void 0) {
              onlyNow = true;
            }
            if (onlyNow) {
              if (info.isVisible && info.node) cb(info);
              return;
            }
            _this5.delayFuncsMap.get(info).push(cb);
          };
          this.delayFuncsMap.set(info, []);
          return info;
        };
        _proto.sort = function sort(compare) {
          var _this6 = this;
          this.infos.sort(compare).forEach(function (e, i) {
            e.idx = i;
            _this6.refreshNodeTrans(e);
          });
        };
        _proto.setData = function setData(datas, ignoreReset) {
          var _this7 = this;
          if (ignoreReset === void 0) {
            ignoreReset = false;
          }
          if (!this.isInited) {
            error("\u5217\u8868" + this.node.name + "\u6CA1\u6709\u521D\u59CB\u5316\uFF01\u8BF7\u5148\u8C03\u7528init\u51FD\u6570\uFF01");
            return;
          }
          if (!datas) return;
          this.refreshStruct();
          var exeFunc = function exeFunc() {
            _this7.infos.forEach(function (e) {
              _this7.recycleNode(e);
              _this7.delayFuncsMap["delete"](e);
            });
            _this7._infos = datas.map(function (e, i) {
              return _this7.getInfoByData(e, i);
            });
            _this7.updateLayout(datas.length);
            _this7.alignContentPos();
            if (!ignoreReset) _this7.resetScrollPos();
            _this7.refreshView();
            var location = _this7.getLocation();
            if (_this7.scrollDir != EScrollDir.Both) _this7._pageIdx = _this7.scrollDir == EScrollDir.Horizontal ? location.x : location.y;
          };
          if (this.executeLock) {
            this.waitExecute(exeFunc);
          } else {
            exeFunc();
          }
        };
        _proto.addData = function addData(data, insertIdx) {
          var _this8 = this;
          if (insertIdx === void 0) {
            insertIdx = null;
          }
          var exeFunc = function exeFunc() {
            var cnt = _this8.infos.length;
            if (insertIdx === null || insertIdx >= cnt) {
              var newInfo = _this8.getInfoByData(data, cnt);
              _this8.infos.push(newInfo);
            } else {
              if (insertIdx < 0) insertIdx = 0;
              var _newInfo = _this8.getInfoByData(data, insertIdx);
              var after = _this8.infos.slice(insertIdx);
              var before = _this8.infos.splice(insertIdx);
              _this8._infos = before.concat(_newInfo).concat(after);
            }
            _this8.infos.forEach(function (e, i) {
              e.idx = i;
            });
            _this8.updateLayout(_this8.infos.length);
            _this8.infos.forEach(function (e) {
              return _this8.refreshNodeTrans(e);
            });
            _this8.alignContentPos();
            _this8.refreshView();
          };
          if (this.executeLock) {
            this.waitExecute(exeFunc);
          } else {
            exeFunc();
          }
        };
        _proto.deleteData = function deleteData(data) {
          var idx = this.infos.findIndex(function (e) {
            return e.data == data;
          });
          if (idx < 0) return;
          this.deleteIdx(idx);
        };
        _proto.deleteIdx = function deleteIdx(idx) {
          var _this9 = this;
          if (idx < 0 || idx >= this.infos.length) return;
          var exeFunc = function exeFunc() {
            var info = _this9.infos[idx];
            _this9.recycleNode(info);
            _this9.delayFuncsMap["delete"](info);
            _this9.infos.splice(idx, 1);
            _this9.infos.forEach(function (e, i) {
              e.idx = i;
            });
            _this9.updateLayout(_this9.infos.length);
            _this9.infos.forEach(function (e) {
              return _this9.refreshNodeTrans(e);
            });
            _this9.alignContentPos();
            _this9.refreshView();
          };
          if (this.executeLock) {
            this.waitExecute(exeFunc);
          } else {
            exeFunc();
          }
        };
        _proto.exePromise = function exePromise() {
          var _this10 = this;
          return new Promise(function (resolve) {
            if (!_this10.executeLock) resolve();else _this10.waitExecute(resolve);
          });
        };
        _proto.refreshItem = function refreshItem(idx, onlyNow) {
          var _this11 = this;
          if (onlyNow === void 0) {
            onlyNow = true;
          }
          if (!this.infos || idx < 0 || idx >= this.infos.length) return;
          if (onlyNow) {
            if (this.infos[idx].isVisible) this.cb.onData && this.cb.onData(this.infos[idx]);
          } else {
            this.delayFuncsMap.get(this.infos[idx]).push(function (f) {
              return _this11.cb.onData && _this11.cb.onData(f);
            });
          }
        };
        _proto.register = function register(key, nodeEvent, func, target) {
          var _this12 = this;
          var uniKey = "this/" + key + "_" + nodeEvent;
          var registerInfo = {
            uniKey: uniKey,
            evtId: nodeEvent,
            callback: func.bind(target),
            key: key
          };
          this.registerInfos.push(registerInfo);
          this.infos.forEach(function (e) {
            return _this12.registerNodeEvt(e, registerInfo);
          });
        };
        _proto.unregister = function unregister(key, nodeEvent) {
          var _this13 = this;
          var uniKey = "this/" + key + "_" + nodeEvent;
          var index = this.registerInfos.findIndex(function (e) {
            return e.uniKey == uniKey;
          });
          if (index < 0) return;
          var registerInfo = this.registerInfos[index];
          this.infos.forEach(function (e) {
            return _this13.unregisterNodeEvt(e, registerInfo);
          });
          this.registerInfos.splice(index, 1);
        };
        _proto.registerNodeEvt = function registerNodeEvt(info, registerInfo) {
          if (!info.node) return;
          var node = registerInfo.key == "" ? info.node : this.getItemComByKey(info.node, registerInfo.key, null);
          var cb = node["custom_event_" + registerInfo.uniKey] = function () {
            return registerInfo.callback(info);
          };
          node.on(registerInfo.evtId, cb, this);
        };
        _proto.unregisterNodeEvt = function unregisterNodeEvt(info, registerInfo) {
          if (!info.node) return;
          var node = registerInfo.key == "" ? info.node : this.getItemComByKey(info.node, registerInfo.key, null);
          node.off(registerInfo.evtId, node["custom_event_" + registerInfo.uniKey], this);
        };
        _proto.getChildByPath = function getChildByPath(node, path) {
          var _this14 = this;
          if (!this.isRenderByLayer) return node.getChildByPath(path);else {
            var children = this.itemChildMap.get(node);
            if (!children) return null;
            var childInfo = children.find(function (e) {
              return e.path == _this14.rootLayer.name + "/" + path;
            });
            if (!childInfo) {
              error(this.node.name + "\u627E\u4E0D\u5230\u5B50\u9879\u8DEF\u5F84" + path + "\uFF0C\u8BF7\u5C1D\u8BD5\u5237\u65B0\u5217\u8868\u9879\u7EC4\u4EF6\uFF01");
              return null;
            }
            return childInfo.child;
          }
        };
        _proto.getItemComByKey = function getItemComByKey(node, key, comType) {
          if (!node) return null;
          var pathIdx = this.comKeyList.findIndex(function (e) {
            return e == key;
          });
          if (pathIdx < 0) {
            error("\u5728\u5217\u8868" + this.node.name + "\u7684\u5217\u8868\u9879" + this.itemPrefab.name + "\u4E2D\u627E\u4E0D\u5230\u5B50\u8282\u70B9" + key + "\uFF0C\u8BF7\u68C0\u67E5\u9884\u5236\u4F53\u6216\u5C1D\u8BD5\u5237\u65B0\u5217\u8868\u9879\u7EC4\u4EF6!");
            return null;
          }
          var path = this.comPathList[pathIdx];
          var targetNode = this.getChildByPath(node, path);
          if (comType == null) return targetNode;else {
            var com = targetNode.getComponent(comType);
            if (!com) {
              error("\u5728\u5217\u8868" + this.node.name + "\u7684\u5217\u8868\u9879" + this.itemPrefab.name + "\u4E2D" + path + "\u6CA1\u6709" + comType.name + "\u7EC4\u4EF6");
              return null;
            }
            return com;
          }
        };
        _proto.refreshNodeTrans = function refreshNodeTrans(info) {
          var _this15 = this;
          if (!info.node || !info.isVisible || !info.isInLayout) return;
          var pos = V3(this.getPosInfo(info.idx).center);
          if (!this.isRenderByLayer) {
            info.node.position = pos;
          } else {
            var children = this.itemChildMap.get(info.node);
            children.forEach(function (e) {
              if (e.skipParent) return;
              e.child.setParent(_this15.layerMap.get(e.path.replace(/\//g, "-")));
              e.child.position = pos;
              if (_this15.listType == EListType.Page && _this15.fullPage) e.child.getComponent(UITransform).setContentSize(new Size(_this15.trans.contentSize.x, _this15.trans.contentSize.y));
            });
          }
        };
        _proto.setNode = function setNode(info) {
          var _this16 = this;
          if (!this.content) {
            console.error("没有content节点");
            return;
          }
          if (!this.isRenderByLayer) {
            if (this.nodePools.length > 0) {
              var newNode = this.nodePools.pop();
              newNode.setParent(this.content);
              info.node = newNode;
            } else {
              info.node = instantiate(this.itemPrefab);
              info.node.setParent(this.content);
              this.delayFuncsMap.get(info).push(function (f) {
                return _this16.cb.onInstantiate && _this16.cb.onInstantiate(f);
              });
            }
          } else {
            if (this.nodePools.length > 0) {
              var _newNode = this.nodePools.pop();
              var children = this.itemChildMap.get(_newNode);
              children.forEach(function (e) {
                if (e.skipParent) return;
                e.child.setParent(_this16.layerMap.get(e.path.replace(/\//g, "-")));
              });
              info.node = _newNode;
            } else {
              var node = instantiate(this.itemPrefab);
              var childrenData = [];
              this.itemChildMap.set(node, childrenData);
              var scan = function scan(n, path, isSkipParent) {
                if (path === void 0) {
                  path = "";
                }
                var curPath = "" + path + n.name;
                childrenData.push({
                  child: n,
                  path: curPath,
                  skipParent: isSkipParent
                });
                var childSkipParent = isSkipParent || _this16.ignoreComList.some(function (m) {
                  return n.getComponent(m);
                });
                if (!n.getComponent(VList)) for (var i = 0; i < n.children.length; i++) {
                  var c = n.children[i];
                  scan(c, curPath + "/", childSkipParent);
                }
              };
              scan(node, "", false);
              childrenData.forEach(function (d) {
                if (d.skipParent) return;
                var n = d.child;
                var p = d.path;
                var wgt = n.getComponent(Widget);
                if (wgt) wgt.enabled = false;
                n.setParent(_this16.layerMap.get(p.replace(/\//g, "-")));
              });
              info.node = node;
              this.delayFuncsMap.get(info).push(function (f) {
                return _this16.cb.onInstantiate && _this16.cb.onInstantiate(f);
              });
            }
          }
          info.node['custom_event_onClick'] = function () {
            return _this16.cb.onClick && _this16.cb.onClick(info);
          };
          info.node.on(Node.EventType.TOUCH_END, info.node['custom_event_onClick'], this);
          this.registerInfos.forEach(function (e) {
            return _this16.registerNodeEvt(info, e);
          });
          this.refreshNodeTrans(info);
        };
        _proto.idx2crd = function idx2crd(idx) {
          idx = clamp(idx, 0, this.infos.length - 1);
          if (this.layoutDir == EDir.Vertical) return v2(Math.floor(idx / this.realRow), idx % this.realRow);else return v2(Math.floor(idx / this.realCol), idx % this.realCol);
        };
        _proto.crd2idx = function crd2idx(crd) {
          var c = clamp(crd.x, 0, this.realCol - 1);
          var r = clamp(crd.y, 0, this.realRow - 1);
          if (this.layoutDir == EDir.Vertical) return c * this.realRow + r;else return r * this.realCol + c;
        };
        _proto.getVec = function getVec() {
          var layout = this.layoutInfo;
          var unitSize = v2(this.itemSize.x + layout.spaceX, this.itemSize.y + layout.spaceY);
          var curCrd = v2((-this.contentOffset.x - this.realPaddingLeft) / unitSize.x, (this.contentOffset.y - this.realPaddingTop) / unitSize.y);
          return curCrd;
        };
        _proto.getLocation = function getLocation() {
          var curCrd = this.getVec();
          var layout = this.layoutInfo;
          var unitSize = v2(this.itemSize.x + layout.spaceX, this.itemSize.y + layout.spaceY);
          var spaceRatio = v2(layout.spaceX / unitSize.x, layout.spaceY / unitSize.y);
          var centerCrd = Vec2.floor(v2(), curCrd);
          var anchor = v2((1 - spaceRatio.x) / 2, (1 - spaceRatio.y) / 2);
          var crdOffset = v2(curCrd.x - centerCrd.x - anchor.x, curCrd.y - centerCrd.y - anchor.y);
          if (crdOffset.x > 0 && crdOffset.x > 0.5) centerCrd.x++;else if (crdOffset.x < 0 && crdOffset.x < -0.5) centerCrd.x--;
          if (crdOffset.y > 0 && crdOffset.y > 0.5) centerCrd.y++;else if (crdOffset.y < 0 && crdOffset.y < -0.5) centerCrd.y--;
          centerCrd.x = clamp(centerCrd.x, 0, layout.col - 1);
          centerCrd.y = clamp(centerCrd.y, 0, layout.row - 1);
          return centerCrd;
        };
        _proto.getFocus = function getFocus() {
          var location = this.getLocation();
          if (this.layoutDir == EDir.Horizontal) {
            return location.y * this.layoutInfo.col + location.x;
          } else {
            return location.x * this.layoutInfo.row + location.y;
          }
        };
        _proto.turnPrevious = function turnPrevious(time, isLoop) {
          if (time === void 0) {
            time = 0.4;
          }
          if (isLoop === void 0) {
            isLoop = false;
          }
          if (this.listType != EListType.Page) return;
          if (this.scrollDir == EScrollDir.Both) {
            warn("二维页面翻页请使用locate方法！");
            return;
          }
          var previousPageIdx = isLoop ? (this.pageIdx - 1 + this.pageCnt) % this.pageCnt : clamp(this.pageIdx - 1, 0, this.pageCnt - 1);
          if (this.scrollDir == EScrollDir.Horizontal) this.locate(v2(previousPageIdx, 0), time);else this.locate(v2(0, previousPageIdx), time);
        };
        _proto.turnNext = function turnNext(time, isLoop) {
          if (time === void 0) {
            time = 0.4;
          }
          if (isLoop === void 0) {
            isLoop = false;
          }
          if (this.listType != EListType.Page) return;
          if (this.scrollDir == EScrollDir.Both) {
            warn("二维页面翻页请使用locate方法！");
            return;
          }
          var nextPageIdx = isLoop ? (this.pageIdx + 1) % this.pageCnt : clamp(this.pageIdx + 1, 0, this.pageCnt - 1);
          if (this.scrollDir == EScrollDir.Horizontal) this.locate(v2(nextPageIdx, 0), time);else this.locate(v2(0, nextPageIdx), time);
        };
        _proto.locate = function locate(crd, time, endCallback) {
          this.focus(this.crd2idx(crd), time, endCallback);
        };
        _proto.focus = function focus(target, time, endCallback) {
          var _this17 = this;
          if (this.infos.length <= 0) return;
          if (this.listType == EListType.Layout) {
            warn("focus和locate方法仅在ScrollList和Page模式下可用");
            return;
          }
          var scrollView = this.scrollRect.getComponent(FixedScrollView);
          // scrollView.stopAutoScroll();
          switch (target) {
            case "Top":
              scrollView.scrollToTop(time, true);
              this._pageIdx = 0;
              break;
            case "Bottom":
              scrollView.scrollToBottom(time, true);
              this._pageIdx = this.layoutInfo.row - 1;
              break;
            case "Left":
              scrollView.scrollToLeft(time, true);
              this._pageIdx = 0;
              break;
            case "Right":
              scrollView.scrollToRight(time, true);
              this._pageIdx = this.layoutInfo.col - 1;
              break;
            case "Start":
              this.focus(0, time);
              break;
            case "End":
              this.focus(this.infos.length - 1, time);
              break;
            default:
              var idx = target;
              var pos = this.getPosInfo(idx).center;
              var contentSize = this.layoutInfo.size;
              var containerSize = this.content.parent.getComponent(UITransform).contentSize;
              var scrollSize = v2(contentSize.width - containerSize.width, contentSize.height - containerSize.height);
              var anchorOffset = v2(clamp((pos.x - containerSize.width / 2) / scrollSize.x, 0, 1), 1 - clamp((pos.y + containerSize.height / 2) / -scrollSize.y, 0, 1));
              scrollView.scrollTo(anchorOffset, time, true);
              var colIdx = this.layoutDir == EDir.Horizontal ? target % this.layoutInfo.col : Math.floor(target / this.layoutInfo.row);
              var rowIdx = this.layoutDir == EDir.Horizontal ? Math.floor(target / this.layoutInfo.col) : target % this.layoutInfo.row;
              if (this.scrollDir != EScrollDir.Both) {
                this._pageIdx = this.scrollDir == EScrollDir.Horizontal ? colIdx : rowIdx;
              }
              break;
          }
          this.focusTwn && this.focusTwn.stop();
          if (time) {
            this.isInFocus = true;
            this.focusTwn = tween(this).delay(time).call(function () {
              _this17.isInFocus = false;
              endCallback && endCallback();
            }).start();
          } else {
            endCallback && endCallback();
            this.onScrolling();
          }
        };
        _proto.recycleAll = function recycleAll() {
          var _this18 = this;
          this.infos.forEach(function (info) {
            _this18.recycleNode(info);
          });
        };
        _proto.recycleNode = function recycleNode(info) {
          var _this19 = this;
          if (!this.recycleFolder) {
            console.error("没有回收节点");
            return;
          }
          if (!info.node) return;
          if (info.node.isValid) {
            if (!this.isRenderByLayer) {
              info.node.setParent(this.recycleFolder);
            } else {
              this.itemChildMap.get(info.node).forEach(function (e) {
                return !e.skipParent && e.child.setParent(_this19.recycleFolder);
              });
            }
            info.node.off(Node.EventType.TOUCH_END, info.node['custom_event_onClick'], this);
            info.node['custom_event_onClick'] = null;
            this.registerInfos.forEach(function (e) {
              return _this19.unregisterNodeEvt(info, e);
            });
            this.nodePools.push(info.node);
          }
          info.node = null;
        };
        _proto.refreshStruct = function refreshStruct() {
          var trans = this.trans;
          var rootSize = trans.contentSize;
          this.recycleFolder = this.view = this.content = this.scrollRect = null;
          this.recycleFolder = this.node.getChildByName(RecycleNodeName);
          if (!this.recycleFolder) {
            this.recycleFolder = new Node(RecycleNodeName);
            this.recycleFolder.setParent(this.node);
            this.recycleFolder.hideFlags |= CCObject.Flags.LockedInEditor;
          }
          this.recycleFolder.active = false;
          var wgt;
          switch (this.listType) {
            case EListType.Layout:
              [].concat(this.node.children).forEach(function (e) {
                if (e.name != RecycleNodeName && e.name != ContentNodeName) {
                  {
                    e.destroy();
                  }
                }
              });
              this.view = null;
              this.content = this.node.getChildByName(ContentNodeName);
              if (!this.content) {
                this.content = new Node(ContentNodeName);
                this.content.layer = this.node.layer;
                this.content.setParent(this.node);
                var contentTrans = this.content.addComponent(UITransform);
                this.content.position = v3();
                contentTrans.anchorPoint = v2(0, 1);
                contentTrans.setContentSize(rootSize);
              }
              break;
            case EListType.ScrollList:
              [].concat(this.node.children).forEach(function (e) {
                if (e.name != RecycleNodeName && e.name != ScrollNodeName) {
                  {
                    e.destroy();
                  }
                }
              });
              this.scrollRect = this.node.getChildByName(ScrollNodeName);
              if (!this.scrollRect) {
                this.scrollRect = new Node(ScrollNodeName);
                this.scrollRect.setParent(this.node);
                var scrollCom = this.scrollRect.addComponent(FixedScrollView);
                this.scrollRect.layer = this.node.layer;
                scrollCom.horizontal = !!(this.scrollDir & 1);
                scrollCom.vertical = !!(this.scrollDir & 2);
                this.scrollRect.getComponent(UITransform).setContentSize(rootSize);
                this.scrollRect.position = v3();
                wgt = this.scrollRect.addComponent(Widget);
                wgt.alignMode = Widget.AlignMode.ALWAYS;
                wgt.isAlignLeft = wgt.isAlignBottom = wgt.isAlignTop = wgt.isAlignRight = true;
                wgt.left = wgt.top = wgt.right = wgt.bottom = 0;
                this.scrollRect.hideFlags |= CCObject.Flags.LockedInEditor;
              }
              this.view = this.scrollRect.getChildByName(ViewNodeName);
              if (!this.view) {
                this.view = new Node(ViewNodeName);
                this.view.setParent(this.scrollRect);
                this.view.addComponent(Mask);
                this.view.layer = this.node.layer;
                this.view.getComponent(UITransform).setContentSize(rootSize);
                wgt = this.view.addComponent(Widget);
                wgt.alignMode = Widget.AlignMode.ALWAYS;
                wgt.isAlignLeft = wgt.isAlignBottom = wgt.isAlignTop = wgt.isAlignRight = true;
                wgt.left = wgt.top = wgt.right = wgt.bottom = 0;
                this.view.position = v3();
              }
              this.content = this.view.getChildByName(ContentNodeName);
              if (!this.content) {
                this.content = new Node(ContentNodeName);
                this.content.setParent(this.view);
                this.content.layer = this.node.layer;
                var _contentTrans = this.content.addComponent(UITransform);
                _contentTrans.anchorPoint = v2(0, 1);
                _contentTrans.setContentSize(new Size(rootSize.width, 100));
                this.scrollRect.getComponent(FixedScrollView).content = this.content;
                this.content.position = v3(-trans.width / 2, trans.height / 2);
              }
              break;
            case EListType.Page:
              [].concat(this.node.children).forEach(function (e) {
                if (e.name != RecycleNodeName && e.name != PageNodeName) {
                  {
                    e.destroy();
                  }
                }
              });
              this.scrollRect = this.node.getChildByName(PageNodeName);
              if (!this.scrollRect) {
                this.scrollRect = new Node(PageNodeName);
                this.scrollRect.setParent(this.node);
                var _scrollCom = this.scrollRect.addComponent(FixedScrollView);
                _scrollCom.allowTouch = this.allowScrollPage;
                _scrollCom.isHandleReleaseScroll = false;
                this.scrollRect.layer = this.node.layer;
                _scrollCom.horizontal = !!(this.scrollDir & 1);
                _scrollCom.vertical = !!(this.scrollDir & 2);
                this.scrollRect.getComponent(UITransform).setContentSize(rootSize);
                this.scrollRect.position = v3();
                wgt = this.scrollRect.addComponent(Widget);
                wgt.alignMode = Widget.AlignMode.ALWAYS;
                wgt.isAlignLeft = wgt.isAlignBottom = wgt.isAlignTop = wgt.isAlignRight = true;
                wgt.left = wgt.top = wgt.right = wgt.bottom = 0;
                this.scrollRect.hideFlags |= CCObject.Flags.LockedInEditor;
              }
              this.view = this.scrollRect.getChildByName(ViewNodeName);
              if (!this.view) {
                this.view = new Node(ViewNodeName);
                this.view.setParent(this.scrollRect);
                this.view.addComponent(Mask);
                this.view.layer = this.node.layer;
                this.view.getComponent(UITransform).setContentSize(new Size(rootSize.x, rootSize.y));
                wgt = this.view.addComponent(Widget);
                wgt.alignMode = Widget.AlignMode.ALWAYS;
                wgt.isAlignLeft = wgt.isAlignBottom = wgt.isAlignTop = wgt.isAlignRight = true;
                wgt.left = wgt.top = wgt.right = wgt.bottom = 0;
              }
              this.view.position = v3();
              var itemRect = this.view.getChildByName(ItemRectNodeName);
              if (!itemRect) {
                itemRect = new Node(ItemRectNodeName);
                itemRect.setParent(this.view);
                itemRect.layer = this.node.layer;
                var itemRectTrans = itemRect.addComponent(UITransform);
                itemRectTrans.setContentSize(!this.itemPrefab ? new Size(100, 100) : this.itemSize);
              }
              this.content = itemRect.getChildByName(ContentNodeName);
              if (!this.content) {
                this.content = new Node(ContentNodeName);
                this.content.setParent(itemRect);
                this.content.layer = this.node.layer;
                var _contentTrans2 = this.content.addComponent(UITransform);
                _contentTrans2.anchorPoint = v2(0, 1);
                _contentTrans2.setContentSize(new Size(rootSize.width, 100));
                this.scrollRect.getComponent(FixedScrollView).content = this.content;
                this.content.position = v3(-trans.width / 2, trans.height / 2);
              }
              break;
          }
          if (!this.hasInitRegister) this.onInitRegister();
          this.hasInitRegister = true;
          this.lastContentOffset = this.contentOffset;
        };
        _proto.resetScrollPos = function resetScrollPos() {
          if (!this.scrollRect) return;
          if (this.scrollDir & 1) this.focus("Left");
          if (this.scrollDir & 2) this.focus("Top");
        };
        _proto.alignContentPos = function alignContentPos() {
          var viewSize = this.trans.contentSize;
          var contentSize = this.layoutInfo.size;
          var itemSize = this.itemSize;
          var contentPos = v2();
          switch (this.listType) {
            case EListType.Page:
              if (!(this.scrollDir & 1)) {
                if (this.alignType_hor == EAlignType_Hor.Center) contentPos.x = -contentSize.x / 2;else if (this.alignType_hor == EAlignType_Hor.Left) contentPos.x = -itemSize.x / 2;else if (this.alignType_hor == EAlignType_Hor.Right) contentPos.x = -contentSize.x + itemSize.x / 2;
              }
              if (!(this.scrollDir & 2)) {
                if (this.alignType_ver == EAlignType_Ver.Top) contentPos.y = itemSize.y / 2;else if (this.alignType_ver == EAlignType_Ver.Center) contentPos.y = contentSize.y / 2;else if (this.alignType_ver == EAlignType_Ver.Bottom) contentPos.y = contentSize.y - itemSize.y / 2;
              }
              break;
            case EListType.ScrollList:
              if (!(this.scrollDir & 1)) {
                if (this.alignType_hor == EAlignType_Hor.Center) contentPos.x = -contentSize.width / 2;else if (this.alignType_hor == EAlignType_Hor.Left) contentPos.x = -viewSize.width / 2;else if (this.alignType_hor == EAlignType_Hor.Right) contentPos.x = viewSize.width / 2 - contentSize.width;
              }
              if (!(this.scrollDir & 2)) {
                if (this.alignType_ver == EAlignType_Ver.Top) contentPos.y = viewSize.height / 2;else if (this.alignType_ver == EAlignType_Ver.Center) contentPos.y = contentSize.height / 2;else if (this.alignType_ver == EAlignType_Ver.Bottom) contentPos.y = contentSize.height - viewSize.height / 2;
              }
            case EListType.Layout:
              if (this.alignType_hor == EAlignType_Hor.Center) contentPos.x = -contentSize.width / 2;else if (this.alignType_hor == EAlignType_Hor.Left) contentPos.x = -viewSize.width / 2;else if (this.alignType_hor == EAlignType_Hor.Right) contentPos.x = viewSize.width / 2 - contentSize.width;
              if (this.alignType_ver == EAlignType_Ver.Top) contentPos.y = viewSize.height / 2;else if (this.alignType_ver == EAlignType_Ver.Center) contentPos.y = contentSize.height / 2;else if (this.alignType_ver == EAlignType_Ver.Bottom) contentPos.y = contentSize.height - viewSize.height / 2;
          }
          if (this.listType == EListType.Page) {
            if (this.alignType_hor == EAlignType_Hor.Center) contentPos.x = -contentSize.x / 2;else if (this.alignType_hor == EAlignType_Hor.Left) contentPos.x = -itemSize.x / 2;else if (this.alignType_hor == EAlignType_Hor.Right) contentPos.x = -contentSize.x + itemSize.x / 2;
            if (this.alignType_ver == EAlignType_Ver.Top) contentPos.y = itemSize.y / 2;else if (this.alignType_ver == EAlignType_Ver.Center) contentPos.y = contentSize.y / 2;else if (this.alignType_ver == EAlignType_Ver.Bottom) contentPos.y = contentSize.y - itemSize.y / 2;
          } else {
            if (!(this.listType == EListType.ScrollList && this.scrollDir & 1)) {
              if (this.alignType_hor == EAlignType_Hor.Center) contentPos.x = -contentSize.width / 2;else if (this.alignType_hor == EAlignType_Hor.Left) contentPos.x = -viewSize.width / 2;else if (this.alignType_hor == EAlignType_Hor.Right) contentPos.x = viewSize.width / 2 - contentSize.width;
            } else contentPos.x = -viewSize.width / 2;
            if (!(this.listType == EListType.ScrollList && this.scrollDir & 2)) {
              if (this.alignType_ver == EAlignType_Ver.Top) contentPos.y = viewSize.height / 2;else if (this.alignType_ver == EAlignType_Ver.Center) contentPos.y = contentSize.height / 2;else if (this.alignType_ver == EAlignType_Ver.Bottom) contentPos.y = contentSize.height - viewSize.height / 2;
            } else contentPos.y = viewSize.height / 2;
          }
          this.content.position = V3(contentPos);
        };
        _proto.isOutOfScroll = function isOutOfScroll() {
          return this.scrollRect.getComponent(FixedScrollView).isOutOfBoundary;
        };
        _proto.updateLayout = function updateLayout(len) {
          var _this21 = this;
          var itemSize = this.itemSize;
          var col = this.col;
          var row = this.row;
          var space_x = this.space_x;
          var space_y = this.space_y;
          var trans = this.trans;
          var validSize = {
            width: trans.width - this.padding_left - this.padding_right,
            height: trans.height - this.padding_top - this.padding_bottom
          };
          var getCol = null;
          var getRow = null;
          var cnt = 0;
          //0:horizontal  1:vertical
          getCol = function getCol() {
            cnt++;
            if (cnt >= 100) {
              log("死循环");
              return;
            }
            switch (_this21.strech_hor) {
              case EStrechType.Clamp:
                if (_this21.layoutDir == EDir.Horizontal) col = Math.max(1, Math.min(len, Math.floor((validSize.width + _this21.space_x) / (itemSize.width + _this21.space_x))));else {
                  if (_this21.strech_ver == EStrechType.Overflow) col = 1;else {
                    getRow();
                    col = Math.ceil(len / row);
                  }
                }
                break;
              case EStrechType.Expand:
                if (_this21.layoutDir == EDir.Horizontal) {
                  col = clamp(Math.floor((validSize.width + _this21.space_min_x) / (itemSize.width + _this21.space_min_x)), 1, len);
                  space_x = col == 1 ? 0 : (validSize.width - col * itemSize.width) / (col - 1);
                } else {
                  if (_this21.strech_ver == EStrechType.Overflow) col = 1;else {
                    getRow();
                    col = Math.ceil(len / row);
                    space_x = Math.max(_this21.space_min_x, (validSize.width - col * itemSize.width) / (col - 1));
                  }
                }
                break;
              case EStrechType.Fixed:
                if (_this21.layoutDir == EDir.Vertical && _this21.strech_ver == EStrechType.Overflow) col = 1;
                break;
              case EStrechType.ExpandFixed:
                if (_this21.layoutDir == EDir.Vertical && _this21.strech_ver == EStrechType.Overflow) col = 1;else space_x = col == 1 ? 0 : (validSize.width - col * itemSize.width) / (col - 1);
                break;
              case EStrechType.Overflow:
                if (_this21.layoutDir == EDir.Vertical && _this21.strech_ver == EStrechType.Overflow) col = 1;else {
                  getRow();
                  col = Math.ceil(len / row);
                }
                break;
            }
          };
          getRow = function getRow() {
            cnt++;
            if (cnt >= 100) {
              log("死循环");
              return;
            }
            switch (_this21.strech_ver) {
              case EStrechType.Clamp:
                if (_this21.layoutDir == EDir.Vertical) row = Math.max(1, Math.floor((validSize.height + _this21.space_y) / (itemSize.height + _this21.space_y)));else {
                  if (_this21.strech_hor == EStrechType.Overflow) row = 1;else {
                    getCol();
                    row = Math.ceil(len / col);
                  }
                }
                break;
              case EStrechType.Expand:
                if (_this21.layoutDir == EDir.Vertical) {
                  row = clamp(Math.floor((validSize.height + _this21.space_min_y) / (itemSize.height + _this21.space_min_y)), 1, len);
                  space_y = row == 1 ? 0 : (validSize.height - row * itemSize.height) / (row - 1);
                } else {
                  if (_this21.strech_hor == EStrechType.Overflow) row = 1;else {
                    getCol();
                    row = Math.ceil(len / col);
                    space_y = Math.max(_this21.space_min_y, (validSize.height - row * itemSize.height) / (row - 1));
                  }
                }
                break;
              case EStrechType.Fixed:
                if (_this21.layoutDir == EDir.Horizontal && _this21.strech_hor == EStrechType.Overflow) row = 1;
                break;
              case EStrechType.ExpandFixed:
                if (_this21.layoutDir == EDir.Horizontal && _this21.strech_hor == EStrechType.Overflow) row = 1;else space_y = row == 1 ? 0 : (validSize.height - row * itemSize.height) / (row - 1);
                break;
              case EStrechType.Overflow:
                if (_this21.layoutDir == EDir.Horizontal && _this21.strech_hor == EStrechType.Overflow) row = 1;else {
                  getCol();
                  row = Math.ceil(len / col);
                }
                break;
            }
          };
          getCol();
          getRow();
          var boundSize = new Size(col * (itemSize.width + space_x) - space_x, row * (itemSize.height + space_y) - space_y);
          var size = new Size(boundSize.x + this.realPaddingLeft + this.realPaddingRight, boundSize.y + this.realPaddingTop + this.realPaddinBottom);
          this.content.getComponent(UITransform).setContentSize(size);
          this._layoutInfo = {
            row: row,
            col: col,
            spaceX: space_x,
            spaceY: space_y,
            size: size,
            boundSize: boundSize,
            num: len
          };
        };
        _proto.getPosInfo = function getPosInfo(idx) {
          var info = this.layoutInfo;
          var itemSize = this.itemPrefab.data.getComponent(UITransform).contentSize;
          var c = 0;
          var r = 0;
          if (this.layoutDir == EDir.Horizontal) {
            r = Math.floor(idx / this._layoutInfo.col);
            c = idx % this._layoutInfo.col;
          } else {
            c = Math.floor(idx / this._layoutInfo.row);
            r = idx % this._layoutInfo.row;
          }
          var curTotalCol = Math.min(info.num - r * info.col, info.col);
          var curTotalRow = Math.min(info.num - c * info.row, info.row);
          var xMin = c * (itemSize.width + this._layoutInfo.spaceX) + this.realPaddingLeft;
          if (this.childAlign_hor == EAlignType_Hor.Center) xMin += (info.col - curTotalCol) * (itemSize.width + this._layoutInfo.spaceX) / 2;else if (this.childAlign_hor == EAlignType_Hor.Right) xMin += (info.col - curTotalCol) * (itemSize.width + this._layoutInfo.spaceX);
          var yMin = -(r + 1) * (itemSize.height + this._layoutInfo.spaceY) + info.spaceY - this.realPaddingTop;
          if (this.childAlign_ver == EAlignType_Ver.Center) yMin -= (info.row - curTotalRow) * (itemSize.height + this._layoutInfo.spaceY) / 2;else if (this.childAlign_ver == EAlignType_Ver.Bottom) yMin -= (info.row - curTotalRow) * (itemSize.height + this._layoutInfo.spaceY);
          return new Rect(xMin, yMin, itemSize.width, itemSize.height);
        };
        _proto.refreshList = function refreshList() {
          this.refreshView(true);
        };
        _proto.refreshView = function refreshView(force) {
          var _this22 = this;
          if (force === void 0) {
            force = false;
          }
          var trans = this.trans;
          var viewTrans = this.view ? this.view.getComponent(UITransform) : null;
          var contentTrans = this.content.getComponent(UITransform);
          contentTrans.setContentSize(this._layoutInfo.size);
          this.executeLock = true;
          for (var i = 0; i < this.infos.length; i++) {
            var e = this.isRevertSiblingOrder ? this.infos[this.infos.length - i - 1] : this.infos[i];
            var posInfo = this.getPosInfo(e.idx);
            switch (this.listType) {
              case EListType.Layout:
                // 在layout模式下，refreshView仅在setData时调用一次，即初始化
                e.isVisible = true;
                break;
              case EListType.ScrollList:
                if (!e.isInLayout) break;
                var minViewPos = v3(0, -viewTrans.height, 0);
                var maxViewPos = v3(viewTrans.width, 0, 0);
                // 在scrollList模式下，refreshView在setData和scrolling时调用
                //contentOffset为(0,0)时content坐标系下的最小和最大
                var itemMinPos = v3(posInfo.xMin + this.contentOffset.x + trans.contentSize.width / 2, posInfo.yMin + this.contentOffset.y - trans.contentSize.height / 2, 0);
                var itemMaxPos = v3(posInfo.xMax + this.contentOffset.x + trans.contentSize.width / 2, posInfo.yMax + this.contentOffset.y - trans.contentSize.height / 2, 0);
                if (itemMinPos.x <= maxViewPos.x && itemMaxPos.x >= minViewPos.x && itemMinPos.y <= maxViewPos.y && itemMaxPos.y >= minViewPos.y) {
                  if (!e.isVisible) this.delayFuncsMap.get(e).push(function (info) {
                    return _this22.cb.onShow && _this22.cb.onShow(info);
                  });
                  e.isVisible = true;
                } else {
                  if (e.isVisible) this.cb.onHide && e.node && this.cb.onHide(e);
                  e.isVisible = false;
                }
                break;
              case EListType.Page:
                var minViewPos2 = v3(1, -viewTrans.height + 1, 0);
                var maxViewPos2 = v3(viewTrans.width - 1, -1, 0);
                var contentOffsetByLeftUp = v2(this.contentOffset.x + trans.contentSize.x / 2, this.contentOffset.y - trans.contentSize.y / 2);
                var pageMinPos = v3(posInfo.xMin + contentOffsetByLeftUp.x, posInfo.yMin + contentOffsetByLeftUp.y, 0);
                var pageMaxPos = v3(posInfo.xMax + contentOffsetByLeftUp.x, posInfo.yMax + contentOffsetByLeftUp.y, 0);
                if (pageMinPos.x <= maxViewPos2.x && pageMaxPos.x >= minViewPos2.x && pageMinPos.y <= maxViewPos2.y && pageMaxPos.y >= minViewPos2.y) {
                  if (!e.isVisible) this.delayFuncsMap.get(e).push(function (info) {
                    return _this22.cb.onShow && _this22.cb.onShow(info);
                  });
                  e.isVisible = true;
                } else {
                  if (e.isVisible) this.cb.onHide && e.node && this.cb.onHide(e);
                  e.isVisible = false;
                }
                break;
            }
            if (e.isVisible) {
              var hasNode = !!e.node;
              if (!hasNode) this.setNode(e);
              if (!hasNode || force) this.delayFuncsMap.get(e).push(function (info) {
                return _this22.cb.onData && _this22.cb.onData(info);
              });
            } else if ((!e.isVisible || !this.node.activeInHierarchy) && e.node) {
              this.recycleNode(e);
            }
          }
          this.infos.forEach(function (e) {
            if (e.isVisible) {
              var array = _this22.delayFuncsMap.get(e);
              while (array.length > 0) {
                array.shift()(e);
              }
            }
          });
          this.executeLock = false;
        };
        _proto.waitExecute = function waitExecute(exeFunc) {
          this.exeCache.push(exeFunc);
        };
        _proto.update = function update(dt) {
          var _this23 = this;
          this.executeLock = true;
          this.infos.forEach(function (e) {
            if (e.isVisible) _this23.cb.onUpdate && _this23.cb.onUpdate(e, dt);
          });
          this.executeLock = false;
          this.scrollVelocity = v2((this.contentOffset.x - this.lastContentOffset.x) / dt, (this.contentOffset.y - this.lastContentOffset.y) / dt);
          this.lastContentOffset = this.contentOffset.clone();
          //缓冲，配合executeLock防止Foreach错误
          this.exeCache.forEach(function (e) {
            return e();
          });
          this.exeCache = [];
        }
        // protected onEnable(): void {
        //     this.refreshView();
        // }
        ;

        _proto.onDisable = function onDisable() {
          this.clearPool();
        };
        _proto.onDestroy = function onDestroy() {
          this.clearAll();
        };
        _proto.onLoad = function onLoad() {
          if (!this.trans) {
            error("VList没有UITransform组件！请手动添加并检查该节点是否挂载在Canvas下！");
            return;
          }
          if (!this.hasInitRegister) this.onInitRegister();
        };
        _proto.resetInEditor = function resetInEditor(didResetToDefault) {
          [].concat(this.node.children).forEach(function (e) {
            return e.destroy();
          });
          this.comPathList = [];
          this.comKeyList = [];
          this.comShowList = [];
        };
        _proto.onScrollStart = function onScrollStart() {
          this.isInFocus = false;
          this.focusTwn && this.focusTwn.stop();
          this.focusTwn = null;
          var location = this.getLocation();
          this.startCrd = location;
          if (this.scrollDir != EScrollDir.Both) this._pageIdx = this.scrollDir == EScrollDir.Horizontal ? location.x : location.y;
        };
        _proto.onScrollEnd = function onScrollEnd() {
          var _this24 = this;
          if (this.listType == EListType.Page) {
            if (!this.scrollRect || this.isInFocus) return;
            var isInEdge = !!(this.scrollDir & EScrollDir.Horizontal) && (this.startCrd.x == 0 || this.startCrd.x == this.layoutInfo.col - 1) || !!(this.scrollDir & EScrollDir.Vertical) && (this.startCrd.y == 0 || this.startCrd.y == this.layoutInfo.row - 1);
            if (!this.isOutOfScroll() || !isInEdge) {
              var targetCrd = this.getLocation();
              var vec = this.getVec().subtract(v2(0.5, 0.5));
              var selfRange = new Rect(this.startCrd.x - this.scrollThreshold, this.startCrd.y - this.scrollThreshold, 2 * this.scrollThreshold, 2 * this.scrollThreshold);
              if (vec.x < selfRange.xMin || this.scrollVelocity.x > this.turnSpeedThreshold) targetCrd.x = Math.max(0, Math.min(targetCrd.x, this.startCrd.x - 1));else if (vec.x > selfRange.xMax || this.scrollVelocity.x < -this.turnSpeedThreshold) targetCrd.x = Math.min(this.layoutInfo.col - 1, Math.max(targetCrd.x, this.startCrd.x + 1));
              if (vec.y < selfRange.yMin || this.scrollVelocity.y < -this.turnSpeedThreshold) targetCrd.y = Math.max(0, Math.min(targetCrd.y, this.startCrd.y - 1));else if (vec.y > selfRange.yMax || this.scrollVelocity.y > this.turnSpeedThreshold) targetCrd.y = Math.min(this.layoutInfo.row - 1, Math.max(targetCrd.y, this.startCrd.y + 1));
              this.locate(targetCrd, this.snapTime, function () {
                _this24.node.emit(VListEvent.OnFinishPage);
              });
            }
            this.node.emit(VListEvent.OnTurnPage);
            this.startCrd = v2();
          }
        };
        _createClass(VList, [{
          key: "listType",
          get: function get() {
            return this._listType;
          },
          set: function set(val) {
            this._listType = val;
            // switch (val) {
            //     case EListType.Page:
            //         this._alignType_hor = EAlignType_Hor.Left;
            //         this._alignType_ver = EAlignType_Ver.Center;
            //         this._scrollDir = EScrollDir.Horizontal;
            //         this._layoutDir = EDir.Horizontal;
            //         this._strech_hor = EStrechType.Overflow;
            //         this._strech_ver = EStrechType.ExpandFixed;
            //         this._row = 1;
            //         break;
            //     case EListType.ScrollList:
            //         this._scrollDir = EScrollDir.Vertical;
            //         this._layoutDir = EDir.Horizontal;
            //         this._alignType_hor = EAlignType_Hor.Center;
            //         this._strech_hor = EStrechType.ExpandFixed;
            //         this._strech_ver = EStrechType.Overflow;
            //         this._col = 1;
            //         break;
            //     case EListType.Layout:
            //         this._alignType_hor = EAlignType_Hor.Left;
            //         this._alignType_ver = EAlignType_Ver.Top;
            //         this._strech_hor = EStrechType.ExpandFixed;
            //         this._strech_ver = EStrechType.ExpandFixed;
            //         break;
            // }
            this.onChangeParams();
          }
        }, {
          key: "scrollDir",
          get: function get() {
            return this._scrollDir;
          },
          set: function set(val) {
            this._scrollDir = val;
            var scrollNode = this.scrollRect;
            if (!scrollNode) return;
            var scrollView = scrollNode.getComponent(FixedScrollView);
            scrollView.horizontal = !!(val & 1);
            scrollView.vertical = !!(val & 2);
            if (val & 2 && this._listType == EListType.ScrollList) this.alignType_hor = EAlignType_Hor.Left;else if (val & 1 && this._listType == EListType.ScrollList) this.alignType_ver = EAlignType_Ver.Top;
          }
        }, {
          key: "isRevertSiblingOrder",
          get: function get() {
            return this._isRevertSiblingOrder;
          },
          set: function set(val) {
            this._isRevertSiblingOrder = val;
            this.onChangeParams();
          }
        }, {
          key: "preItemNum",
          get: function get() {
            return this._preItemNum;
          },
          set: function set(val) {
            this._preItemNum = val;
            this.onChangeParams();
          }
        }, {
          key: "itemPrefab",
          get: function get() {
            return this._itemPrefab;
          },
          set: function set(val) {
            this._itemPrefab = val;
            if (val) {
              this.refreshItemCom();
            } else {
              this.comKeyList = [];
              this.comPathList = [];
              this.comShowList = [];
            }
          }
        }, {
          key: "itemSize",
          get: function get() {
            return this.itemPrefab == null ? new Size(0, 0) : this.itemPrefab.data.getComponent(UITransform).contentSize;
          }
        }, {
          key: "comPrefix",
          get: function get() {
            return this._comPrefix;
          },
          set: function set(val) {
            if (val != "") this._comPrefix = val;
          }
        }, {
          key: "refreshComList",
          get: function get() {
            return false;
          },
          set: function set(val) {
            this.refreshItemCom();
            log("列表项组件已刷新");
          }
        }, {
          key: "relativeList",
          get: function get() {
            return this._relativeList;
          },
          set: function set(value) {
            var res = [];
            for (var i = 0; i < value.length; i++) {
              if (value[i] && !value[i].getComponent(VList)) {
                warn("\u8282\u70B9" + value[i].name + "\u6CA1\u6709VList\u7EC4\u4EF6");
              } else {
                res.push(value[i]);
              }
            }
            this._relativeList = res;
          }
        }, {
          key: "uniformRelativeSizeTrigger",
          get: function get() {
            return false;
          },
          set: function set(value) {
            for (var i = 0; i < this.relativeList.length; i++) {
              this.relativeList[i] && this.relativeList[i].getComponent(UITransform).setContentSize(this.trans.contentSize);
            }
            log("所有关联列表已重设为被关联列表的尺寸!");
          }
        }, {
          key: "relaticeScrollTips",
          get: function get() {
            return "仅ScrollList和Page模式下有效";
          }
        }, {
          key: "allowScrollPage",
          get: function get() {
            return this._allowScrollPage;
          },
          set: function set(val) {
            this._allowScrollPage = val;
            this.scrollRect && (this.scrollRect.getComponent(FixedScrollView).allowTouch = val);
          }
        }, {
          key: "resizeToItem",
          get: function get() {
            return false;
          },
          set: function set(val) {
            this.itemPrefab && this.trans.setContentSize(this.itemSize);
          }
        }, {
          key: "fullPage",
          get: function get() {
            return this._fullPage;
          },
          set: function set(val) {
            this._fullPage = val;
            this.onChangeParams();
          }
        }, {
          key: "pageParamsTipe",
          get: function get() {
            return "仅在列表类型为Page时可用";
          }
        }, {
          key: "tips",
          get: function get() {
            return "页面模式下无法使用边缘留白";
          }
        }, {
          key: "padding_top",
          get: function get() {
            return this._padding_top;
          },
          set: function set(val) {
            this._padding_top = val;
            this.onChangeParams();
          }
        }, {
          key: "padding_left",
          get: function get() {
            return this._padding_left;
          },
          set: function set(val) {
            this._padding_left = val;
            this.onChangeParams();
          }
        }, {
          key: "padding_bottom",
          get: function get() {
            return this._padding_bottom;
          },
          set: function set(val) {
            this._padding_bottom = val;
            this.onChangeParams();
          }
        }, {
          key: "padding_right",
          get: function get() {
            return this._padding_right;
          },
          set: function set(val) {
            this._padding_right = val;
            this.onChangeParams();
          }
        }, {
          key: "strech_hor",
          get: function get() {
            return this._strech_hor;
          },
          set: function set(val) {
            this._strech_hor = val;
            this.onChangeParams();
          }
        }, {
          key: "strech_ver",
          get: function get() {
            return this._strech_ver;
          },
          set: function set(val) {
            this._strech_ver = val;
            this.onChangeParams();
          }
        }, {
          key: "space_x_tips",
          get: function get() {
            return "ExpandFixed自动计算";
          }
        }, {
          key: "space_y_tips",
          get: function get() {
            return "ExpandFixed自动计算";
          }
        }, {
          key: "space_x",
          get: function get() {
            return this._space_x;
          },
          set: function set(val) {
            this._space_x = val;
            this.onChangeParams();
          }
        }, {
          key: "space_y",
          get: function get() {
            return this._space_y;
          },
          set: function set(val) {
            this._space_y = val;
            this.onChangeParams();
          }
        }, {
          key: "space_min_x",
          get: function get() {
            return this._space_min_x;
          },
          set: function set(val) {
            this._space_min_x = val;
            this.onChangeParams();
          }
        }, {
          key: "space_min_y",
          get: function get() {
            return this._space_min_y;
          },
          set: function set(val) {
            this._space_min_y = val;
            this.onChangeParams();
          }
        }, {
          key: "layoutDir",
          get: function get() {
            return this._layoutDir;
          },
          set: function set(val) {
            this._layoutDir = val;
            this.onChangeParams();
          }
        }, {
          key: "alignType_hor_tips",
          get: function get() {
            return "水平滚动列表动态计算";
          }
        }, {
          key: "alignType_hor",
          get: function get() {
            return this._alignType_hor;
          },
          set: function set(val) {
            this._alignType_hor = val;
            this.onChangeParams();
          }
        }, {
          key: "isAlignChild_hor",
          get: function get() {
            return this._isAlignChild_hor;
          },
          set: function set(val) {
            this._isAlignChild_hor = val;
            this.onChangeParams();
          }
        }, {
          key: "alignType_ver_tips",
          get: function get() {
            return "垂直滚动列表动态计算";
          }
        }, {
          key: "alignType_ver",
          get: function get() {
            return this._alignType_ver;
          },
          set: function set(val) {
            this._alignType_ver = val;
            this.onChangeParams();
          }
        }, {
          key: "isAlignChild_ver",
          get: function get() {
            return this._isAlignChild_ver;
          },
          set: function set(val) {
            this._isAlignChild_ver = val;
            this.onChangeParams();
          }
        }, {
          key: "row",
          get: function get() {
            return this._row;
          },
          set: function set(val) {
            this._row = val;
            this.onChangeParams();
          }
        }, {
          key: "col",
          get: function get() {
            return this._col;
          },
          set: function set(val) {
            this._col = val;
            this.onChangeParams();
          }
        }, {
          key: "layoutInfo",
          get: function get() {
            return this._layoutInfo;
          }
        }, {
          key: "trans",
          get: function get() {
            if (!this._trans) this._trans = this.getComponent(UITransform);
            return this._trans;
          }
        }, {
          key: "contentOffset",
          get: function get() {
            return !this.content ? v2() : v2(this.content.position.x, this.content.position.y);
          }
        }, {
          key: "realCol",
          get: function get() {
            return this.layoutInfo == null ? 0 : this.layoutInfo.col;
          }
        }, {
          key: "realRow",
          get: function get() {
            return this.layoutInfo == null ? 0 : this.layoutInfo.row;
          }
        }, {
          key: "realSpaceX",
          get: function get() {
            return this.layoutInfo == null ? 0 : this.layoutInfo.spaceX;
          }
        }, {
          key: "realSpaceY",
          get: function get() {
            return this.layoutInfo == null ? 0 : this.layoutInfo.spaceY;
          }
        }, {
          key: "realBoundSize",
          get: function get() {
            return this.layoutInfo == null ? new Size(0, 0) : this.layoutInfo.size;
          }
        }, {
          key: "realPaddingLeft",
          get: function get() {
            return this.listType == EListType.Page ? 0 : this.padding_left;
          }
        }, {
          key: "realPaddingRight",
          get: function get() {
            return this.listType == EListType.Page ? 0 : this.padding_right;
          }
        }, {
          key: "realPaddingTop",
          get: function get() {
            return this.listType == EListType.Page ? 0 : this.padding_top;
          }
        }, {
          key: "realPaddinBottom",
          get: function get() {
            return this.listType == EListType.Page ? 0 : this.padding_bottom;
          }
        }, {
          key: "childAlign_hor",
          get: function get() {
            return !this.isAlignChild_hor || this.listType == EListType.ScrollList && !!(this.scrollDir & 1) || this.layoutDir != EDir.Horizontal ? EAlignType_Hor.Left : this.alignType_hor;
          }
        }, {
          key: "childAlign_ver",
          get: function get() {
            return !this.isAlignChild_ver || this.listType == EListType.ScrollList && !!(this.scrollDir & 2) || this.layoutDir != EDir.Vertical ? EAlignType_Ver.Top : this.alignType_ver;
          }
        }, {
          key: "rootLayer",
          get: function get() {
            return this.itemPrefab ? this.layerMap.get(this.itemPrefab.data.name) : null;
          }
        }, {
          key: "infos",
          get: function get() {
            return this._infos;
          }
        }, {
          key: "datas",
          get: function get() {
            return this.infos.map(function (e) {
              return e.data;
            });
          }
        }, {
          key: "pageCnt",
          get: function get() {
            if (this.listType != EListType.Page) return -1;
            if (this.scrollDir == EScrollDir.Horizontal) return this.layoutInfo.col;else if (this.scrollDir == EScrollDir.Vertical) return this.layoutInfo.row;else {
              warn("二维页面请使用getLocation！");
              return -1;
            }
          }
        }, {
          key: "pageIdx",
          get: function get() {
            if (this.scrollDir == EScrollDir.Both) {
              warn("二维页面请使用getLocation！");
              return -1;
            }
            return this._pageIdx;
          }
        }, {
          key: "curPageInfo",
          get: function get() {
            if (this.listType != EListType.Page) return null;
            return this.infos[this.pageIdx];
          }
        }]);
        return VList;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_listType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EListType.ScrollList;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "listType", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "listType"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_scrollDir", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EScrollDir.Vertical;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "scrollDir", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "scrollDir"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_isRevertSiblingOrder", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "isRevertSiblingOrder", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "isRevertSiblingOrder"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "isRenderByLayer", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_preItemNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "preItemNum", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "preItemNum"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_itemPrefab", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _applyDecoratedDescriptor(_class2.prototype, "itemPrefab", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "itemPrefab"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "itemSize", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "itemSize"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_comPrefix", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "_";
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "comPrefix", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "comPrefix"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refreshComList", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "refreshComList"), _class2.prototype), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "comShowList", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "comKeyList", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "comPathList", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_relativeList", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "relativeList", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "relativeList"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uniformRelativeSizeTrigger", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "uniformRelativeSizeTrigger"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "relaticeScrollTips", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "relaticeScrollTips"), _class2.prototype), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_allowScrollPage", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "allowScrollPage", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "allowScrollPage"), _class2.prototype), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "snapTime", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "turnSpeedThreshold", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "scrollThreshold", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.4;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "resizeToItem", [_dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "resizeToItem"), _class2.prototype), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "_fullPage", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "fullPage", [_dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "fullPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pageParamsTipe", [_dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "pageParamsTipe"), _class2.prototype), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "_padding_top", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "_padding_left", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "_padding_bottom", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "_padding_right", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "tips", [_dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "tips"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "padding_top", [_dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "padding_top"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "padding_left", [_dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "padding_left"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "padding_bottom", [_dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "padding_bottom"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "padding_right", [_dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "padding_right"), _class2.prototype), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "_strech_hor", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EStrechType.Fixed;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "strech_hor", [_dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "strech_hor"), _class2.prototype), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "_strech_ver", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EStrechType.Overflow;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "strech_ver", [_dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "strech_ver"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "space_x_tips", [_dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "space_x_tips"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "space_y_tips", [_dec36], Object.getOwnPropertyDescriptor(_class2.prototype, "space_y_tips"), _class2.prototype), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "_space_x", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "space_x", [_dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "space_x"), _class2.prototype), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "_space_y", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "space_y", [_dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "space_y"), _class2.prototype), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "_space_min_x", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "space_min_x", [_dec39], Object.getOwnPropertyDescriptor(_class2.prototype, "space_min_x"), _class2.prototype), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "_space_min_y", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "space_min_y", [_dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "space_min_y"), _class2.prototype), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "_layoutDir", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EDir.Horizontal;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "layoutDir", [_dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "layoutDir"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alignType_hor_tips", [_dec42], Object.getOwnPropertyDescriptor(_class2.prototype, "alignType_hor_tips"), _class2.prototype), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "_alignType_hor", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EAlignType_Hor.Center;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "alignType_hor", [_dec43], Object.getOwnPropertyDescriptor(_class2.prototype, "alignType_hor"), _class2.prototype), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "_isAlignChild_hor", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "isAlignChild_hor", [_dec44], Object.getOwnPropertyDescriptor(_class2.prototype, "isAlignChild_hor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "alignType_ver_tips", [_dec45], Object.getOwnPropertyDescriptor(_class2.prototype, "alignType_ver_tips"), _class2.prototype), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "_alignType_ver", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return EAlignType_Ver.Top;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "alignType_ver", [_dec46], Object.getOwnPropertyDescriptor(_class2.prototype, "alignType_ver"), _class2.prototype), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "_isAlignChild_ver", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "isAlignChild_ver", [_dec47], Object.getOwnPropertyDescriptor(_class2.prototype, "isAlignChild_ver"), _class2.prototype), _descriptor32 = _applyDecoratedDescriptor(_class2.prototype, "_row", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "row", [_dec48], Object.getOwnPropertyDescriptor(_class2.prototype, "row"), _class2.prototype), _descriptor33 = _applyDecoratedDescriptor(_class2.prototype, "_col", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "col", [_dec49], Object.getOwnPropertyDescriptor(_class2.prototype, "col"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "contentOffset", [_dec50], Object.getOwnPropertyDescriptor(_class2.prototype, "contentOffset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "realCol", [_dec51], Object.getOwnPropertyDescriptor(_class2.prototype, "realCol"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "realRow", [_dec52], Object.getOwnPropertyDescriptor(_class2.prototype, "realRow"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "realSpaceX", [_dec53], Object.getOwnPropertyDescriptor(_class2.prototype, "realSpaceX"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "realSpaceY", [_dec54], Object.getOwnPropertyDescriptor(_class2.prototype, "realSpaceY"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "realBoundSize", [_dec55], Object.getOwnPropertyDescriptor(_class2.prototype, "realBoundSize"), _class2.prototype), _descriptor34 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec56], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor35 = _applyDecoratedDescriptor(_class2.prototype, "view", [_dec57], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor36 = _applyDecoratedDescriptor(_class2.prototype, "recycleFolder", [_dec58], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor37 = _applyDecoratedDescriptor(_class2.prototype, "scrollRect", [_dec59], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VListLayerCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "ccf81SMCTpF0YYxuBv27Pmp", "VListLayerCom", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var VListLayerCom = exports('VListLayerCom', (_dec = ccclass('VListLayerCom'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(VListLayerCom, _Component);
        function VListLayerCom() {
          return _Component.apply(this, arguments) || this;
        }
        return VListLayerCom;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});