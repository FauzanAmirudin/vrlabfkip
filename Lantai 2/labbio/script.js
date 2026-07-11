(function () {
  var script = {
    "mouseWheelEnabled": true,
    "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7,this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250], 'cardboardAvailable'); this.playList_EE103521_AACC_EC8A_41D7_6FB15B4A7D5C.set('selectedIndex', 0); this.playList_EE105521_AACC_EC8A_41C5_483967759B15.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081].forEach(function(component) { component.set('visible', false); }) }",
    "scrollBarWidth": 10,
    "id": "rootPlayer",
    "mobileMipmappingEnabled": false,
    "vrPolyfillScale": 1,
    "propagateClick": false,
    "paddingLeft": 0,
    "scrollBarColor": "#000000",
    "paddingRight": 0,
    "backgroundPreloadEnabled": true,
    "children": [
      "this.MainViewer",
      "this.Container_B156A269_BF46_B846_41CC_86CDE6B7F756",
      "this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C",
      "this.Container_320C1ADD_3F4A_FD16_41B0_FBCDFB126CCF",
      "this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B",
      "this.veilPopupPanorama",
      "this.zoomImagePopupPanorama",
      "this.closeButtonPopupPanorama"
    ],
    "borderSize": 0,
    "scrollBarVisible": "rollOver",
    "desktopMipmappingEnabled": false,
    "minHeight": 20,
    "scripts": {
      "getMediaByName": function (name) { var list = this.getByClassName('Media'); for (var i = 0, count = list.length; i < count; ++i) { var media = list[i]; if ((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name) { return media; } } return undefined; },
      "setCameraSameSpotAsMedia": function (camera, media) { var player = this.getCurrentPlayerWithMedia(media); if (player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
      "showPopupImage": function (image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback) { var self = this; var closed = false; var playerClickFunction = function () { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function () { zoomImage.unbind('click', clearAutoClose, this); if (timeoutID != undefined) { clearTimeout(timeoutID); } }; var resizeFunction = function () { setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function () { self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function () { timeoutID = undefined; if (autoCloseMilliSeconds) { var autoCloseFunction = function () { hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if (toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if (loadedCallback) loadedCallback(); }; var hideFunction = function () { self.MainViewer.set('toolTipEnabled', true); closed = true; if (timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if (autoCloseMilliSeconds) clearAutoClose(); if (hideCallback) hideCallback(); zoomImage.set('visible', false); if (hideEffect && hideEffect.get('duration') > 0) { hideEffect.bind('end', endEffectFunction, this); } else { zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if (toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function () { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function () { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function () { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function () { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if (right < 10) right = 10; if (top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function () { if (timeoutUserInteractionID) { clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else { closeButton.set('visible', false); } }; var userInteractionEndFunction = function () { if (!closed) { timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function () { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if (closeButtonProperties) { for (var key in closeButtonProperties) { closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function () { self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
      "openLink": function (url, name) { if (url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if (extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if (isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
      "loadFromCurrentMediaPlayList": function (playList, delta) { var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while (newIndex < 0) { newIndex = totalItems + newIndex; }; if (currentIndex != newIndex) { playList.set('selectedIndex', newIndex); } },
      "executeFunctionWhenChange": function (playList, index, endFunction, changeFunction) { var endObject = undefined; var changePlayListFunction = function (event) { if (event.data.previousSelectedIndex == index) { if (changeFunction) changeFunction.call(this); if (endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if (endFunction) { var playListItem = playList.get('items')[index]; if (playListItem.get('class') == 'PanoramaPlayListItem') { var camera = playListItem.get('camera'); if (camera != undefined) endObject = camera.get('initialSequence'); if (endObject == undefined) endObject = camera.get('idleSequence'); } else { endObject = playListItem.get('media'); } if (endObject) { endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
      "stopGlobalAudio": function (audio) { var audios = window.currentGlobalAudios; if (audios) { audio = audios[audio.get('id')]; if (audio) { delete audios[audio.get('id')]; if (Object.keys(audios).length == 0) { window.currentGlobalAudios = undefined; } } } if (audio) audio.stop(); },
      "getGlobalAudio": function (audio) { var audios = window.currentGlobalAudios; if (audios != undefined && audio.get('id') in audios) { audio = audios[audio.get('id')]; } return audio; },
      "showPopupMedia": function (w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios) { var self = this; var closeFunction = function () { playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if (stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if (isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function () { w.hide(); }; var resizeFunction = function () { var getWinValue = function (property) { return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if (!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if (parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if (windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if (windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if (autoCloseWhenFinished) { this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if (isVideo) { this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if (stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
      "getActivePlayerWithViewer": function (viewerArea) { var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while (i-- > 0) { var player = players[i]; if (player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if (playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if ((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if (playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if (playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
      "showComponentsWhileMouseOver": function (parentComponent, components, durationVisibleWhileOut) { var setVisibility = function (visible) { for (var i = 0, length = components.length; i < length; i++) { var component = components[i]; if (component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true) { setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function () { setVisibility(true); if (timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function () { var timeoutFunction = function () { setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
      "getComponentByName": function (name) { var list = this.getByClassName('UIComponent'); for (var i = 0, count = list.length; i < count; ++i) { var component = list[i]; var data = component.get('data'); if (data != undefined && data.name == name) { return component; } } return undefined; },
      "shareTwitter": function (url) { window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
      "resumeGlobalAudios": function (caller) { if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i < count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length - 1; j >= 0; --j) { var a = audiosPaused[j]; if (objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i < count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
      "triggerOverlay": function (overlay, eventName) { if (overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for (var i = 0; i < areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
      "resumePlayers": function (players, onlyResumeCameraIfPanorama) { for (var i = 0; i < players.length; ++i) { var player = players[i]; if (onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined') { player.resumeCamera(); } else { player.play(); } } },
      "syncPlaylists": function (playLists) { var changeToMedia = function (media, playListDispatched) { for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; if (playList != playListDispatched) { var items = playList.get('items'); for (var j = 0, countJ = items.length; j < countJ; ++j) { if (items[j].get('media') == media) { if (playList.get('selectedIndex') != j) { playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function (event) { var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if (selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function (event) { var panoramaMapLocation = event.source.get('panoramaMapLocation'); if (panoramaMapLocation) { var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for (var i = 0, count = playLists.length; i < count; ++i) { playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for (var i = 0, count = mapPlayers.length; i < count; ++i) { mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
      "isCardboardViewMode": function () { var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
      "unregisterKey": function (key) { delete window[key]; },
      "registerKey": function (key, value) { window[key] = value; },
      "fixTogglePlayPauseButton": function (player) { var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if (typeof buttons !== 'undefined' && player.get('state') == 'playing') { if (!Array.isArray(buttons)) buttons = [buttons]; for (var i = 0; i < buttons.length; ++i) buttons[i].set('pressed', true); } },
      "playGlobalAudio": function (audio, endCallback) { var endFunction = function () { audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if (endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if (!audios) { audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if (audio.get('state') == 'playing') { return audio; } if (!audio.get('loop')) { audio.bind('end', endFunction, this); } audio.play(); return audio; },
      "setEndToItemIndex": function (playList, fromIndex, toIndex) { var endFunction = function () { if (playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
      "getPixels": function (value) { var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch (unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
      "playGlobalAudioWhilePlay": function (playList, index, audio, endCallback) { var changeFunction = function (event) { if (event.data.previousSelectedIndex == index) { this.stopGlobalAudio(audio); if (isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if (endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if (audios && audio.get('id') in audios) { audio = audios[audio.get('id')]; if (audio.get('state') != 'playing') { audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if (isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if (audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for (var i = 0; i < stateChangeFunctions.length; ++i) { var f = stateChangeFunctions[i]; if (typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
      "init": function () { if (!Object.hasOwnProperty('values')) { Object.values = function (o) { return Object.keys(o).map(function (e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function (e) { var playList = e.source; var index = playList.get('selectedIndex'); if (index < 0) return; var id = playList.get('id'); if (!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
      "playAudioList": function (audios) { if (audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function () { if (++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
      "getPanoramaOverlayByName": function (panorama, name) { var overlays = this.getOverlays(panorama); for (var i = 0, count = overlays.length; i < count; ++i) { var overlay = overlays[i]; var data = overlay.get('data'); if (data != undefined && data.label == name) { return overlay; } } return undefined; },
      "stopAndGoCamera": function (camera, ms) { var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function () { sequence.play(); }; setTimeout(timeoutFunction, ms); },
      "setComponentVisibility": function (component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout) { var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if (keepVisibility) return; this.unregisterKey('visibility_' + component.get('id')); var changeVisibility = function () { if (effect && propertyEffect) { component.set(propertyEffect, effect); } component.set('visible', visible); if (component.get('class') == 'ViewerArea') { try { if (visible) component.restart(); else if (component.get('playbackState') == 'playing') component.pause(); } catch (e) { }; } }; var effectTimeoutName = 'effectTimeout_' + component.get('id'); if (!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)) { var effectTimeout = window[effectTimeoutName]; if (effectTimeout instanceof Array) { for (var i = 0; i < effectTimeout.length; i++) { clearTimeout(effectTimeout[i]) } } else { clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if (visible == component.get('visible') && !ignoreClearTimeout) return; if (applyAt && applyAt > 0) { var effectTimeout = setTimeout(function () { if (window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if (arrayTimeoutVal.length == 0) { delete window[effectTimeoutName]; } } else { delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if (window.hasOwnProperty(effectTimeoutName)) { window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; } else { window[effectTimeoutName] = effectTimeout; } } else { changeVisibility(); } },
      "getPlayListItems": function (media, player) { var itemClass = (function () { switch (media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length - 1; i >= 0; --i) { var item = items[i]; if (item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
      "keepComponentVisibility": function (component, keep) { var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if (value == undefined && keep) { this.registerKey(key, keep); } else if (value != undefined && !keep) { this.unregisterKey(key); } },
      "shareFacebook": function (url) { window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
      "startPanoramaWithCamera": function (media, camera) { if (window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1) { return; } var playLists = this.getByClassName('PlayList'); if (playLists.length == 0) return; var restoreItems = []; for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; var items = playList.get('items'); for (var j = 0, countJ = items.length; j < countJ; ++j) { var item = items[j]; if (item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')) { restoreItems.push({ camera: item.get('camera'), item: item }); item.set('camera', camera); } } } if (restoreItems.length > 0) { if (window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function () { var index = window.currentPanoramasWithCameraChanged.indexOf(media); if (index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
      "pauseCurrentPlayers": function (onlyPauseCameraIfPanorama) { var players = this.getCurrentPlayers(); var i = players.length; while (i-- > 0) { var player = players[i]; if (player.get('state') == 'playing') { if (onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined') { player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
      "shareWhatsapp": function (url) { window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
      "pauseGlobalAudios": function (caller, exclude) { if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i < count; ++i) { var objAudios = values[i]; for (var j = 0; j < objAudios.length; ++j) { var a = objAudios[j]; if (audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
      "setStartTimeVideoSync": function (video, player) { this.setStartTimeVideo(video, player.get('currentTime')); },
      "showWindow": function (w, autoCloseMilliSeconds, containsAudio) { if (w.get('visible') == true) { return; } var closeFunction = function () { clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function () { w.unbind('click', clearAutoClose, this); if (timeoutID != undefined) { clearTimeout(timeoutID); } }; var timeoutID = undefined; if (autoCloseMilliSeconds) { var autoCloseFunction = function () { w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
      "updateMediaLabelFromPlayList": function (playList, htmlText, playListItemStopToDispose) { var changeFunction = function () { var index = playList.get('selectedIndex'); if (index >= 0) { var beginFunction = function () { playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function (index) { var media = playListItem.get('media'); var text = media.get('data'); if (!text) text = media.get('label'); setHtml(text); }; var setHtml = function (text) { if (text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if (htmlText.get('html')) { setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else { setMediaLabel(index); } } }; var disposeFunction = function () { htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if (playListItemStopToDispose) { playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
      "showPopupPanoramaVideoOverlay": function (popupPanoramaOverlay, closeButtonProperties, stopAudios) { var self = this; var showEndFunction = function () { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function () { if (!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function () { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if (stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function () { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if (closeButtonProperties) { for (var key in closeButtonProperties) { closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if (stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
      "existsKey": function (key) { return key in window; },
      "setStartTimeVideo": function (video, time) { var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function () { for (var i = 0; i < items.length; ++i) { var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for (var i = 0; i < items.length; ++i) { var item = items[i]; var player = item.get('player'); if (player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
      "loopAlbum": function (playList, index) { var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function () { player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
      "setMapLocation": function (panoramaPlayListItem, mapPlayer) { var resetFunction = function () { panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
      "setPanoramaCameraWithSpot": function (playListItem, yaw, pitch) { var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
      "getCurrentPlayers": function () { var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
      "getOverlays": function (media) { switch (media.get('class')) { case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for (var j = 0; j < frames.length; ++j) { overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
      "getMediaHeight": function (media) { switch (media.get('class')) { case 'Video360': var res = media.get('video'); if (res instanceof Array) { var maxH = 0; for (var i = 0; i < res.length; i++) { var r = res[i]; if (r.get('height') > maxH) maxH = r.get('height'); } return maxH; } else { return r.get('height') } default: return media.get('height'); } },
      "getCurrentPlayerWithMedia": function (media) { var playerClass = undefined; var mediaPropertyName = undefined; switch (media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if (playerClass != undefined) { var players = this.getByClassName(playerClass); for (var i = 0; i < players.length; ++i) { var player = players[i]; if (player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
      "historyGoBack": function (playList) { var history = this.get('data')['history'][playList.get('id')]; if (history != undefined) { history.back(); } },
      "setPanoramaCameraWithCurrentSpot": function (playListItem) { var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if (currentPlayer == undefined) { return; } var playerClass = currentPlayer.get('class'); if (playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player') { return; } var fromMedia = currentPlayer.get('panorama'); if (fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
      "cloneCamera": function (camera) { var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
      "getPlayListWithMedia": function (media, onlySelected) { var playLists = this.getByClassName('PlayList'); for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; if (onlySelected && playList.get('selectedIndex') == -1) continue; if (this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
      "setOverlayBehaviour": function (overlay, media, action) { var executeFunc = function () { switch (action) { case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if (overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if (window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function () { delete window.overlaysDispatched[id]; }, 2000); }; if (window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if (playList != undefined) { var item = this.getPlayListItemByMedia(playList, media); if (playList.get('items').indexOf(item) != playList.get('selectedIndex')) { var beginFunc = function (e) { item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
      "getPlayListItemByMedia": function (playList, media) { var items = playList.get('items'); for (var j = 0, countJ = items.length; j < countJ; ++j) { var item = items[j]; if (item.get('media') == media) return item; } return undefined; },
      "initGA": function () { var sendFunc = function (category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for (var i = 0, countI = media.length; i < countI; ++i) { var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for (var j = 0, countJ = overlays.length; j < countJ; ++j) { var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch (overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z < areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for (var i = 0, countI = components.length; i < countI; ++i) { var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for (var i = 0, countI = items.length; i < countI; ++i) { var item = items[i]; var media = item.get('media'); if (!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
      "changeBackgroundWhilePlay": function (playList, index, color) { var stopFunction = function (event) { playListItem.unbind('stop', stopFunction, this); if ((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))) { viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if ((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)) { viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
      "visibleComponentsIfPlayerFlagEnabled": function (components, playerFlag) { var enabled = this.get(playerFlag); for (var i in components) { components[i].set('visible', enabled); } },
      "setMediaBehaviour": function (playList, index, mediaDispatcher) { var self = this; var stateChangeFunction = function (event) { if (event.data.state == 'stopped') { dispose.call(this, true); } }; var onBeginFunction = function () { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if (media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)) { player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function () { var index = playListDispatcher.get('selectedIndex'); if (index != -1) { indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function () { dispose.call(this, false); }; var dispose = function (forceDispose) { if (!playListDispatcher) return; var media = item.get('media'); if ((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if (panoramaSequence && panoramaSequenceIndex != -1) { if (panoramaSequence) { if (panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex - 1].get('class') == 'TargetPanoramaCameraMovement') { var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex - 1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function (event) { initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if (player) { item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for (var i = 0; i < buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if (sameViewerArea) { var currentMedia = this.getMediaFromPlayer(player); if (currentMedia == undefined || currentMedia == item.get('media')) { playListDispatcher.set('selectedIndex', indexDispatcher); } if (playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else { viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if (!mediaDispatcher) { var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if (currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if (!playListDispatcher) { playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if (playList.get('selectedIndex') == index || indexDispatcher == -1) { return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if (sameViewerArea) { if (playList != playListDispatcher) { playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else { viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if (camera) { panoramaSequence = camera.get('initialSequence'); if (panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function (property) { var value = player.get(property); if (value == undefined) return; if (Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for (var i = 0; i < buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if (player != itemDispatcher.get('player') || !mediaDispatcherByParam) { item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
      "getMediaFromPlayer": function (player) { switch (player.get('class')) { case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
      "pauseGlobalAudio": function (audio) { var audios = window.currentGlobalAudios; if (audios) { audio = audios[audio.get('id')]; } if (audio.get('state') == 'playing') audio.pause(); },
      "autotriggerAtStart": function (playList, callback, once) { var onChange = function (event) { callback(); if (once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
      "updateVideoCues": function (playList, index) { var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if (video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function () { if (playList.get('selectedIndex') != index) { video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function (event) { var activeCues = event.data.activeCues; for (var i = 0, count = cues.length; i < count; ++i) { var cue = cues[i]; if (activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime') + 0.5)) { cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
      "showPopupPanoramaOverlay": function (popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio) { var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if (!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function () { var loadedFunction = function () { if (!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function () { var restoreShowDurationFunction = function () { popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if (popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if (!imageHD) { imageHD = popupPanoramaOverlay.get('image'); } if (!toggleImageHD && toggleImage) { toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function () { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
      "pauseGlobalAudiosWhilePlayItem": function (playList, index, exclude) { var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function () { if (playList.get('selectedIndex') != index) { if (hasState) { player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function (event) { var state = event.data.state; if (state == 'stopped') { this.resumeGlobalAudios(caller); } else if (state == 'playing') { this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if (hasState) { player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
      "setMainMediaByName": function (name) { var items = this.mainPlayList.get('items'); for (var i = 0; i < items.length; ++i) { var item = items[i]; if (item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
      "changePlayListWithSameSpot": function (playList, newIndex) { var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
      "historyGoForward": function (playList) { var history = this.get('data')['history'][playList.get('id')]; if (history != undefined) { history.forward(); } },
      "setMainMediaByIndex": function (index) { var item = undefined; if (index >= 0 && index < this.mainPlayList.get('items').length) { this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
      "getMediaWidth": function (media) { switch (media.get('class')) { case 'Video360': var res = media.get('video'); if (res instanceof Array) { var maxW = 0; for (var i = 0; i < res.length; i++) { var r = res[i]; if (r.get('width') > maxW) maxW = r.get('width'); } return maxW; } else { return r.get('width') } default: return media.get('width'); } },
      "getKey": function (key) { return window[key]; }
    },
    "verticalAlign": "top",
    "scrollBarOpacity": 0.5,
    "buttonToggleFullscreen": "this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081",
    "scrollBarMargin": 2,
    "contentOpaque": false,
    "minWidth": 20,
    "defaultVRPointer": "laser",
    "horizontalAlign": "left",
    "downloadEnabled": false,
    "gap": 10,
    "layout": "absolute",
    "height": "100%",
    "paddingTop": 0,
    "shadow": false,
    "paddingBottom": 0,
    "borderRadius": 0,
    "class": "Player",
    "data": {
      "name": "Player1268"
    },
    "overflow": "visible",
    "definitions": [{
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 91.79,
          "backwardYaw": -116.25,
          "distance": 1,
          "panorama": "this.panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -177.54,
          "backwardYaw": 7.74,
          "distance": 1,
          "panorama": "this.panorama_0E3757C5_05AE_1A07_4191_3551B2E75546"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -87.83,
          "backwardYaw": 26.82,
          "distance": 1,
          "panorama": "this.panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_122616_00_023",
      "id": "panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E",
      "thumbnailUrl": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": 82.42,
          "y": 1864,
          "x": 1026.92
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_20B520CD_0A76_6ED8_419D_6AF9BCB0FFEB",
        "this.popup_209CA080_0A76_6D48_419B_E47FA4C680D0",
        "this.overlay_969F3957_A4E7_D73C_41E2_4D63BC74A5EA",
        "this.overlay_E8A6C7F5_AAB4_AB8B_41DE_874B7769C012",
        "this.overlay_E9822846_AADD_E496_41D4_EB41893BFCEF",
        "this.overlay_EE49A424_AADC_AC8A_41CC_984E18FBE311"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -73.66,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EE9FD5C0_AACC_EF89_41C5_EDC1533BD2F0"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 7.62,
      "autoplay": true,
      "id": "popup_209CA080_0A76_6D48_419B_E47FA4C680D0",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 14.66,
      "yaw": 128.32,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uidEE7FB514_AACC_EC89_41C6_AD2EA03FD353VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EAD66F66_AABD_9C96_41BB_4DCACAB645CE, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EAD66F66_AABD_9C96_41BB_4DCACAB645CE, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uidEE7FB514_AACC_EC89_41C6_AD2EA03FD353VideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.viewer_uidEE7FB514_AACC_EC89_41C6_AD2EA03FD353VideoPlayer"
        }
      ],
      "id": "PlayList_EAD66F66_AABD_9C96_41BB_4DCACAB645CE"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window100848"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E861D049_AABF_E49A_41DD_3C21C1AFF596",
      "bodyBackgroundColorDirection": "vertical",
      "titlePaddingLeft": 5,
      "scrollBarColor": "#000000",
      "horizontalAlign": "center",
      "bodyPaddingTop": 0,
      "closeButtonRollOverBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "paddingLeft": 0,
      "headerVerticalAlign": "middle",
      "closeButtonPaddingTop": 5,
      "headerBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "bodyBackgroundOpacity": 0,
      "footerHeight": 5,
      "minHeight": 20,
      "scrollBarVisible": "rollOver",
      "scrollBarOpacity": 0.5,
      "closeButtonRollOverBackgroundColorDirection": "vertical",
      "veilColor": [
        "#000000",
        "#000000"
      ],
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "modal": true,
      "minWidth": 20,
      "veilColorRatios": [
        0,
        1
      ],
      "titleFontSize": "1.29vmin",
      "bodyPaddingBottom": 0,
      "closeButtonBorderColor": "#000000",
      "headerBackgroundColorDirection": "vertical",
      "backgroundColor": [],
      "closeButtonBackgroundColorDirection": "vertical",
      "shadowSpread": 1,
      "shadowVerticalLength": 0,
      "closeButtonBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverIconLineWidth": 5,
      "backgroundOpacity": 1,
      "closeButtonPressedIconLineWidth": 5,
      "shadow": true,
      "titlePaddingTop": 5,
      "class": "Window",
      "closeButtonPressedBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBorderColor": "#000000",
      "footerBackgroundOpacity": 0,
      "closeButtonPressedBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "overflow": "scroll",
      "veilOpacity": 0.4,
      "footerBackgroundColor": [
        "#FFFFFF",
        "#EEEEEE",
        "#DDDDDD"
      ],
      "propagateClick": false,
      "closeButtonRollOverBorderSize": 0,
      "headerPaddingRight": 0,
      "footerBackgroundColorDirection": "vertical",
      "children": [
        "this.viewer_uidEE7D1515_AACC_EC8A_41D2_9C60329C9E68"
      ],
      "veilShowEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "titlePaddingRight": 5,
      "closeButtonIconHeight": 20,
      "paddingRight": 0,
      "shadowColor": "#000000",
      "borderSize": 0,
      "titleFontFamily": "Arial",
      "headerPaddingBottom": 5,
      "backgroundColorDirection": "vertical",
      "closeButtonPressedBackgroundOpacity": 0.3,
      "closeButtonIconColor": "#000000",
      "closeButtonBackgroundOpacity": 0.3,
      "footerBackgroundColorRatios": [
        0,
        0.9,
        1
      ],
      "hideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "contentOpaque": false,
      "closeButtonPaddingRight": 5,
      "scrollBarMargin": 2,
      "closeButtonPaddingLeft": 5,
      "closeButtonPaddingBottom": 5,
      "headerPaddingLeft": 10,
      "veilHideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "headerPaddingTop": 10,
      "closeButtonBorderSize": 0,
      "closeButtonBorderRadius": 0,
      "shadowBlurRadius": 6,
      "bodyBackgroundColor": [
        "#FFFFFF",
        "#DDDDDD",
        "#FFFFFF"
      ],
      "shadowHorizontalLength": 3,
      "gap": 10,
      "layout": "vertical",
      "closeButtonPressedBorderColor": "#000000",
      "headerBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "headerBackgroundOpacity": 0,
      "closeButtonBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "shadowOpacity": 0.5,
      "bodyPaddingLeft": 0,
      "closeButtonIconLineWidth": 5,
      "paddingBottom": 0,
      "borderRadius": 5,
      "titlePaddingBottom": 5,
      "paddingTop": 0,
      "closeButtonRollOverBackgroundOpacity": 0.3,
      "scrollBarWidth": 10,
      "closeButtonIconWidth": 20,
      "bodyBackgroundColorRatios": [
        0,
        0.5,
        1
      ],
      "closeButtonRollOverIconColor": "#666666"
    },
    {
      "class": "PlayList",
      "items": [
        "this.PanoramaPlayListItem_EE16F521_AACC_EC8A_41D1_A45623E59DAA",
        "this.PanoramaPlayListItem_EE160522_AACC_EC8E_41DF_60CF39B98A10",
        "this.PanoramaPlayListItem_EE17B522_AACC_EC8E_41D8_3C2AC32C5D53",
        "this.PanoramaPlayListItem_EE173522_AACC_EC8E_41E1_1E050CC7D8DF",
        "this.PanoramaPlayListItem_EE14A523_AACC_EC8E_41DC_6FA6CE5D25CF",
        "this.PanoramaPlayListItem_EE15F523_AACC_EC8E_41D1_CE9F3A66A533",
        "this.PanoramaPlayListItem_EE157523_AACC_EC8E_41C8_A2771D184396",
        "this.PanoramaPlayListItem_EE1A8523_AACC_EC8E_41E2_5C2ECD8701AA",
        "this.PanoramaPlayListItem_EE15B525_AACC_EC8B_41D8_BE0FA4115BE2",
        "this.PanoramaPlayListItem_EE153525_AACC_EC8B_41C7_1E6697F4C880",
        "this.PanoramaPlayListItem_EE1AA525_AACC_EC8B_41D7_25D73BF47CC2",
        "this.PanoramaPlayListItem_EE1BD525_AACC_EC8B_41CC_D5B8B1D2C171",
        "this.PanoramaPlayListItem_EE1B7526_AACC_EC96_41D1_FBCC3CEA342C",
        "this.PanoramaPlayListItem_EE189526_AACC_EC96_41E0_68FA17D42B09",
        "this.PanoramaPlayListItem_EE182526_AACC_EC96_4180_6D1097B699B7"
      ],
      "id": "mainPlayList"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_camera"
    },
    {
      "class": "MapPlayer",
      "viewerArea": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4",
      "id": "ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer",
      "movementMode": "constrained"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -119.56,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EE8AB5CD_AACC_EF9B_41E2_87BD52EBCEBF"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -48.73,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EEC6F572_AACC_EC89_41E1_58C2060C35E5"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -179.06,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EF40960F_AACC_EC97_41E4_410CACA1F45A"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_camera"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -20.97,
          "backwardYaw": 131.27,
          "distance": 1,
          "panorama": "this.panorama_0E78D269_05AE_3A0F_4194_073D5A49809B"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -104.45,
          "backwardYaw": -99.92,
          "distance": 1,
          "panorama": "this.panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_124037_00_037",
      "id": "panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F",
      "thumbnailUrl": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": 18.57,
          "y": 563.43,
          "x": 1846.72
        }
      ],
      "vfov": 180,
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/f/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/u/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/r/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/b/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/d/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0/l/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_944A91E5_A43C_D71C_419D_1E8686154957",
        "this.overlay_89FF11AA_A424_5714_41D1_4AC62C89A920",
        "this.overlay_8ABA3E9A_A425_CD37_41D5_48A76E11F6F7",
        "this.overlay_E9C3663D_AAD5_ECFA_41D2_E24D84985EBF",
        "this.overlay_EC1B1EDF_AAD5_9DB7_41DD_94658C7036E4"
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 131.27,
          "backwardYaw": -20.97,
          "distance": 1,
          "panorama": "this.panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_124008_00_036",
      "id": "panorama_0E78D269_05AE_3A0F_4194_073D5A49809B",
      "thumbnailUrl": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": 39.18,
          "y": 256.62,
          "x": 1841.74
        }
      ],
      "vfov": 180,
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/f/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/u/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/r/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/b/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/d/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0/l/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_97375842_A42C_D514_41A9_8254D9236165",
        "this.overlay_8BF82655_A42C_DD3D_41D5_C8AA02BD93FE",
        "this.overlay_8B5E74E5_A424_3D1D_41E0_447C64E4263F",
        "this.overlay_EA51FB2F_AAD5_6497_41D6_12A778F80FA3"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 51.89,
        "pitch": -6.89
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EB8A6749_AACC_EC9A_41E5_0094F29AC909"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 152.8,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EB83173C_AACC_ECFA_4189_DDA63B483810"
    },
    {
      "class": "FadeInEffect",
      "duration": 500,
      "id": "FadeInEffect_95F42308_A424_7B14_41C9_4D184F418D24",
      "easing": "cubic_in"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -27.2,
          "backwardYaw": 155.63,
          "distance": 1,
          "panorama": "this.panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 142.41,
          "backwardYaw": 151.86,
          "distance": 1,
          "panorama": "this.panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_122954_00_025",
      "id": "panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6",
      "thumbnailUrl": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": -59.54,
          "y": 2428.45,
          "x": 624.32
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_2C58D54E_0A52_FE05_4137_464CBDB0F4FC",
        "this.popup_296F41B4_0A72_6F49_4193_E31832353C88",
        "this.overlay_95C21AA5_A4EC_551D_41E3_5C775D1D406D",
        "this.popup_8A825FD4_A4EC_CB33_41E2_F14C9CC9B1AB",
        "this.overlay_E8CE68AC_AAB4_A59A_41DC_1FE5B20E5A8A",
        "this.overlay_EA4D496D_AAB4_E49B_41DD_B21C2B951048"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -34.56,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EEEA85A5_AACC_EF8A_41A2_9BA22A9C4652"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -28.14,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EED96565_AACC_EC8B_41AF_C8CC10C8DC7B"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_178EA809_0AB3_F60F_4186_C50C59D04D1A",
      "levels": [
        {
          "url": "media/popup_178E9809_0AB3_F60F_4198_84C0F5DE4EB4_0_0.png",
          "class": "ImageResourceLevel",
          "width": 3712,
          "height": 5250
        },
        {
          "url": "media/popup_178E9809_0AB3_F60F_4198_84C0F5DE4EB4_0_1.png",
          "class": "ImageResourceLevel",
          "width": 2896,
          "height": 4096
        },
        {
          "url": "media/popup_178E9809_0AB3_F60F_4198_84C0F5DE4EB4_0_2.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_178E9809_0AB3_F60F_4198_84C0F5DE4EB4_0_3.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_178E9809_0AB3_F60F_4198_84C0F5DE4EB4_0_4.png",
          "class": "ImageResourceLevel",
          "width": 362,
          "height": 512
        }
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0.38,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EBE0B6D7_AACC_EDB6_41E0_89829025B1C6"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window100849"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E861B04A_AABF_E49E_41DD_0395207151EF",
      "bodyBackgroundColorDirection": "vertical",
      "titlePaddingLeft": 5,
      "scrollBarColor": "#000000",
      "horizontalAlign": "center",
      "bodyPaddingTop": 0,
      "closeButtonRollOverBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "paddingLeft": 0,
      "headerVerticalAlign": "middle",
      "closeButtonPaddingTop": 5,
      "headerBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "bodyBackgroundOpacity": 0,
      "footerHeight": 5,
      "minHeight": 20,
      "scrollBarVisible": "rollOver",
      "scrollBarOpacity": 0.5,
      "closeButtonRollOverBackgroundColorDirection": "vertical",
      "veilColor": [
        "#000000",
        "#000000"
      ],
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "modal": true,
      "minWidth": 20,
      "veilColorRatios": [
        0,
        1
      ],
      "titleFontSize": "1.29vmin",
      "bodyPaddingBottom": 0,
      "closeButtonBorderColor": "#000000",
      "headerBackgroundColorDirection": "vertical",
      "backgroundColor": [],
      "closeButtonBackgroundColorDirection": "vertical",
      "shadowSpread": 1,
      "shadowVerticalLength": 0,
      "closeButtonBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverIconLineWidth": 5,
      "backgroundOpacity": 1,
      "closeButtonPressedIconLineWidth": 5,
      "shadow": true,
      "titlePaddingTop": 5,
      "class": "Window",
      "closeButtonPressedBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBorderColor": "#000000",
      "footerBackgroundOpacity": 0,
      "closeButtonPressedBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "overflow": "scroll",
      "veilOpacity": 0.4,
      "footerBackgroundColor": [
        "#FFFFFF",
        "#EEEEEE",
        "#DDDDDD"
      ],
      "propagateClick": false,
      "closeButtonRollOverBorderSize": 0,
      "headerPaddingRight": 0,
      "footerBackgroundColorDirection": "vertical",
      "children": [
        "this.viewer_uidEE63B516_AACC_ECB6_41D4_785BB540EA2C"
      ],
      "veilShowEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "titlePaddingRight": 5,
      "closeButtonIconHeight": 20,
      "paddingRight": 0,
      "shadowColor": "#000000",
      "borderSize": 0,
      "titleFontFamily": "Arial",
      "headerPaddingBottom": 5,
      "backgroundColorDirection": "vertical",
      "closeButtonPressedBackgroundOpacity": 0.3,
      "closeButtonIconColor": "#000000",
      "closeButtonBackgroundOpacity": 0.3,
      "footerBackgroundColorRatios": [
        0,
        0.9,
        1
      ],
      "hideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "contentOpaque": false,
      "closeButtonPaddingRight": 5,
      "scrollBarMargin": 2,
      "closeButtonPaddingLeft": 5,
      "closeButtonPaddingBottom": 5,
      "headerPaddingLeft": 10,
      "veilHideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "headerPaddingTop": 10,
      "closeButtonBorderSize": 0,
      "closeButtonBorderRadius": 0,
      "shadowBlurRadius": 6,
      "bodyBackgroundColor": [
        "#FFFFFF",
        "#DDDDDD",
        "#FFFFFF"
      ],
      "shadowHorizontalLength": 3,
      "gap": 10,
      "layout": "vertical",
      "closeButtonPressedBorderColor": "#000000",
      "headerBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "headerBackgroundOpacity": 0,
      "closeButtonBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "shadowOpacity": 0.5,
      "bodyPaddingLeft": 0,
      "closeButtonIconLineWidth": 5,
      "paddingBottom": 0,
      "borderRadius": 5,
      "titlePaddingBottom": 5,
      "paddingTop": 0,
      "closeButtonRollOverBackgroundOpacity": 0.3,
      "scrollBarWidth": 10,
      "closeButtonIconWidth": 20,
      "bodyBackgroundColorRatios": [
        0,
        0.5,
        1
      ],
      "closeButtonRollOverIconColor": "#666666"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 75.55,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EBF436A3_AACC_ED8F_41D2_58B5E1600FEC"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uidEE63B516_AACC_ECB6_41D4_785BB540EA2CVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EAD69F68_AABD_9C9A_41E0_749EF6C6C8B5, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EAD69F68_AABD_9C9A_41E0_749EF6C6C8B5, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uidEE63B516_AACC_ECB6_41D4_785BB540EA2CVideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.viewer_uidEE63B516_AACC_ECB6_41D4_785BB540EA2CVideoPlayer"
        }
      ],
      "id": "PlayList_EAD69F68_AABD_9C9A_41E0_749EF6C6C8B5"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_EE11F521_AACC_EC8A_41B2_31884FDD8B93, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_EE11F521_AACC_EC8A_41B2_31884FDD8B93, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
          "media": "this.video_2F117E51_3EF1_E5E3_41C6_6B4D85E12D32",
          "player": "this.MainViewerVideoPlayer"
        }
      ],
      "id": "playList_EE11F521_AACC_EC8A_41B2_31884FDD8B93"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -119.18,
          "backwardYaw": 106.34,
          "distance": 1,
          "panorama": "this.panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -179.62,
          "backwardYaw": 60.44,
          "distance": 1,
          "panorama": "this.panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 0.94,
          "backwardYaw": 84.43,
          "distance": 1,
          "panorama": "this.panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_123425_00_032",
      "id": "panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C",
      "thumbnailUrl": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": 88.09,
          "y": 593.52,
          "x": 1093.34
        }
      ],
      "vfov": 180,
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/f/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/u/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/r/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/b/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/d/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0/l/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_2D20B229_0AB2_1A0F_4198_917A678E0BC5",
        "this.overlay_2B88269A_0AB6_1A0D_4195_7406D39285C9",
        "this.popup_2A8D7960_0AB6_163D_419A_11A867D54C57",
        "this.overlay_2890A972_0A56_161D_419B_2D242AFD6226",
        "this.popup_2D415209_0AB2_1A0F_4193_0E51D91DB627",
        "this.popup_39753FBC_0BB2_12B8_4179_7561D1FA8826",
        "this.overlay_30027219_3EF3_9D63_4195_457676AF905A",
        "this.overlay_30039219_3EF3_9D63_41C7_7EA0856C7BE9",
        "this.popup_94D039CD_A46D_F72C_41E1_97B12859F9ED",
        "this.overlay_8BEC8F59_A464_4B35_41DB_3DC7ED3DBFF3",
        "this.overlay_89E8BB62_A464_4B17_41D9_874E05C32FCB",
        "this.overlay_8A3FABD4_A467_CB33_41CA_B32DA7A2C1C3",
        "this.overlay_ED6C41C8_AAD5_A79A_41D2_1B60F43907A8",
        "this.overlay_EC40701F_AAD4_E4B7_41DF_8303EAB2394B",
        "this.overlay_EB54B96D_AADD_A49A_41E2_96CBD9B8C3B9",
        "this.overlay_EE01C25E_AADC_A4B9_41D8_638A6F0003F0"
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.66,
      "id": "popup_2A8DE82E_0AB2_1605_4197_CDF36D85FF90",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2A8DE82E_0AB2_1605_4197_CDF36D85FF90_0_3.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 3.63,
      "yaw": 78.26,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window100847"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E860A048_AABF_E49A_41C9_507231FDBAAB",
      "bodyBackgroundColorDirection": "vertical",
      "titlePaddingLeft": 5,
      "scrollBarColor": "#000000",
      "horizontalAlign": "center",
      "bodyPaddingTop": 0,
      "closeButtonRollOverBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "paddingLeft": 0,
      "headerVerticalAlign": "middle",
      "closeButtonPaddingTop": 5,
      "headerBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "bodyBackgroundOpacity": 0,
      "footerHeight": 5,
      "minHeight": 20,
      "scrollBarVisible": "rollOver",
      "scrollBarOpacity": 0.5,
      "closeButtonRollOverBackgroundColorDirection": "vertical",
      "veilColor": [
        "#000000",
        "#000000"
      ],
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "modal": true,
      "minWidth": 20,
      "veilColorRatios": [
        0,
        1
      ],
      "titleFontSize": "1.29vmin",
      "bodyPaddingBottom": 0,
      "closeButtonBorderColor": "#000000",
      "headerBackgroundColorDirection": "vertical",
      "backgroundColor": [],
      "closeButtonBackgroundColorDirection": "vertical",
      "shadowSpread": 1,
      "shadowVerticalLength": 0,
      "closeButtonBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverIconLineWidth": 5,
      "backgroundOpacity": 1,
      "closeButtonPressedIconLineWidth": 5,
      "shadow": true,
      "titlePaddingTop": 5,
      "class": "Window",
      "closeButtonPressedBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBorderColor": "#000000",
      "footerBackgroundOpacity": 0,
      "closeButtonPressedBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "overflow": "scroll",
      "veilOpacity": 0.4,
      "footerBackgroundColor": [
        "#FFFFFF",
        "#EEEEEE",
        "#DDDDDD"
      ],
      "propagateClick": false,
      "closeButtonRollOverBorderSize": 0,
      "headerPaddingRight": 0,
      "footerBackgroundColorDirection": "vertical",
      "children": [
        "this.viewer_uidEE7EE512_AACC_EC8E_41DD_466BC7B9EFAA"
      ],
      "veilShowEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "titlePaddingRight": 5,
      "closeButtonIconHeight": 20,
      "paddingRight": 0,
      "shadowColor": "#000000",
      "borderSize": 0,
      "titleFontFamily": "Arial",
      "headerPaddingBottom": 5,
      "backgroundColorDirection": "vertical",
      "closeButtonPressedBackgroundOpacity": 0.3,
      "closeButtonIconColor": "#000000",
      "closeButtonBackgroundOpacity": 0.3,
      "footerBackgroundColorRatios": [
        0,
        0.9,
        1
      ],
      "hideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "contentOpaque": false,
      "closeButtonPaddingRight": 5,
      "scrollBarMargin": 2,
      "closeButtonPaddingLeft": 5,
      "closeButtonPaddingBottom": 5,
      "headerPaddingLeft": 10,
      "veilHideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "headerPaddingTop": 10,
      "closeButtonBorderSize": 0,
      "closeButtonBorderRadius": 0,
      "shadowBlurRadius": 6,
      "bodyBackgroundColor": [
        "#FFFFFF",
        "#DDDDDD",
        "#FFFFFF"
      ],
      "shadowHorizontalLength": 3,
      "gap": 10,
      "layout": "vertical",
      "closeButtonPressedBorderColor": "#000000",
      "headerBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "headerBackgroundOpacity": 0,
      "closeButtonBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "shadowOpacity": 0.5,
      "bodyPaddingLeft": 0,
      "closeButtonIconLineWidth": 5,
      "paddingBottom": 0,
      "borderRadius": 5,
      "titlePaddingBottom": 5,
      "paddingTop": 0,
      "closeButtonRollOverBackgroundOpacity": 0.3,
      "scrollBarWidth": 10,
      "closeButtonIconWidth": 20,
      "bodyBackgroundColorRatios": [
        0,
        0.5,
        1
      ],
      "closeButtonRollOverIconColor": "#666666"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uidEE7D1515_AACC_EC8A_41D2_9C60329C9E68VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EAD6FF66_AABD_9C96_41E2_E8EA8ABA1B38, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EAD6FF66_AABD_9C96_41E2_E8EA8ABA1B38, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uidEE7D1515_AACC_EC8A_41D2_9C60329C9E68VideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.viewer_uidEE7D1515_AACC_EC8A_41D2_9C60329C9E68VideoPlayer"
        }
      ],
      "id": "PlayList_EAD6FF66_AABD_9C96_41E2_E8EA8ABA1B38"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2A8C5839_0AD2_360F_4165_9FFC5FD9DC7B",
      "levels": [
        {
          "url": "media/popup_2A1223CC_0AD6_FA05_4184_92549CC03285_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1280,
          "height": 720
        },
        {
          "url": "media/popup_2A1223CC_0AD6_FA05_4184_92549CC03285_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 576
        },
        {
          "url": "media/popup_2A1223CC_0AD6_FA05_4184_92549CC03285_0_2.png",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 288
        }
      ]
    },
    {
      "fieldOfViewOverlayOutsideOpacity": 0,
      "label": "bigmap",
      "id": "map_3F06E654_2A3C_10AF_419C_CAA672FC614E",
      "minimumZoomFactor": 0.5,
      "thumbnailUrl": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_t.png",
      "width": 2083,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E.png",
            "class": "ImageResourceLevel",
            "width": 2083,
            "height": 2500
          },
          {
            "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_lq.png",
            "class": "ImageResourceLevel",
            "width": 233,
            "height": 280,
            "tags": "preload"
          }
        ]
      },
      "fieldOfViewOverlayRadiusScale": 0.3,
      "fieldOfViewOverlayOutsideColor": "#000000",
      "maximumZoomFactor": 1.2,
      "class": "Map",
      "fieldOfViewOverlayInsideOpacity": 0.4,
      "scaleMode": "fit_inside",
      "initialZoomFactor": 1,
      "fieldOfViewOverlayInsideColor": "#FFFFFF",
      "height": 2500,
      "overlays": [
        "this.overlay_3FAD0AF0_2A24_3167_41A6_053185D5BEFA",
        "this.overlay_3FAD7AF0_2A24_3167_41A9_E42E6F3636D0",
        "this.overlay_3FAD5AF0_2A24_3167_41A3_A6990286F421",
        "this.overlay_3FADBAF0_2A24_3167_41B3_8EA529BD38ED",
        "this.overlay_3FADCAF0_2A24_3167_41C0_493985AB4628",
        "this.overlay_3FADDAF0_2A24_3167_41C4_B55B983C518B",
        "this.overlay_3FACAAF0_2A24_3167_41BF_873F393CCBF5",
        "this.overlay_3FAC8AF2_2A24_316B_41C1_C7FA34B94E21",
        "this.overlay_3FACFAF2_2A24_316B_41A9_96EE67D92056",
        "this.overlay_3FAD2AF2_2A24_316B_41AE_A32D849AF0A8",
        "this.overlay_3FAD0AF2_2A24_316B_41C0_A6892E2BBFC9",
        "this.overlay_3FAD6AF2_2A24_316B_41B3_8FE9F2C03890",
        "this.overlay_3F5A6E14_2A24_10AF_419A_3F976178F733",
        "this.overlay_3F5A0E14_2A24_10AF_41BD_881D786F593C",
        "this.overlay_3F45DE14_2A24_10AF_41B0_E851E9FCF261"
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uidEE61A517_AACC_ECB6_41D8_A9F2D9C48545VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EAD43F69_AABD_9C9A_41E1_FA0A11F3A74B, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EAD43F69_AABD_9C9A_41E1_FA0A11F3A74B, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uidEE61A517_AACC_ECB6_41D8_A9F2D9C48545VideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.viewer_uidEE61A517_AACC_ECB6_41D8_A9F2D9C48545VideoPlayer"
        }
      ],
      "id": "PlayList_EAD43F69_AABD_9C9A_41E1_FA0A11F3A74B"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uidEE7EE512_AACC_EC8E_41DD_466BC7B9EFAAVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EAD7BF66_AABD_9C96_41E4_768D89849A0D, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EAD7BF66_AABD_9C96_41E4_768D89849A0D, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uidEE7EE512_AACC_EC8E_41DD_466BC7B9EFAAVideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.viewer_uidEE7EE512_AACC_EC8E_41DD_466BC7B9EFAAVideoPlayer"
        }
      ],
      "id": "PlayList_EAD7BF66_AABD_9C96_41E4_768D89849A0D"
    },
    {
      "class": "Video",
      "label": "Laboratorium komputer (3)",
      "scaleMode": "fit_inside",
      "thumbnailUrl": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0_t.jpg",
      "width": 2964,
      "loop": false,
      "id": "video_281955BC_0A56_3E06_4197_1E835277D5D0",
      "height": 1694,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 75.55,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EBF946B2_AACC_ED8E_41AB_075A86CEBCE9"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_camera"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 7.11,
      "autoplay": true,
      "id": "popup_97D9C52E_A4EC_5F6C_41A7_768B48A23B29",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 8.42,
      "yaw": 51.8,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -155.07,
          "backwardYaw": 135.24,
          "distance": 1,
          "panorama": "this.panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_123553_00_033",
      "id": "panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C",
      "thumbnailUrl": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": -104.23,
          "y": 1197.33,
          "x": 194.12
        }
      ],
      "vfov": 180,
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/f/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/u/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/r/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/b/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/d/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0/l/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_2B134E88_0AB2_0A0E_4181_33E9171EFFBC",
        "this.overlay_2B13BE88_0AB2_0A0E_41A0_973194D03AC6",
        "this.popup_2B4ECE46_0AB2_0A05_41A0_79862BE9B3E4",
        "this.popup_2B31EE53_0AB2_0A03_4158_8FE8685CD958",
        "this.overlay_89BD41B0_A4DC_3774_419F_4B85259D0E74",
        "this.overlay_9D386B76_A4DC_4BFF_41D5_5C09D9C815CD",
        "this.overlay_9D85F308_A4DC_7B13_41D5_B3606CE7C53A",
        "this.overlay_9C37CB0F_A4DC_4B2D_41D9_B901C35EDF70",
        "this.overlay_9C94C1F3_A4DC_76F5_41D9_43A2C024E1C5",
        "this.overlay_EA564714_AAD4_AC8A_41DB_7451A0BCB4A9",
        "this.overlay_EBB44A9C_AAD7_65B9_41E3_53DC85BACEB9",
        "this.overlay_EEED142B_AAD7_EC9F_41C2_D133B1E05B8A"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -88.21,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EBE9E6FD_AACC_ED7A_41E3_83F3376CBC8A"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -95.57,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EEB1D5D9_AACC_EFBA_41D4_E49D94E2F0E8"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 59.31,
          "backwardYaw": -135.42,
          "distance": 1,
          "panorama": "this.panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 145.44,
          "backwardYaw": -33.81,
          "distance": 1,
          "panorama": "this.panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_123252_00_030",
      "id": "panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A",
      "thumbnailUrl": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": 39.03,
          "y": 89.07,
          "x": 226.71
        }
      ],
      "vfov": 180,
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/f/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/u/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/r/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/b/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/d/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0/l/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_33622F95_3EF3_E363_41B2_C18F43F76016",
        "this.overlay_320B2D46_3EF2_A7E1_41C8_F58E26D0C707",
        "this.popup_8BFF396C_A4E4_D713_41A1_10AED543F7D2",
        "this.popup_8A192DBB_A4E4_CF75_41C1_8249A74893DE",
        "this.overlay_E9F6F5E9_AACB_AF9B_41D1_84BDA56FCC39",
        "this.overlay_EB7E3469_AACB_6C9A_41CC_945B849EA6E5"
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 146.38,
          "backwardYaw": -179.62,
          "distance": 1,
          "panorama": "this.panorama_0E3757C5_05AE_1A07_4191_3551B2E75546"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_123055_00_027",
      "id": "panorama_0E181F5E_05AE_0A05_416D_04530F9BD830",
      "thumbnailUrl": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": -27.41,
          "y": 1846.9,
          "x": 212.29
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_28A918BC_0A72_1605_4196_F5993A1D0AC6",
        "this.overlay_95AAEF2E_A4E4_4B6F_41DD_8C4A636F2AC0",
        "this.overlay_EC5E44A8_AACD_AD9A_41E1_D18D3FD96799",
        "this.overlay_EF9AAF67_AACD_BC96_41E0_E2D67603A263"
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.67,
      "id": "popup_178324D3_0AD2_FE03_4178_16C6EB766305",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_178324D3_0AD2_FE03_4178_16C6EB766305_0_3.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": -1.63,
      "yaw": -85.37,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
          "class": "MapPlayListItem",
          "media": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "player": "this.MapViewerMapPlayer"
        }
      ],
      "id": "playList_EE109521_AACC_EC8A_41E0_5A77C51D3C50"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2C30B1F0_0A72_2EC8_4172_E20A21E8BFF0",
      "levels": [
        {
          "url": "media/popup_2A8D7960_0AB6_163D_419A_11A867D54C57_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1280,
          "height": 720
        },
        {
          "url": "media/popup_2A8D7960_0AB6_163D_419A_11A867D54C57_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 576
        },
        {
          "url": "media/popup_2A8D7960_0AB6_163D_419A_11A867D54C57_0_2.png",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 288
        }
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -44.76,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EC51B79E_AACC_EBB9_41B2_D40C3803E0E3"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -172.26,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EB94C720_AACC_EC8A_41C6_EF688766B301"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 2.46,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EBB46766_AACC_EC89_41E3_9569B0221A30"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -120.69,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EEAB15F3_AACC_EF8E_41A5_263A3AA78FB9"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 63.75,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EB935710_AACC_EC8A_41C8_0F7DF608BDB0"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 7.67,
      "id": "popup_2B31EE53_0AB2_0A03_4158_8FE8685CD958",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2B31EE53_0AB2_0A03_4158_8FE8685CD958_0_1.png",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 576
          }
        ]
      },
      "pitch": 2.58,
      "yaw": -166.15,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 151.86,
          "backwardYaw": 142.41,
          "distance": 1,
          "panorama": "this.panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -116.25,
          "backwardYaw": 91.79,
          "distance": 1,
          "panorama": "this.panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_122655_00_024",
      "id": "panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7",
      "thumbnailUrl": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": 128.33,
          "y": 2432.19,
          "x": 1034.4
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_99C569FC_A4ED_F6F3_41D1_857D01F1E4FD",
        "this.overlay_E841A5EF_AAB5_EF96_41E4_D846E50333BE",
        "this.overlay_EA489FD2_AAB5_7B8E_41DE_5BD315FB03C1"
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2B4F2E46_0AB2_0A05_4193_1692F5F776E7",
      "levels": [
        {
          "url": "media/popup_2B4ECE46_0AB2_0A05_41A0_79862BE9B3E4_0_0.png",
          "class": "ImageResourceLevel",
          "width": 3712,
          "height": 5250
        },
        {
          "url": "media/popup_2B4ECE46_0AB2_0A05_41A0_79862BE9B3E4_0_1.png",
          "class": "ImageResourceLevel",
          "width": 2896,
          "height": 4096
        },
        {
          "url": "media/popup_2B4ECE46_0AB2_0A05_41A0_79862BE9B3E4_0_2.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_2B4ECE46_0AB2_0A05_41A0_79862BE9B3E4_0_3.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_2B4ECE46_0AB2_0A05_41A0_79862BE9B3E4_0_4.png",
          "class": "ImageResourceLevel",
          "width": 362,
          "height": 512
        }
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 92.17,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EBBC7774_AACC_EC89_41CE_BD41E94506F0"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_95F4D308_A424_7B14_41C4_C0CE7476743A",
      "levels": [
        {
          "url": "media/panduan_baru.png",
          "width": 1024,
          "class": "ImageResourceLevel",
          "height": 585
        }
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 155.63,
          "backwardYaw": -27.2,
          "distance": 1,
          "panorama": "this.panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0E181F5E_05AE_0A05_416D_04530F9BD830"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_123021_00_026",
      "id": "panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA",
      "thumbnailUrl": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": -63.26,
          "y": 2422.4,
          "x": 200.89
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_2D8A8E2D_0A72_F558_419F_C2BA5EFD7DAF",
        "this.popup_2C649E03_0A72_F548_41A0_50F482DEA885",
        "this.overlay_94AE32E5_A4E4_D51C_41D4_F5B9B7BC69B4",
        "this.overlay_EC42D9B7_AACB_E7F7_418B_F9D4AD5B3111",
        "this.overlay_EA4C9CB5_AACD_7D8A_41D7_B13664BA8715"
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 7.65,
      "id": "popup_2A1223CC_0AD6_FA05_4184_92549CC03285",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2A1223CC_0AD6_FA05_4184_92549CC03285_0_1.png",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 576
          }
        ]
      },
      "pitch": 5.24,
      "yaw": -77.78,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaPlayer",
      "buttonCardboardView": "this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7",
      "buttonToggleHotspots": "this.IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781",
      "viewerArea": "this.MainViewer",
      "touchControlMode": "drag_acceleration",
      "id": "MainViewerPanoramaPlayer",
      "gyroscopeVerticalDraggingEnabled": true,
      "displayPlaybackBar": true,
      "buttonToggleGyroscope": "this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250",
      "mouseControlMode": "drag_acceleration"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0.38,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EE9185B2_AACC_EF89_41CE_F89B27D6DF01"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window100868"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E8A78108_AABF_E49A_41DD_A9711C5B1813",
      "bodyBackgroundColorDirection": "vertical",
      "titlePaddingLeft": 5,
      "scrollBarColor": "#000000",
      "horizontalAlign": "center",
      "bodyPaddingTop": 0,
      "closeButtonRollOverBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "paddingLeft": 0,
      "headerVerticalAlign": "middle",
      "closeButtonPaddingTop": 5,
      "headerBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "bodyBackgroundOpacity": 0,
      "footerHeight": 5,
      "minHeight": 20,
      "scrollBarVisible": "rollOver",
      "scrollBarOpacity": 0.5,
      "closeButtonRollOverBackgroundColorDirection": "vertical",
      "veilColor": [
        "#000000",
        "#000000"
      ],
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "modal": true,
      "minWidth": 20,
      "veilColorRatios": [
        0,
        1
      ],
      "titleFontSize": "1.29vmin",
      "bodyPaddingBottom": 0,
      "closeButtonBorderColor": "#000000",
      "headerBackgroundColorDirection": "vertical",
      "backgroundColor": [],
      "closeButtonBackgroundColorDirection": "vertical",
      "shadowSpread": 1,
      "shadowVerticalLength": 0,
      "closeButtonBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverIconLineWidth": 5,
      "backgroundOpacity": 1,
      "closeButtonPressedIconLineWidth": 5,
      "shadow": true,
      "titlePaddingTop": 5,
      "class": "Window",
      "closeButtonPressedBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBorderColor": "#000000",
      "footerBackgroundOpacity": 0,
      "closeButtonPressedBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "overflow": "scroll",
      "veilOpacity": 0.4,
      "footerBackgroundColor": [
        "#FFFFFF",
        "#EEEEEE",
        "#DDDDDD"
      ],
      "propagateClick": false,
      "closeButtonRollOverBorderSize": 0,
      "headerPaddingRight": 0,
      "footerBackgroundColorDirection": "vertical",
      "children": [
        "this.viewer_uidEE78B511_AACC_EC8B_41D9_87425C77F79A"
      ],
      "veilShowEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "titlePaddingRight": 5,
      "closeButtonIconHeight": 20,
      "paddingRight": 0,
      "shadowColor": "#000000",
      "borderSize": 0,
      "titleFontFamily": "Arial",
      "headerPaddingBottom": 5,
      "backgroundColorDirection": "vertical",
      "closeButtonPressedBackgroundOpacity": 0.3,
      "closeButtonIconColor": "#000000",
      "closeButtonBackgroundOpacity": 0.3,
      "footerBackgroundColorRatios": [
        0,
        0.9,
        1
      ],
      "hideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "contentOpaque": false,
      "closeButtonPaddingRight": 5,
      "scrollBarMargin": 2,
      "closeButtonPaddingLeft": 5,
      "closeButtonPaddingBottom": 5,
      "headerPaddingLeft": 10,
      "veilHideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "headerPaddingTop": 10,
      "closeButtonBorderSize": 0,
      "closeButtonBorderRadius": 0,
      "shadowBlurRadius": 6,
      "bodyBackgroundColor": [
        "#FFFFFF",
        "#DDDDDD",
        "#FFFFFF"
      ],
      "shadowHorizontalLength": 3,
      "gap": 10,
      "layout": "vertical",
      "closeButtonPressedBorderColor": "#000000",
      "headerBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "headerBackgroundOpacity": 0,
      "closeButtonBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "shadowOpacity": 0.5,
      "bodyPaddingLeft": 0,
      "closeButtonIconLineWidth": 5,
      "paddingBottom": 0,
      "borderRadius": 5,
      "titlePaddingBottom": 5,
      "paddingTop": 0,
      "closeButtonRollOverBackgroundOpacity": 0.3,
      "scrollBarWidth": 10,
      "closeButtonIconWidth": 20,
      "bodyBackgroundColorRatios": [
        0,
        0.5,
        1
      ],
      "closeButtonRollOverIconColor": "#666666"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window100852"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E867404E_AABF_E499_41BE_386075492211",
      "bodyBackgroundColorDirection": "vertical",
      "titlePaddingLeft": 5,
      "scrollBarColor": "#000000",
      "horizontalAlign": "center",
      "bodyPaddingTop": 0,
      "closeButtonRollOverBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "paddingLeft": 0,
      "headerVerticalAlign": "middle",
      "closeButtonPaddingTop": 5,
      "headerBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "bodyBackgroundOpacity": 0,
      "footerHeight": 5,
      "minHeight": 20,
      "scrollBarVisible": "rollOver",
      "scrollBarOpacity": 0.5,
      "closeButtonRollOverBackgroundColorDirection": "vertical",
      "veilColor": [
        "#000000",
        "#000000"
      ],
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "modal": true,
      "minWidth": 20,
      "veilColorRatios": [
        0,
        1
      ],
      "titleFontSize": "1.29vmin",
      "bodyPaddingBottom": 0,
      "closeButtonBorderColor": "#000000",
      "headerBackgroundColorDirection": "vertical",
      "backgroundColor": [],
      "closeButtonBackgroundColorDirection": "vertical",
      "shadowSpread": 1,
      "shadowVerticalLength": 0,
      "closeButtonBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverIconLineWidth": 5,
      "backgroundOpacity": 1,
      "closeButtonPressedIconLineWidth": 5,
      "shadow": true,
      "titlePaddingTop": 5,
      "class": "Window",
      "closeButtonPressedBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBorderColor": "#000000",
      "footerBackgroundOpacity": 0,
      "closeButtonPressedBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "overflow": "scroll",
      "veilOpacity": 0.4,
      "footerBackgroundColor": [
        "#FFFFFF",
        "#EEEEEE",
        "#DDDDDD"
      ],
      "propagateClick": false,
      "closeButtonRollOverBorderSize": 0,
      "headerPaddingRight": 0,
      "footerBackgroundColorDirection": "vertical",
      "children": [
        "this.viewer_uidEE61A517_AACC_ECB6_41D8_A9F2D9C48545"
      ],
      "veilShowEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "titlePaddingRight": 5,
      "closeButtonIconHeight": 20,
      "paddingRight": 0,
      "shadowColor": "#000000",
      "borderSize": 0,
      "titleFontFamily": "Arial",
      "headerPaddingBottom": 5,
      "backgroundColorDirection": "vertical",
      "closeButtonPressedBackgroundOpacity": 0.3,
      "closeButtonIconColor": "#000000",
      "closeButtonBackgroundOpacity": 0.3,
      "footerBackgroundColorRatios": [
        0,
        0.9,
        1
      ],
      "hideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "contentOpaque": false,
      "closeButtonPaddingRight": 5,
      "scrollBarMargin": 2,
      "closeButtonPaddingLeft": 5,
      "closeButtonPaddingBottom": 5,
      "headerPaddingLeft": 10,
      "veilHideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "headerPaddingTop": 10,
      "closeButtonBorderSize": 0,
      "closeButtonBorderRadius": 0,
      "shadowBlurRadius": 6,
      "bodyBackgroundColor": [
        "#FFFFFF",
        "#DDDDDD",
        "#FFFFFF"
      ],
      "shadowHorizontalLength": 3,
      "gap": 10,
      "layout": "vertical",
      "closeButtonPressedBorderColor": "#000000",
      "headerBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "headerBackgroundOpacity": 0,
      "closeButtonBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "shadowOpacity": 0.5,
      "bodyPaddingLeft": 0,
      "closeButtonIconLineWidth": 5,
      "paddingBottom": 0,
      "borderRadius": 5,
      "titlePaddingBottom": 5,
      "paddingTop": 0,
      "closeButtonRollOverBackgroundOpacity": 0.3,
      "scrollBarWidth": 10,
      "closeButtonIconWidth": 20,
      "bodyBackgroundColorRatios": [
        0,
        0.5,
        1
      ],
      "closeButtonRollOverIconColor": "#666666"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2A8D382E_0AB2_1605_4189_2D65425A5D2E",
      "levels": [
        {
          "url": "media/popup_2A8DE82E_0AB2_1605_4197_CDF36D85FF90_0_0.png",
          "class": "ImageResourceLevel",
          "width": 3712,
          "height": 5250
        },
        {
          "url": "media/popup_2A8DE82E_0AB2_1605_4197_CDF36D85FF90_0_1.png",
          "class": "ImageResourceLevel",
          "width": 2896,
          "height": 4096
        },
        {
          "url": "media/popup_2A8DE82E_0AB2_1605_4197_CDF36D85FF90_0_2.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_2A8DE82E_0AB2_1605_4197_CDF36D85FF90_0_3.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_2A8DE82E_0AB2_1605_4197_CDF36D85FF90_0_4.png",
          "class": "ImageResourceLevel",
          "width": 362,
          "height": 512
        }
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 27.56,
      "autoplay": true,
      "id": "popup_90BD679F_A4DB_DB2C_41E3_7C25B00DF91F",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 1.98,
      "yaw": 48.73,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 159.03,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EF54F601_AACC_EC8A_417A_133374992C6E"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_9928FD96_A4EC_4F3C_41D8_A87FFA5E1898",
      "levels": [
        {
          "url": "media/popup_96436CDC_A4FC_4D33_41D3_6AA4C8FDB78D_0_0.png",
          "class": "ImageResourceLevel",
          "width": 3712,
          "height": 5250
        },
        {
          "url": "media/popup_96436CDC_A4FC_4D33_41D3_6AA4C8FDB78D_0_1.png",
          "class": "ImageResourceLevel",
          "width": 2896,
          "height": 4096
        },
        {
          "url": "media/popup_96436CDC_A4FC_4D33_41D3_6AA4C8FDB78D_0_2.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_96436CDC_A4FC_4D33_41D3_6AA4C8FDB78D_0_3.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_96436CDC_A4FC_4D33_41D3_6AA4C8FDB78D_0_4.png",
          "class": "ImageResourceLevel",
          "width": 362,
          "height": 512
        }
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 24.93,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EBA7D782_AACC_EB89_41BC_CFE03E35FC14"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 34,
      "autoplay": true,
      "id": "popup_8BFF396C_A4E4_D713_41A1_10AED543F7D2",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 0.09,
      "yaw": 27.39,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 11.83,
      "id": "popup_2A8D7960_0AB6_163D_419A_11A867D54C57",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2A8D7960_0AB6_163D_419A_11A867D54C57_0_1.png",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 576
          }
        ]
      },
      "pitch": 7.9,
      "yaw": 83.9,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "fieldOfViewOverlayOutsideOpacity": 0,
      "label": "minimap",
      "id": "map_2B68880C_0A52_FD58_417D_95178D044B10",
      "minimumZoomFactor": 0.5,
      "thumbnailUrl": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_t.png",
      "width": 2083,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10.png",
            "class": "ImageResourceLevel",
            "width": 2083,
            "height": 2500
          },
          {
            "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_lq.png",
            "class": "ImageResourceLevel",
            "width": 233,
            "height": 280,
            "tags": "preload"
          }
        ]
      },
      "fieldOfViewOverlayRadiusScale": 0.14,
      "fieldOfViewOverlayOutsideColor": "#000000",
      "maximumZoomFactor": 3,
      "class": "Map",
      "fieldOfViewOverlayInsideOpacity": 0.4,
      "scaleMode": "fit_inside",
      "initialZoomFactor": 2,
      "fieldOfViewOverlayInsideColor": "#FFFFFF",
      "height": 2500,
      "overlays": [
        "this.overlay_29C09D0C_0A52_7758_4184_438BFC8A9436",
        "this.overlay_29D0C357_0A51_F3C8_4193_4202D53470F3",
        "this.overlay_2C2C450F_0A56_1758_41A0_7AB7DFEE04FE",
        "this.overlay_29CA04CF_0A56_36D8_41A0_080C586DEB51",
        "this.overlay_2B78A218_0A56_2D78_4154_5B78D041462C",
        "this.overlay_29CE0144_0A56_6FC8_4181_21945F6DBAFE",
        "this.overlay_2B56CC62_0A56_15C8_4194_65732EBF21C9",
        "this.overlay_2CEC6CA6_0A56_1548_4185_F15004D7C69E",
        "this.overlay_2AEF8619_0A56_1578_4177_557B816BCF8A",
        "this.overlay_2CA08C5C_0A56_75F8_4175_B42183831BD4",
        "this.overlay_2EA5E864_0A56_3DC8_418C_B4B1FCDA1A8B",
        "this.overlay_2C845AC6_0A56_12C8_4180_6690F5D4FF19",
        "this.overlay_2AA68E8E_0A56_1558_4195_300D9116E70A",
        "this.overlay_2C25BDEE_0A56_36D8_419D_EFC212EA94C0",
        "this.overlay_293835CD_0A56_76D8_4191_A711A581D6D6"
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0E3757C5_05AE_1A07_4191_3551B2E75546"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 26.82,
          "backwardYaw": -87.83,
          "distance": 1,
          "panorama": "this.panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 135.24,
          "backwardYaw": -155.07,
          "distance": 1,
          "panorama": "this.panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -104.64,
          "backwardYaw": 42.12,
          "distance": 1,
          "panorama": "this.panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0E181F5E_05AE_0A05_416D_04530F9BD830"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_123616_00_034",
      "id": "panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02",
      "thumbnailUrl": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": 137.76,
          "y": 1159.4,
          "x": 649.07
        }
      ],
      "vfov": 180,
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/f/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/u/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/r/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/b/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/d/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0/l/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_1B87B3C9_0652_1A0F_4192_DABD88793C6B",
        "this.overlay_1B87A3C9_0652_1A0F_419B_162355E33431",
        "this.overlay_16D4308B_0AFE_7603_4178_93F368A811B4",
        "this.overlay_291F46EB_0AFE_1A03_4199_1B0BA9E492B7",
        "this.popup_2A1223CC_0AD6_FA05_4184_92549CC03285",
        "this.popup_178324D3_0AD2_FE03_4178_16C6EB766305",
        "this.overlay_28933868_0A56_760D_4182_7BD4A000BEFE",
        "this.overlay_2C18FAF6_0A7E_12C8_41A0_F36800AA67B9",
        "this.popup_2EE25834_0A7E_3D48_419E_B9BDB5E75114",
        "this.popup_97D9C52E_A4EC_5F6C_41A7_768B48A23B29",
        "this.overlay_9412734D_A4E4_7B2D_41E4_4E91F7DCC7A6",
        "this.overlay_913077D6_A4FC_3B3F_41D9_47BDF220589A",
        "this.popup_96436CDC_A4FC_4D33_41D3_6AA4C8FDB78D",
        "this.overlay_9D6763A7_A4DC_3B1D_41D5_F267F90A35B2",
        "this.overlay_9DEFBDB7_A4DC_4F7D_41D2_CCDCF47AE89B",
        "this.overlay_E857C3BE_AAB4_ABF6_41E0_FCEC3D51923B",
        "this.overlay_EA5825A7_AAB4_EF97_41CB_E007F8950894",
        "this.overlay_E8DD0176_AAB4_A489_41D9_C76996F0AB32",
        "this.overlay_E82D1EB9_AAB5_BDFA_41CE_195AC901DB13",
        "this.overlay_EA1F6ACF_AAB4_E596_41DF_4CDB04005FF0",
        "this.overlay_E8510DB2_AAB7_7F8E_41D8_00CD603F80DF",
        "this.overlay_97C9222D_AAB7_A49B_41DC_259D2FD52393"
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uidEE67D518_AACC_ECBA_41D8_3946152F0640VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EAD4BF69_AABD_9C9A_41D3_A46CF9C0139D, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EAD4BF69_AABD_9C9A_41D3_A46CF9C0139D, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uidEE67D518_AACC_ECBA_41D8_3946152F0640VideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.viewer_uidEE67D518_AACC_ECBA_41D8_3946152F0640VideoPlayer"
        }
      ],
      "id": "PlayList_EAD4BF69_AABD_9C9A_41D3_A46CF9C0139D"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
          "class": "MapPlayListItem",
          "media": "this.map_3F06E654_2A3C_10AF_419C_CAA672FC614E",
          "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
        }
      ],
      "id": "playList_EE11D521_AACC_EC8A_41D1_5DD5DEA5D9F4"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -179.62,
          "backwardYaw": 146.38,
          "distance": 1,
          "panorama": "this.panorama_0E181F5E_05AE_0A05_416D_04530F9BD830"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 7.74,
          "backwardYaw": -177.54,
          "distance": 1,
          "panorama": "this.panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_124130_00_038",
      "id": "panorama_0E3757C5_05AE_1A07_4191_3551B2E75546",
      "thumbnailUrl": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": 89.38,
          "y": 1856.34,
          "x": 633.58
        }
      ],
      "vfov": 180,
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/f/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/u/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/r/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/b/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/d/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0/l/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_946FB132_A47C_F777_41DD_7C74574FA205",
        "this.overlay_E9ED7CB8_AAD4_BDF9_41E4_75202DD9A625",
        "this.overlay_EBFD0BD8_AAD4_9BB9_41DC_466393839F4E"
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uidEE630516_AACC_ECB6_41C3_3F42B8BE797DVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EAD51F68_AABD_9C9A_419C_719447818587, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EAD51F68_AABD_9C9A_419C_719447818587, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uidEE630516_AACC_ECB6_41C3_3F42B8BE797DVideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.viewer_uidEE630516_AACC_ECB6_41C3_3F42B8BE797DVideoPlayer"
        }
      ],
      "id": "PlayList_EAD51F68_AABD_9C9A_419C_719447818587"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_camera"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window100869"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E8A4C109_AABF_E49A_41D4_75638EB32BAB",
      "bodyBackgroundColorDirection": "vertical",
      "titlePaddingLeft": 5,
      "scrollBarColor": "#000000",
      "horizontalAlign": "center",
      "bodyPaddingTop": 0,
      "closeButtonRollOverBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "paddingLeft": 0,
      "headerVerticalAlign": "middle",
      "closeButtonPaddingTop": 5,
      "headerBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "bodyBackgroundOpacity": 0,
      "footerHeight": 5,
      "minHeight": 20,
      "scrollBarVisible": "rollOver",
      "scrollBarOpacity": 0.5,
      "closeButtonRollOverBackgroundColorDirection": "vertical",
      "veilColor": [
        "#000000",
        "#000000"
      ],
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "modal": true,
      "minWidth": 20,
      "veilColorRatios": [
        0,
        1
      ],
      "titleFontSize": "1.29vmin",
      "bodyPaddingBottom": 0,
      "closeButtonBorderColor": "#000000",
      "headerBackgroundColorDirection": "vertical",
      "backgroundColor": [],
      "closeButtonBackgroundColorDirection": "vertical",
      "shadowSpread": 1,
      "shadowVerticalLength": 0,
      "closeButtonBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverIconLineWidth": 5,
      "backgroundOpacity": 1,
      "closeButtonPressedIconLineWidth": 5,
      "shadow": true,
      "titlePaddingTop": 5,
      "class": "Window",
      "closeButtonPressedBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBorderColor": "#000000",
      "footerBackgroundOpacity": 0,
      "closeButtonPressedBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "overflow": "scroll",
      "veilOpacity": 0.4,
      "footerBackgroundColor": [
        "#FFFFFF",
        "#EEEEEE",
        "#DDDDDD"
      ],
      "propagateClick": false,
      "closeButtonRollOverBorderSize": 0,
      "headerPaddingRight": 0,
      "footerBackgroundColorDirection": "vertical",
      "children": [
        "this.viewer_uidEE7FB514_AACC_EC89_41C6_AD2EA03FD353"
      ],
      "veilShowEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "titlePaddingRight": 5,
      "closeButtonIconHeight": 20,
      "paddingRight": 0,
      "shadowColor": "#000000",
      "borderSize": 0,
      "titleFontFamily": "Arial",
      "headerPaddingBottom": 5,
      "backgroundColorDirection": "vertical",
      "closeButtonPressedBackgroundOpacity": 0.3,
      "closeButtonIconColor": "#000000",
      "closeButtonBackgroundOpacity": 0.3,
      "footerBackgroundColorRatios": [
        0,
        0.9,
        1
      ],
      "hideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "contentOpaque": false,
      "closeButtonPaddingRight": 5,
      "scrollBarMargin": 2,
      "closeButtonPaddingLeft": 5,
      "closeButtonPaddingBottom": 5,
      "headerPaddingLeft": 10,
      "veilHideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "headerPaddingTop": 10,
      "closeButtonBorderSize": 0,
      "closeButtonBorderRadius": 0,
      "shadowBlurRadius": 6,
      "bodyBackgroundColor": [
        "#FFFFFF",
        "#DDDDDD",
        "#FFFFFF"
      ],
      "shadowHorizontalLength": 3,
      "gap": 10,
      "layout": "vertical",
      "closeButtonPressedBorderColor": "#000000",
      "headerBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "headerBackgroundOpacity": 0,
      "closeButtonBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "shadowOpacity": 0.5,
      "bodyPaddingLeft": 0,
      "closeButtonIconLineWidth": 5,
      "paddingBottom": 0,
      "borderRadius": 5,
      "titlePaddingBottom": 5,
      "paddingTop": 0,
      "closeButtonRollOverBackgroundOpacity": 0.3,
      "scrollBarWidth": 10,
      "closeButtonIconWidth": 20,
      "bodyBackgroundColorRatios": [
        0,
        0.5,
        1
      ],
      "closeButtonRollOverIconColor": "#666666"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 12.84,
      "autoplay": true,
      "id": "popup_8A192DBB_A4E4_CF75_41C1_8249A74893DE",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 1.42,
      "yaw": 53.45,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2B70E838_0AB2_160D_417C_0E7B87E521CB",
      "levels": [
        {
          "url": "media/popup_2B708838_0AB2_160D_4191_CEF19418F8C8_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1280,
          "height": 720
        },
        {
          "url": "media/popup_2B708838_0AB2_160D_4191_CEF19418F8C8_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 576
        },
        {
          "url": "media/popup_2B708838_0AB2_160D_4191_CEF19418F8C8_0_2.png",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 288
        }
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -24.37,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EED6A556_AACC_EC89_41E0_83718262124A"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_camera"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 24.17,
      "autoplay": true,
      "id": "popup_94D039CD_A46D_F72C_41E1_97B12859F9ED",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 0.66,
      "yaw": -90.09,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
          "class": "MapPlayListItem",
          "media": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "player": "this.MapViewerMapPlayer"
        }
      ],
      "id": "playList_EE103521_AACC_EC8A_41D7_6FB15B4A7D5C"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 60.82,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EEBDB5E6_AACC_EF96_41DD_47B0E589FBA7"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uidEE75B50F_AACC_EC96_41D6_18EE7F541A73VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EAD0AF66_AABD_9C96_41D1_C8A469DB53CC, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EAD0AF66_AABD_9C96_41D1_C8A469DB53CC, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uidEE75B50F_AACC_EC96_41D6_18EE7F541A73VideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.viewer_uidEE75B50F_AACC_EC96_41D6_18EE7F541A73VideoPlayer"
        }
      ],
      "id": "PlayList_EAD0AF66_AABD_9C96_41D1_C8A469DB53CC"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -153.18,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EB9E072E_AACC_EC96_41E1_EEFE9C554F76"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uidEE602517_AACC_ECB6_41E2_E0860EF83EC4VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EAD58F68_AABD_9C9A_41E0_A9054AB99D93, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EAD58F68_AABD_9C9A_41E0_A9054AB99D93, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uidEE602517_AACC_ECB6_41E2_E0860EF83EC4VideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.viewer_uidEE602517_AACC_ECB6_41E2_E0860EF83EC4VideoPlayer"
        }
      ],
      "id": "PlayList_EAD58F68_AABD_9C9A_41E0_A9054AB99D93"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 8.34,
      "id": "popup_2D415209_0AB2_1A0F_4193_0E51D91DB627",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2D415209_0AB2_1A0F_4193_0E51D91DB627_0_3.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": -5.61,
      "yaw": 81.38,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.58,
      "id": "popup_178E9809_0AB3_F60F_4198_84C0F5DE4EB4",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_178E9809_0AB3_F60F_4198_84C0F5DE4EB4_0_3.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 11.2,
      "yaw": 172.7,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "MapPlayer",
      "buttonZoomIn": "this.IconButton_A7361280_BCBD_AC04_41C9_358137CF7140",
      "movementMode": "constrained",
      "buttonZoomOut": "this.IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291",
      "viewerArea": "this.MapViewer",
      "id": "MapViewerMapPlayer"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 75.36,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EBFCE6C4_AACC_ED8A_41B0_1D1B85AE6CCB"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -137.88,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EBAE078F_AACC_EB96_41CB_47ADCF48CE30"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2A8D9834_0AD2_3605_419B_94739E4D31AA",
      "levels": [
        {
          "url": "media/popup_178324D3_0AD2_FE03_4178_16C6EB766305_0_0.png",
          "class": "ImageResourceLevel",
          "width": 3712,
          "height": 5250
        },
        {
          "url": "media/popup_178324D3_0AD2_FE03_4178_16C6EB766305_0_1.png",
          "class": "ImageResourceLevel",
          "width": 2896,
          "height": 4096
        },
        {
          "url": "media/popup_178324D3_0AD2_FE03_4178_16C6EB766305_0_2.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_178324D3_0AD2_FE03_4178_16C6EB766305_0_3.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_178324D3_0AD2_FE03_4178_16C6EB766305_0_4.png",
          "class": "ImageResourceLevel",
          "width": 362,
          "height": 512
        }
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 84.43,
          "backwardYaw": 0.94,
          "distance": 1,
          "panorama": "this.panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -99.92,
          "backwardYaw": -104.45,
          "distance": 1,
          "panorama": "this.panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -101.43,
          "backwardYaw": -104.45,
          "distance": 1,
          "panorama": "this.panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 42.12,
          "backwardYaw": -104.64,
          "distance": 1,
          "panorama": "this.panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_123824_00_035",
      "id": "panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2",
      "thumbnailUrl": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": 87.03,
          "y": 593.52,
          "x": 1419.55
        }
      ],
      "vfov": 180,
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/f/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/u/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/r/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/b/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/d/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0/l/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_1ACA9111_0672_161E_4191_B70AAB9B74EA",
        "this.overlay_301B8236_3EFF_9DA0_41BF_474C5DE464BB",
        "this.overlay_1C1C4F00_0672_0BFD_4182_000CB66CBB30",
        "this.overlay_9446BA6A_A424_5517_41D2_1657F29FE489",
        "this.overlay_949B097F_A424_57ED_419C_DB27587563D5",
        "this.overlay_EA59ED56_AAD7_7C89_41AB_03A92960596D",
        "this.overlay_E96E640B_AAD4_AC9E_41C6_68B10A3F96CE",
        "this.overlay_EA3B3FC3_AAD4_FB8F_41CF_EDB80C73B58A"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_camera"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window100850"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E866104B_AABF_E49E_41E3_CBCD33D6471B",
      "bodyBackgroundColorDirection": "vertical",
      "titlePaddingLeft": 5,
      "scrollBarColor": "#000000",
      "horizontalAlign": "center",
      "bodyPaddingTop": 0,
      "closeButtonRollOverBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "paddingLeft": 0,
      "headerVerticalAlign": "middle",
      "closeButtonPaddingTop": 5,
      "headerBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "bodyBackgroundOpacity": 0,
      "footerHeight": 5,
      "minHeight": 20,
      "scrollBarVisible": "rollOver",
      "scrollBarOpacity": 0.5,
      "closeButtonRollOverBackgroundColorDirection": "vertical",
      "veilColor": [
        "#000000",
        "#000000"
      ],
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "modal": true,
      "minWidth": 20,
      "veilColorRatios": [
        0,
        1
      ],
      "titleFontSize": "1.29vmin",
      "bodyPaddingBottom": 0,
      "closeButtonBorderColor": "#000000",
      "headerBackgroundColorDirection": "vertical",
      "backgroundColor": [],
      "closeButtonBackgroundColorDirection": "vertical",
      "shadowSpread": 1,
      "shadowVerticalLength": 0,
      "closeButtonBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverIconLineWidth": 5,
      "backgroundOpacity": 1,
      "closeButtonPressedIconLineWidth": 5,
      "shadow": true,
      "titlePaddingTop": 5,
      "class": "Window",
      "closeButtonPressedBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBorderColor": "#000000",
      "footerBackgroundOpacity": 0,
      "closeButtonPressedBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "overflow": "scroll",
      "veilOpacity": 0.4,
      "footerBackgroundColor": [
        "#FFFFFF",
        "#EEEEEE",
        "#DDDDDD"
      ],
      "propagateClick": false,
      "closeButtonRollOverBorderSize": 0,
      "headerPaddingRight": 0,
      "footerBackgroundColorDirection": "vertical",
      "children": [
        "this.viewer_uidEE630516_AACC_ECB6_41C3_3F42B8BE797D"
      ],
      "veilShowEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "titlePaddingRight": 5,
      "closeButtonIconHeight": 20,
      "paddingRight": 0,
      "shadowColor": "#000000",
      "borderSize": 0,
      "titleFontFamily": "Arial",
      "headerPaddingBottom": 5,
      "backgroundColorDirection": "vertical",
      "closeButtonPressedBackgroundOpacity": 0.3,
      "closeButtonIconColor": "#000000",
      "closeButtonBackgroundOpacity": 0.3,
      "footerBackgroundColorRatios": [
        0,
        0.9,
        1
      ],
      "hideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "contentOpaque": false,
      "closeButtonPaddingRight": 5,
      "scrollBarMargin": 2,
      "closeButtonPaddingLeft": 5,
      "closeButtonPaddingBottom": 5,
      "headerPaddingLeft": 10,
      "veilHideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "headerPaddingTop": 10,
      "closeButtonBorderSize": 0,
      "closeButtonBorderRadius": 0,
      "shadowBlurRadius": 6,
      "bodyBackgroundColor": [
        "#FFFFFF",
        "#DDDDDD",
        "#FFFFFF"
      ],
      "shadowHorizontalLength": 3,
      "gap": 10,
      "layout": "vertical",
      "closeButtonPressedBorderColor": "#000000",
      "headerBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "headerBackgroundOpacity": 0,
      "closeButtonBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "shadowOpacity": 0.5,
      "bodyPaddingLeft": 0,
      "closeButtonIconLineWidth": 5,
      "paddingBottom": 0,
      "borderRadius": 5,
      "titlePaddingBottom": 5,
      "paddingTop": 0,
      "closeButtonRollOverBackgroundOpacity": 0.3,
      "scrollBarWidth": 10,
      "closeButtonIconWidth": 20,
      "bodyBackgroundColorRatios": [
        0,
        0.5,
        1
      ],
      "closeButtonRollOverIconColor": "#666666"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -37.59,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EBE7B6EA_AACC_ED9F_419A_5FC005766910"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 3.72,
      "id": "popup_96436CDC_A4FC_4D33_41D3_6AA4C8FDB78D",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_96436CDC_A4FC_4D33_41D3_6AA4C8FDB78D_0_3.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 6.9,
      "yaw": 153.29,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 80.08,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EEC9F57F_AACC_EF76_41D0_99F97D873C06"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 43.86,
      "autoplay": true,
      "id": "popup_8A825FD4_A4EC_CB33_41E2_F14C9CC9B1AB",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 56.86,
      "yaw": -121.02,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 7.67,
      "id": "popup_2B708838_0AB2_160D_4191_CEF19418F8C8",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2B708838_0AB2_160D_4191_CEF19418F8C8_0_1.png",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 576
          }
        ]
      },
      "pitch": 3.38,
      "yaw": 84.45,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 10.2,
      "autoplay": true,
      "id": "popup_2C649E03_0A72_F548_41A0_50F482DEA885",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 21.9,
      "yaw": 170.43,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 44.58,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EEF6658B_AACC_EF9E_41E1_DE62CD58C4B8"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 146.19,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EEFF5598_AACC_EFB9_41C9_DCD684B5BDCA"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2D414209_0AB2_1A0F_417B_693E4A1B175C",
      "levels": [
        {
          "url": "media/popup_2D415209_0AB2_1A0F_4193_0E51D91DB627_0_0.png",
          "class": "ImageResourceLevel",
          "width": 3712,
          "height": 5250
        },
        {
          "url": "media/popup_2D415209_0AB2_1A0F_4193_0E51D91DB627_0_1.png",
          "class": "ImageResourceLevel",
          "width": 2896,
          "height": 4096
        },
        {
          "url": "media/popup_2D415209_0AB2_1A0F_4193_0E51D91DB627_0_2.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_2D415209_0AB2_1A0F_4193_0E51D91DB627_0_3.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_2D415209_0AB2_1A0F_4193_0E51D91DB627_0_4.png",
          "class": "ImageResourceLevel",
          "width": 362,
          "height": 512
        }
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_EE106521_AACC_EC8A_41B5_9F179B3A2731, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_EE106521_AACC_EC8A_41B5_9F179B3A2731, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.MainViewerVideoPlayer"
        }
      ],
      "id": "playList_EE106521_AACC_EC8A_41B5_9F179B3A2731"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -33.62,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "camera_EB8C2758_AACC_ECBA_41E4_BEA6B01D9F6B"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_camera"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2B31CE53_0AB2_0A03_4192_45F552D1F93F",
      "levels": [
        {
          "url": "media/popup_2B31EE53_0AB2_0A03_4158_8FE8685CD958_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1280,
          "height": 720
        },
        {
          "url": "media/popup_2B31EE53_0AB2_0A03_4158_8FE8685CD958_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 576
        },
        {
          "url": "media/popup_2B31EE53_0AB2_0A03_4158_8FE8685CD958_0_2.png",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 288
        }
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 106.34,
          "backwardYaw": -119.18,
          "distance": 1,
          "panorama": "this.panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -135.42,
          "backwardYaw": 59.31,
          "distance": 1,
          "panorama": "this.panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_123352_00_031",
      "id": "panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134",
      "thumbnailUrl": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": 43.91,
          "y": 86.57,
          "x": 602.24
        }
      ],
      "vfov": 180,
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/f/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/u/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/r/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/b/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/d/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0/l/3/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_2C69B084_0A76_6D48_4195_DA3D76BB802E",
        "this.overlay_2CC5F41D_0A76_7578_4190_18D84C192258",
        "this.popup_945BF191_A4DC_3735_41D2_E88BC2762E30",
        "this.popup_90BD679F_A4DB_DB2C_41E3_7C25B00DF91F",
        "this.overlay_E9106772_AAD4_AC89_41B8_4C85D8F389D1",
        "this.overlay_ED0CC2EA_AAD5_6599_4182_69DCEB221336"
      ]
    },
    {
      "class": "FadeOutEffect",
      "duration": 500,
      "id": "FadeOutEffect_95F43308_A424_7B14_41D3_4CD60F6C36B2",
      "easing": "cubic_out"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window100846"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E860F046_AABF_E496_41D0_0AAE039F3E25",
      "bodyBackgroundColorDirection": "vertical",
      "titlePaddingLeft": 5,
      "scrollBarColor": "#000000",
      "horizontalAlign": "center",
      "bodyPaddingTop": 0,
      "closeButtonRollOverBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "paddingLeft": 0,
      "headerVerticalAlign": "middle",
      "closeButtonPaddingTop": 5,
      "headerBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "bodyBackgroundOpacity": 0,
      "footerHeight": 5,
      "minHeight": 20,
      "scrollBarVisible": "rollOver",
      "scrollBarOpacity": 0.5,
      "closeButtonRollOverBackgroundColorDirection": "vertical",
      "veilColor": [
        "#000000",
        "#000000"
      ],
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "modal": true,
      "minWidth": 20,
      "veilColorRatios": [
        0,
        1
      ],
      "titleFontSize": "1.29vmin",
      "bodyPaddingBottom": 0,
      "closeButtonBorderColor": "#000000",
      "headerBackgroundColorDirection": "vertical",
      "backgroundColor": [],
      "closeButtonBackgroundColorDirection": "vertical",
      "shadowSpread": 1,
      "shadowVerticalLength": 0,
      "closeButtonBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverIconLineWidth": 5,
      "backgroundOpacity": 1,
      "closeButtonPressedIconLineWidth": 5,
      "shadow": true,
      "titlePaddingTop": 5,
      "class": "Window",
      "closeButtonPressedBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBorderColor": "#000000",
      "footerBackgroundOpacity": 0,
      "closeButtonPressedBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "overflow": "scroll",
      "veilOpacity": 0.4,
      "footerBackgroundColor": [
        "#FFFFFF",
        "#EEEEEE",
        "#DDDDDD"
      ],
      "propagateClick": false,
      "closeButtonRollOverBorderSize": 0,
      "headerPaddingRight": 0,
      "footerBackgroundColorDirection": "vertical",
      "children": [
        "this.viewer_uidEE74050E_AACC_EC96_41B4_526DA8CC77FF"
      ],
      "veilShowEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "titlePaddingRight": 5,
      "closeButtonIconHeight": 20,
      "paddingRight": 0,
      "shadowColor": "#000000",
      "borderSize": 0,
      "titleFontFamily": "Arial",
      "headerPaddingBottom": 5,
      "backgroundColorDirection": "vertical",
      "closeButtonPressedBackgroundOpacity": 0.3,
      "closeButtonIconColor": "#000000",
      "closeButtonBackgroundOpacity": 0.3,
      "footerBackgroundColorRatios": [
        0,
        0.9,
        1
      ],
      "hideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "contentOpaque": false,
      "closeButtonPaddingRight": 5,
      "scrollBarMargin": 2,
      "closeButtonPaddingLeft": 5,
      "closeButtonPaddingBottom": 5,
      "headerPaddingLeft": 10,
      "veilHideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "headerPaddingTop": 10,
      "closeButtonBorderSize": 0,
      "closeButtonBorderRadius": 0,
      "shadowBlurRadius": 6,
      "bodyBackgroundColor": [
        "#FFFFFF",
        "#DDDDDD",
        "#FFFFFF"
      ],
      "shadowHorizontalLength": 3,
      "gap": 10,
      "layout": "vertical",
      "closeButtonPressedBorderColor": "#000000",
      "headerBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "headerBackgroundOpacity": 0,
      "closeButtonBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "shadowOpacity": 0.5,
      "bodyPaddingLeft": 0,
      "closeButtonIconLineWidth": 5,
      "paddingBottom": 0,
      "borderRadius": 5,
      "titlePaddingBottom": 5,
      "paddingTop": 0,
      "closeButtonRollOverBackgroundOpacity": 0.3,
      "scrollBarWidth": 10,
      "closeButtonIconWidth": 20,
      "bodyBackgroundColorRatios": [
        0,
        0.5,
        1
      ],
      "closeButtonRollOverIconColor": "#666666"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -33.81,
          "backwardYaw": 145.44,
          "distance": 1,
          "panorama": "this.panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 60.44,
          "backwardYaw": -179.62,
          "distance": 1,
          "panorama": "this.panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_123207_00_029",
      "id": "panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040",
      "thumbnailUrl": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "top": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "right": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "back": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "bottom": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "left": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 1,
                "tags": [
                  "ondemand",
                  "preload"
                ],
                "colCount": 1,
                "width": 512,
                "height": 512
              }
            ]
          },
          "thumbnailUrl": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_2B68880C_0A52_FD58_417D_95178D044B10",
          "class": "PanoramaMapLocation",
          "angle": 38.19,
          "y": 604.91,
          "x": 225.46
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_2B51C8B3_0AB2_1603_41A0_813B88E9F8BA",
        "this.overlay_2B5138B3_0AB2_1603_419B_ECFFF720A5F5",
        "this.overlay_2860A833_0AB3_F603_418B_F2C699762562",
        "this.overlay_2BDCAB38_0A72_33B9_418B_B30945F7BB07",
        "this.popup_2A8DE82E_0AB2_1605_4197_CDF36D85FF90",
        "this.popup_2B708838_0AB2_160D_4191_CEF19418F8C8",
        "this.popup_178E9809_0AB3_F60F_4198_84C0F5DE4EB4",
        "this.popup_38103FAF_0BB2_1358_4192_CCE1046739EF",
        "this.popup_8A96B291_A4E5_F535_418E_908CE5A7862C",
        "this.overlay_E9E3AC5D_AACC_BCBA_41B9_7D24E1D2644B",
        "this.overlay_ED5D39F1_AACC_A78B_41E2_99AF770B7EDA",
        "this.overlay_E0BA6D7C_AACB_9F79_41DA_44F90939181E"
      ]
    },
    {
      "class": "Video",
      "label": "Virtual Reality (1)",
      "scaleMode": "fit_inside",
      "thumbnailUrl": "media/video_2F117E51_3EF1_E5E3_41C6_6B4D85E12D32_t.jpg",
      "width": 2240,
      "loop": false,
      "id": "video_2F117E51_3EF1_E5E3_41C6_6B4D85E12D32",
      "height": 2240,
      "video": {
        "width": 2240,
        "class": "VideoResource",
        "height": 2240,
        "mp4Url": "media/video_2F117E51_3EF1_E5E3_41C6_6B4D85E12D32.mp4"
      }
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uidEE74050E_AACC_EC96_41B4_526DA8CC77FFVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EAD00F65_AABD_9C8A_41BC_DC5DBDD1DC13, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EAD00F65_AABD_9C8A_41BC_DC5DBDD1DC13, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uidEE74050E_AACC_EC96_41B4_526DA8CC77FFVideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.viewer_uidEE74050E_AACC_EC96_41B4_526DA8CC77FFVideoPlayer"
        }
      ],
      "id": "PlayList_EAD00F65_AABD_9C8A_41BC_DC5DBDD1DC13"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0,
        "pitch": 0
      },
      "initialSequence": {
        "class": "PanoramaCameraSequence",
        "restartMovementOnUserInteraction": false,
        "movements": [
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_in",
            "yawDelta": 18.5
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "linear",
            "yawDelta": 323
          },
          {
            "class": "DistancePanoramaCameraMovement",
            "yawSpeed": 7.96,
            "easing": "cubic_out",
            "yawDelta": 18.5
          }
        ]
      },
      "id": "panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_camera"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uidEE78B511_AACC_EC8B_41D9_87425C77F79AVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EAD73F66_AABD_9C96_41C3_96E1A5CA29C5, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EAD73F66_AABD_9C96_41C3_96E1A5CA29C5, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uidEE78B511_AACC_EC8B_41D9_87425C77F79AVideoPlayer)",
          "media": "this.video_281955BC_0A56_3E06_4197_1E835277D5D0",
          "player": "this.viewer_uidEE78B511_AACC_EC8B_41D9_87425C77F79AVideoPlayer"
        }
      ],
      "id": "PlayList_EAD73F66_AABD_9C96_41C3_96E1A5CA29C5"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.67,
      "id": "popup_2B4ECE46_0AB2_0A05_41A0_79862BE9B3E4",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2B4ECE46_0AB2_0A05_41A0_79862BE9B3E4_0_3.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": -1.22,
      "yaw": -172.3,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
          "class": "MapPlayListItem",
          "media": "this.map_3F06E654_2A3C_10AF_419C_CAA672FC614E",
          "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
        }
      ],
      "id": "playList_EE105521_AACC_EC8A_41C5_483967759B15"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 18.51,
      "autoplay": true,
      "id": "popup_8A96B291_A4E5_F535_418E_908CE5A7862C",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 0.47,
      "yaw": 18.13,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 5.75,
      "autoplay": true,
      "id": "popup_2EE25834_0A7E_3D48_419E_B9BDB5E75114",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 6.4,
      "yaw": -123.61,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window100867"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E8A77107_AABF_E497_41D5_757A6FA7CE43",
      "bodyBackgroundColorDirection": "vertical",
      "titlePaddingLeft": 5,
      "scrollBarColor": "#000000",
      "horizontalAlign": "center",
      "bodyPaddingTop": 0,
      "closeButtonRollOverBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "paddingLeft": 0,
      "headerVerticalAlign": "middle",
      "closeButtonPaddingTop": 5,
      "headerBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "bodyBackgroundOpacity": 0,
      "footerHeight": 5,
      "minHeight": 20,
      "scrollBarVisible": "rollOver",
      "scrollBarOpacity": 0.5,
      "closeButtonRollOverBackgroundColorDirection": "vertical",
      "veilColor": [
        "#000000",
        "#000000"
      ],
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "modal": true,
      "minWidth": 20,
      "veilColorRatios": [
        0,
        1
      ],
      "titleFontSize": "1.29vmin",
      "bodyPaddingBottom": 0,
      "closeButtonBorderColor": "#000000",
      "headerBackgroundColorDirection": "vertical",
      "backgroundColor": [],
      "closeButtonBackgroundColorDirection": "vertical",
      "shadowSpread": 1,
      "shadowVerticalLength": 0,
      "closeButtonBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverIconLineWidth": 5,
      "backgroundOpacity": 1,
      "closeButtonPressedIconLineWidth": 5,
      "shadow": true,
      "titlePaddingTop": 5,
      "class": "Window",
      "closeButtonPressedBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBorderColor": "#000000",
      "footerBackgroundOpacity": 0,
      "closeButtonPressedBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "overflow": "scroll",
      "veilOpacity": 0.4,
      "footerBackgroundColor": [
        "#FFFFFF",
        "#EEEEEE",
        "#DDDDDD"
      ],
      "propagateClick": false,
      "closeButtonRollOverBorderSize": 0,
      "headerPaddingRight": 0,
      "footerBackgroundColorDirection": "vertical",
      "children": [
        "this.viewer_uidEE75B50F_AACC_EC96_41D6_18EE7F541A73"
      ],
      "veilShowEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "titlePaddingRight": 5,
      "closeButtonIconHeight": 20,
      "paddingRight": 0,
      "shadowColor": "#000000",
      "borderSize": 0,
      "titleFontFamily": "Arial",
      "headerPaddingBottom": 5,
      "backgroundColorDirection": "vertical",
      "closeButtonPressedBackgroundOpacity": 0.3,
      "closeButtonIconColor": "#000000",
      "closeButtonBackgroundOpacity": 0.3,
      "footerBackgroundColorRatios": [
        0,
        0.9,
        1
      ],
      "hideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "contentOpaque": false,
      "closeButtonPaddingRight": 5,
      "scrollBarMargin": 2,
      "closeButtonPaddingLeft": 5,
      "closeButtonPaddingBottom": 5,
      "headerPaddingLeft": 10,
      "veilHideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "headerPaddingTop": 10,
      "closeButtonBorderSize": 0,
      "closeButtonBorderRadius": 0,
      "shadowBlurRadius": 6,
      "bodyBackgroundColor": [
        "#FFFFFF",
        "#DDDDDD",
        "#FFFFFF"
      ],
      "shadowHorizontalLength": 3,
      "gap": 10,
      "layout": "vertical",
      "closeButtonPressedBorderColor": "#000000",
      "headerBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "headerBackgroundOpacity": 0,
      "closeButtonBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "shadowOpacity": 0.5,
      "bodyPaddingLeft": 0,
      "closeButtonIconLineWidth": 5,
      "paddingBottom": 0,
      "borderRadius": 5,
      "titlePaddingBottom": 5,
      "paddingTop": 0,
      "closeButtonRollOverBackgroundOpacity": 0.3,
      "scrollBarWidth": 10,
      "closeButtonIconWidth": 20,
      "bodyBackgroundColorRatios": [
        0,
        0.5,
        1
      ],
      "closeButtonRollOverIconColor": "#666666"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 136.23,
      "autoplay": true,
      "id": "popup_945BF191_A4DC_3735_41D2_E88BC2762E30",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 2.63,
      "yaw": -41.55,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      }
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window100851"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E866E04C_AABF_E49A_41C5_E6942FD0A0DE",
      "bodyBackgroundColorDirection": "vertical",
      "titlePaddingLeft": 5,
      "scrollBarColor": "#000000",
      "horizontalAlign": "center",
      "bodyPaddingTop": 0,
      "closeButtonRollOverBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "paddingLeft": 0,
      "headerVerticalAlign": "middle",
      "closeButtonPaddingTop": 5,
      "headerBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "bodyBackgroundOpacity": 0,
      "footerHeight": 5,
      "minHeight": 20,
      "scrollBarVisible": "rollOver",
      "scrollBarOpacity": 0.5,
      "closeButtonRollOverBackgroundColorDirection": "vertical",
      "veilColor": [
        "#000000",
        "#000000"
      ],
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "modal": true,
      "minWidth": 20,
      "veilColorRatios": [
        0,
        1
      ],
      "titleFontSize": "1.29vmin",
      "bodyPaddingBottom": 0,
      "closeButtonBorderColor": "#000000",
      "headerBackgroundColorDirection": "vertical",
      "backgroundColor": [],
      "closeButtonBackgroundColorDirection": "vertical",
      "shadowSpread": 1,
      "shadowVerticalLength": 0,
      "closeButtonBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverIconLineWidth": 5,
      "backgroundOpacity": 1,
      "closeButtonPressedIconLineWidth": 5,
      "shadow": true,
      "titlePaddingTop": 5,
      "class": "Window",
      "closeButtonPressedBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBorderColor": "#000000",
      "footerBackgroundOpacity": 0,
      "closeButtonPressedBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "overflow": "scroll",
      "veilOpacity": 0.4,
      "footerBackgroundColor": [
        "#FFFFFF",
        "#EEEEEE",
        "#DDDDDD"
      ],
      "propagateClick": false,
      "closeButtonRollOverBorderSize": 0,
      "headerPaddingRight": 0,
      "footerBackgroundColorDirection": "vertical",
      "children": [
        "this.viewer_uidEE602517_AACC_ECB6_41E2_E0860EF83EC4"
      ],
      "veilShowEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "titlePaddingRight": 5,
      "closeButtonIconHeight": 20,
      "paddingRight": 0,
      "shadowColor": "#000000",
      "borderSize": 0,
      "titleFontFamily": "Arial",
      "headerPaddingBottom": 5,
      "backgroundColorDirection": "vertical",
      "closeButtonPressedBackgroundOpacity": 0.3,
      "closeButtonIconColor": "#000000",
      "closeButtonBackgroundOpacity": 0.3,
      "footerBackgroundColorRatios": [
        0,
        0.9,
        1
      ],
      "hideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "contentOpaque": false,
      "closeButtonPaddingRight": 5,
      "scrollBarMargin": 2,
      "closeButtonPaddingLeft": 5,
      "closeButtonPaddingBottom": 5,
      "headerPaddingLeft": 10,
      "veilHideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "headerPaddingTop": 10,
      "closeButtonBorderSize": 0,
      "closeButtonBorderRadius": 0,
      "shadowBlurRadius": 6,
      "bodyBackgroundColor": [
        "#FFFFFF",
        "#DDDDDD",
        "#FFFFFF"
      ],
      "shadowHorizontalLength": 3,
      "gap": 10,
      "layout": "vertical",
      "closeButtonPressedBorderColor": "#000000",
      "headerBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "headerBackgroundOpacity": 0,
      "closeButtonBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "shadowOpacity": 0.5,
      "bodyPaddingLeft": 0,
      "closeButtonIconLineWidth": 5,
      "paddingBottom": 0,
      "borderRadius": 5,
      "titlePaddingBottom": 5,
      "paddingTop": 0,
      "closeButtonRollOverBackgroundOpacity": 0.3,
      "scrollBarWidth": 10,
      "closeButtonIconWidth": 20,
      "bodyBackgroundColorRatios": [
        0,
        0.5,
        1
      ],
      "closeButtonRollOverIconColor": "#666666"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window100853"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E867D04E_AABF_E499_41E4_19294FCA323D",
      "bodyBackgroundColorDirection": "vertical",
      "titlePaddingLeft": 5,
      "scrollBarColor": "#000000",
      "horizontalAlign": "center",
      "bodyPaddingTop": 0,
      "closeButtonRollOverBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "paddingLeft": 0,
      "headerVerticalAlign": "middle",
      "closeButtonPaddingTop": 5,
      "headerBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "bodyBackgroundOpacity": 0,
      "footerHeight": 5,
      "minHeight": 20,
      "scrollBarVisible": "rollOver",
      "scrollBarOpacity": 0.5,
      "closeButtonRollOverBackgroundColorDirection": "vertical",
      "veilColor": [
        "#000000",
        "#000000"
      ],
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "modal": true,
      "minWidth": 20,
      "veilColorRatios": [
        0,
        1
      ],
      "titleFontSize": "1.29vmin",
      "bodyPaddingBottom": 0,
      "closeButtonBorderColor": "#000000",
      "headerBackgroundColorDirection": "vertical",
      "backgroundColor": [],
      "closeButtonBackgroundColorDirection": "vertical",
      "shadowSpread": 1,
      "shadowVerticalLength": 0,
      "closeButtonBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverIconLineWidth": 5,
      "backgroundOpacity": 1,
      "closeButtonPressedIconLineWidth": 5,
      "shadow": true,
      "titlePaddingTop": 5,
      "class": "Window",
      "closeButtonPressedBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBorderColor": "#000000",
      "footerBackgroundOpacity": 0,
      "closeButtonPressedBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "overflow": "scroll",
      "veilOpacity": 0.4,
      "footerBackgroundColor": [
        "#FFFFFF",
        "#EEEEEE",
        "#DDDDDD"
      ],
      "propagateClick": false,
      "closeButtonRollOverBorderSize": 0,
      "headerPaddingRight": 0,
      "footerBackgroundColorDirection": "vertical",
      "children": [
        "this.viewer_uidEE67D518_AACC_ECBA_41D8_3946152F0640"
      ],
      "veilShowEffect": {
        "class": "FadeInEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "titlePaddingRight": 5,
      "closeButtonIconHeight": 20,
      "paddingRight": 0,
      "shadowColor": "#000000",
      "borderSize": 0,
      "titleFontFamily": "Arial",
      "headerPaddingBottom": 5,
      "backgroundColorDirection": "vertical",
      "closeButtonPressedBackgroundOpacity": 0.3,
      "closeButtonIconColor": "#000000",
      "closeButtonBackgroundOpacity": 0.3,
      "footerBackgroundColorRatios": [
        0,
        0.9,
        1
      ],
      "hideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "contentOpaque": false,
      "closeButtonPaddingRight": 5,
      "scrollBarMargin": 2,
      "closeButtonPaddingLeft": 5,
      "closeButtonPaddingBottom": 5,
      "headerPaddingLeft": 10,
      "veilHideEffect": {
        "class": "FadeOutEffect",
        "duration": 500,
        "easing": "cubic_in_out"
      },
      "headerPaddingTop": 10,
      "closeButtonBorderSize": 0,
      "closeButtonBorderRadius": 0,
      "shadowBlurRadius": 6,
      "bodyBackgroundColor": [
        "#FFFFFF",
        "#DDDDDD",
        "#FFFFFF"
      ],
      "shadowHorizontalLength": 3,
      "gap": 10,
      "layout": "vertical",
      "closeButtonPressedBorderColor": "#000000",
      "headerBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "closeButtonRollOverBackgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "headerBackgroundOpacity": 0,
      "closeButtonBackgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "shadowOpacity": 0.5,
      "bodyPaddingLeft": 0,
      "closeButtonIconLineWidth": 5,
      "paddingBottom": 0,
      "borderRadius": 5,
      "titlePaddingBottom": 5,
      "paddingTop": 0,
      "closeButtonRollOverBackgroundOpacity": 0.3,
      "scrollBarWidth": 10,
      "closeButtonIconWidth": 20,
      "bodyBackgroundColorRatios": [
        0,
        0.5,
        1
      ],
      "closeButtonRollOverIconColor": "#666666"
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.MainViewer",
      "id": "MainViewerVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "MainViewer",
      "left": 0,
      "playbackBarBottom": 5,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.65vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": true,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 0,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "top": 0,
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "toolTipBorderRadius": 3,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "playbackBarHeadHeight": 15,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "Main Viewer"
      }
    },
    {
      "propagateClick": true,
      "scrollBarWidth": 10,
      "id": "Container_B156A269_BF46_B846_41CC_86CDE6B7F756",
      "scrollBarColor": "#000000",
      "paddingRight": 0,
      "right": "0%",
      "paddingLeft": 0,
      "children": [
        "this.Container_B1571269_BF46_B846_41D9_B94D861499DF",
        "this.Container_B1573269_BF46_B846_41AD_E3E55F50C328"
      ],
      "borderSize": 0,
      "scrollBarVisible": "rollOver",
      "width": 113.55,
      "minHeight": 1,
      "horizontalAlign": "left",
      "verticalAlign": "top",
      "scrollBarOpacity": 0.5,
      "scrollBarMargin": 2,
      "contentOpaque": false,
      "minWidth": 1,
      "height": 588.15,
      "top": "0.12%",
      "gap": 10,
      "layout": "absolute",
      "paddingTop": 0,
      "backgroundOpacity": 0,
      "shadow": false,
      "paddingBottom": 0,
      "class": "Container",
      "borderRadius": 0,
      "overflow": "scroll",
      "data": {
        "name": "--SETTINGS"
      }
    },
    {
      "propagateClick": false,
      "scrollBarWidth": 10,
      "id": "Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C",
      "left": "0%",
      "paddingLeft": 15,
      "scrollBarColor": "#000000",
      "paddingRight": 0,
      "children": [
        "this.Image_9897FDC6_A425_CF1F_41E4_38D5870C765B"
      ],
      "borderSize": 0,
      "scrollBarVisible": "rollOver",
      "horizontalAlign": "left",
      "minHeight": 1,
      "verticalAlign": "top",
      "top": "3%",
      "scrollBarOpacity": 0.5,
      "scrollBarMargin": 2,
      "contentOpaque": false,
      "minWidth": 1,
      "height": "19.601%",
      "width": "84.975%",
      "gap": 10,
      "layout": "absolute",
      "paddingTop": 0,
      "paddingLeft": 15,
      "shadow": false,
      "paddingBottom": 0,
      "backgroundOpacity": 0,
      "borderRadius": 0,
      "class": "Container",
      "data": {
        "name": "Tittle"
      },
      "overflow": "scroll"
    },
    {
      "propagateClick": false,
      "scrollBarWidth": 10,
      "id": "Container_320C1ADD_3F4A_FD16_41B0_FBCDFB126CCF",
      "left": "1.49%",
      "paddingLeft": 0,
      "scrollBarColor": "#000000",
      "paddingRight": 0,
      "width": 240,
      "children": [
        "this.Container_B0DBDFD9_BF4E_E879_41D9_B737EF8BC042",
        "this.Container_0458057F_17F5_EF63_41B5_2CE2DF0373FD"
      ],
      "borderSize": 0,
      "scrollBarVisible": "rollOver",
      "minHeight": 1,
      "horizontalAlign": "left",
      "verticalAlign": "top",
      "bottom": "1.99%",
      "contentOpaque": false,
      "minWidth": 1,
      "scrollBarMargin": 2,
      "height": 190,
      "scrollBarOpacity": 0.5,
      "gap": 10,
      "layout": "absolute",
      "paddingTop": 0,
      "backgroundOpacity": 0,
      "shadow": false,
      "paddingBottom": 0,
      "class": "Container",
      "borderRadius": 0,
      "overflow": "scroll",
      "data": {
        "name": "Container1772"
      }
    },
    {
      "backgroundColorRatios": [
        0,
        1
      ],
      "scrollBarWidth": 10,
      "id": "Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B",
      "left": "0%",
      "propagateClick": true,
      "paddingLeft": 0,
      "scrollBarColor": "#000000",
      "paddingRight": 0,
      "right": "0%",
      "children": [
        "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4"
      ],
      "borderSize": 0,
      "scrollBarVisible": "rollOver",
      "minHeight": 1,
      "backgroundColorDirection": "vertical",
      "verticalAlign": "top",
      "scrollBarOpacity": 0.5,
      "bottom": "0%",
      "contentOpaque": false,
      "minWidth": 1,
      "creationPolicy": "inAdvance",
      "top": "0%",
      "click": "this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, false, 0, null, null, false)",
      "horizontalAlign": "left",
      "scrollBarMargin": 2,
      "backgroundColor": [
        "#000000",
        "#000000"
      ],
      "gap": 10,
      "layout": "absolute",
      "paddingTop": 0,
      "shadow": false,
      "paddingBottom": 0,
      "backgroundOpacity": 0.6,
      "borderRadius": 0,
      "visible": false,
      "class": "Container",
      "data": {
        "name": "---FLOORPLAN"
      },
      "overflow": "scroll"
    },
    {
      "backgroundColorRatios": [
        0
      ],
      "id": "veilPopupPanorama",
      "left": 0,
      "propagateClick": false,
      "paddingLeft": 0,
      "paddingRight": 0,
      "right": 0,
      "borderSize": 0,
      "minHeight": 0,
      "backgroundColorDirection": "vertical",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 350,
        "easing": "cubic_in_out"
      },
      "bottom": 0,
      "minWidth": 0,
      "top": 0,
      "backgroundColor": [
        "#000000"
      ],
      "paddingTop": 0,
      "shadow": false,
      "paddingBottom": 0,
      "backgroundOpacity": 0.55,
      "borderRadius": 0,
      "visible": false,
      "class": "UIComponent",
      "data": {
        "name": "UIComponent129720"
      }
    },
    {
      "backgroundColorRatios": [],
      "id": "zoomImagePopupPanorama",
      "left": 0,
      "propagateClick": false,
      "paddingLeft": 0,
      "paddingRight": 0,
      "right": 0,
      "borderSize": 0,
      "minHeight": 0,
      "backgroundColorDirection": "vertical",
      "bottom": 0,
      "minWidth": 0,
      "top": 0,
      "backgroundColor": [],
      "paddingTop": 0,
      "shadow": false,
      "paddingBottom": 0,
      "backgroundOpacity": 1,
      "scaleMode": "custom",
      "borderRadius": 0,
      "visible": false,
      "class": "ZoomImage",
      "data": {
        "name": "ZoomImage129721"
      }
    },
    {
      "textDecoration": "none",
      "shadowSpread": 1,
      "backgroundColorRatios": [
        0,
        0.1,
        1
      ],
      "data": {
        "name": "CloseButton129722"
      },
      "id": "closeButtonPopupPanorama",
      "rollOverIconColor": "#666666",
      "propagateClick": false,
      "paddingLeft": 5,
      "paddingRight": 5,
      "fontFamily": "Arial",
      "right": 10,
      "fontColor": "#FFFFFF",
      "shadowColor": "#000000",
      "borderSize": 0,
      "iconHeight": 20,
      "minHeight": 0,
      "backgroundColorDirection": "vertical",
      "borderColor": "#000000",
      "horizontalAlign": "center",
      "verticalAlign": "middle",
      "showEffect": {
        "class": "FadeInEffect",
        "duration": 350,
        "easing": "cubic_in_out"
      },
      "iconColor": "#000000",
      "minWidth": 0,
      "iconLineWidth": 5,
      "mode": "push",
      "fontSize": "1.29vmin",
      "label": "",
      "backgroundColor": [
        "#DDDDDD",
        "#EEEEEE",
        "#FFFFFF"
      ],
      "shadowBlurRadius": 6,
      "top": 10,
      "gap": 5,
      "layout": "horizontal",
      "fontStyle": "normal",
      "pressedIconColor": "#888888",
      "paddingTop": 5,
      "shadow": false,
      "paddingBottom": 5,
      "backgroundOpacity": 0.3,
      "borderRadius": 0,
      "visible": false,
      "class": "CloseButton",
      "iconBeforeLabel": true,
      "iconWidth": 20,
      "cursor": "hand",
      "fontWeight": "normal"
    },
    {
      "transparencyActive": true,
      "maxHeight": 51.5,
      "toolTipFontFamily": "Arial",
      "propagateClick": true,
      "id": "IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081",
      "rollOverIconURL": "skin/IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081_rollover.png",
      "toolTipShadowSpread": 0,
      "paddingRight": 0,
      "toolTipBorderColor": "#767676",
      "paddingLeft": 0,
      "borderSize": 0,
      "width": 45.5,
      "minHeight": 1,
      "toolTip": "Layar Penuh",
      "horizontalAlign": "center",
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "toolTipShadowBlurRadius": 3,
      "toolTipFontSize": "1.65vmin",
      "verticalAlign": "middle",
      "toolTipTextShadowColor": "#000000",
      "toolTipOpacity": 1,
      "iconURL": "skin/IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081.png",
      "pressedRollOverIconURL": "skin/IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081_pressed_rollover.png",
      "minWidth": 1,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "mode": "toggle",
      "toolTipTextShadowBlurRadius": 3,
      "height": 51.5,
      "toolTipBorderSize": 1,
      "toolTipShadowColor": "#333333",
      "paddingTop": 0,
      "toolTipPaddingLeft": 6,
      "backgroundOpacity": 0,
      "toolTipDisplayTime": 600,
      "shadow": false,
      "paddingBottom": 0,
      "class": "IconButton",
      "toolTipPaddingTop": 4,
      "toolTipBorderRadius": 3,
      "borderRadius": 0,
      "toolTipShadowOpacity": 1,
      "pressedIconURL": "skin/IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081_pressed.png",
      "toolTipShadowHorizontalLength": 0,
      "toolTipPaddingRight": 6,
      "toolTipFontStyle": "normal",
      "cursor": "hand",
      "toolTipShadowVerticalLength": 0,
      "maxWidth": 45.5,
      "data": {
        "name": "IconButton FULLSCREEN"
      },
      "toolTipTextShadowOpacity": 0
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Klik Untuk Memutar Video",
          "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_209CA080_0A76_6D48_419B_E47FA4C680D0, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E8A78108_AABF_E49A_41DD_A9711C5B1813, this.video_281955BC_0A56_3E06_4197_1E835277D5D0, this.PlayList_EAD73F66_AABD_9C96_41C3_96E1A5CA29C5, '95%', '95%', true, true) }"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.62,
          "image": "this.AnimatedImageResource_22A80E95_0BB6_1548_4199_A4DDD69148DF",
          "pitch": 14.66,
          "yaw": 128.32,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_20B520CD_0A76_6ED8_419D_6AF9BCB0FFEB",
      "maps": [
        {
          "hfov": 7.62,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 128.32,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 14.66
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 58.72,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0_HS_4_0.png",
                "class": "ImageResourceLevel",
                "width": 1054,
                "height": 575
              }
            ]
          },
          "pitch": -0.91,
          "yaw": 176.98
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "mapColor": "#FF0000",
          "class": "HotspotPanoramaOverlayArea"
        }
      ],
      "id": "overlay_969F3957_A4E7_D73C_41E2_4D63BC74A5EA",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 58.72,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 176.98,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0_HS_4_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 108
              }
            ]
          },
          "pitch": -0.91
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E3757C5_05AE_1A07_4191_3551B2E75546, this.camera_EB94C720_AACC_EC8A_41C6_EF688766B301); this.mainPlayList.set('selectedIndex', 14)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.57,
          "image": "this.AnimatedImageResource_ED4A65C1_AACC_AF8A_41C8_F0A883D7A3D9",
          "pitch": -37.11,
          "yaw": -177.54,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E8A6C7F5_AAB4_AB8B_41DE_874B7769C012",
      "maps": [
        {
          "hfov": 16.57,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -177.54,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -37.11
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7, this.camera_EB935710_AACC_EC8A_41C8_0F7DF608BDB0); this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.72,
          "image": "this.AnimatedImageResource_E8F8EA0F_AADD_E496_41C7_80A6204B4A64",
          "pitch": -31.45,
          "yaw": 91.79,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E9822846_AADD_E496_41D4_EB41893BFCEF",
      "maps": [
        {
          "hfov": 17.72,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 91.79,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -31.45
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02, this.camera_EB9E072E_AACC_EC96_41E1_EEFE9C554F76); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.49,
          "image": "this.AnimatedImageResource_E8F88A0F_AADD_E496_41AA_99CF88DA4257",
          "pitch": -27.15,
          "yaw": -87.83,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EE49A424_AADC_AC8A_41CC_984E18FBE311",
      "maps": [
        {
          "hfov": 18.49,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -87.83,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -27.15
        }
      ]
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uidEE7FB514_AACC_EC89_41C6_AD2EA03FD353",
      "id": "viewer_uidEE7FB514_AACC_EC89_41C6_AD2EA03FD353VideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uidEE7D1515_AACC_EC8A_41D2_9C60329C9E68",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.11vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "playbackBarHeadHeight": 15,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "toolTipBorderRadius": 3,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "ViewerArea129714"
      }
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE16F521_AACC_EC8A_41D1_A45623E59DAA, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
      "media": "this.panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE16F521_AACC_EC8A_41D1_A45623E59DAA"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE160522_AACC_EC8E_41DF_60CF39B98A10, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
      "media": "this.panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE160522_AACC_EC8E_41DF_60CF39B98A10"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE17B522_AACC_EC8E_41D8_3C2AC32C5D53, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
      "media": "this.panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE17B522_AACC_EC8E_41D8_3C2AC32C5D53"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE173522_AACC_EC8E_41E1_1E050CC7D8DF, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
      "media": "this.panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE173522_AACC_EC8E_41E1_1E050CC7D8DF"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE14A523_AACC_EC8E_41DC_6FA6CE5D25CF, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
      "media": "this.panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE14A523_AACC_EC8E_41DC_6FA6CE5D25CF"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE15F523_AACC_EC8E_41D1_CE9F3A66A533, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
      "media": "this.panorama_0E181F5E_05AE_0A05_416D_04530F9BD830",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE15F523_AACC_EC8E_41D1_CE9F3A66A533"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE157523_AACC_EC8E_41C8_A2771D184396, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
      "media": "this.panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE157523_AACC_EC8E_41C8_A2771D184396"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE1A8523_AACC_EC8E_41E2_5C2ECD8701AA, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
      "media": "this.panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE1A8523_AACC_EC8E_41E2_5C2ECD8701AA"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE15B525_AACC_EC8B_41D8_BE0FA4115BE2, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
      "media": "this.panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE15B525_AACC_EC8B_41D8_BE0FA4115BE2"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE153525_AACC_EC8B_41C7_1E6697F4C880, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
      "media": "this.panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE153525_AACC_EC8B_41C7_1E6697F4C880"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE1AA525_AACC_EC8B_41D7_25D73BF47CC2, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
      "media": "this.panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE1AA525_AACC_EC8B_41D7_25D73BF47CC2"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE1BD525_AACC_EC8B_41CC_D5B8B1D2C171, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
      "media": "this.panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE1BD525_AACC_EC8B_41CC_D5B8B1D2C171"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE1B7526_AACC_EC96_41D1_FBCC3CEA342C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 13)",
      "media": "this.panorama_0E78D269_05AE_3A0F_4194_073D5A49809B",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE1B7526_AACC_EC96_41D1_FBCC3CEA342C"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE189526_AACC_EC96_41E0_68FA17D42B09, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 13, 14)",
      "media": "this.panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE189526_AACC_EC96_41E0_68FA17D42B09"
    },
    {
      "class": "PanoramaPlayListItem",
      "end": "this.trigger('tourEnded')",
      "camera": "this.panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_EE182526_AACC_EC96_4180_6D1097B699B7, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 0)",
      "media": "this.panorama_0E3757C5_05AE_1A07_4191_3551B2E75546",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_EE182526_AACC_EC96_4180_6D1097B699B7"
    },
    {
      "progressBarBorderColor": "#0066FF",
      "data": {
        "name": "Floor Plan big"
      },
      "progressBackgroundColorDirection": "vertical",
      "id": "ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4",
      "left": "15%",
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#FFFFFF",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "toolTipBorderColor": "#767676",
      "right": "15%",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "minHeight": 1,
      "toolTipFontSize": "1.65vmin",
      "toolTipOpacity": 1,
      "playbackBarHeadWidth": 6,
      "toolTipShadowBlurRadius": 3,
      "playbackBarHeight": 10,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarRight": 0,
      "minWidth": 1,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "playbackBarBorderRadius": 0,
      "toolTipShadowColor": "#333333",
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "top": "10%",
      "playbackBarOpacity": 1,
      "bottom": "10%",
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "vrPointerColor": "#FFFFFF",
      "displayTooltipInTouchScreens": true,
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "click": "this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, false, 0, null, null, false)",
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "toolTipBorderRadius": 3,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "playbackBarHeadHeight": 15,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "progressBackgroundColorRatios": [
        0.01
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 107.52,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0_HS_2_0.png",
                "class": "ImageResourceLevel",
                "width": 2048,
                "height": 1806
              }
            ]
          },
          "pitch": -9.44,
          "yaw": 71.77
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Barang"
        }
      ],
      "id": "overlay_944A91E5_A43C_D71C_419D_1E8686154957",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 107.52,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 71.77,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0_HS_2_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 176
              }
            ]
          },
          "pitch": -9.44
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 58.84,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0_HS_3_0.png",
                "class": "ImageResourceLevel",
                "width": 2048,
                "height": 1871
              }
            ]
          },
          "pitch": -9.91,
          "yaw": 152.42
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Barang"
        }
      ],
      "id": "overlay_89FF11AA_A424_5714_41D1_4AC62C89A920",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 58.84,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 152.42,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0_HS_3_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 182
              }
            ]
          },
          "pitch": -9.91
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 17.85,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0_HS_4_0.png",
                "class": "ImageResourceLevel",
                "width": 595,
                "height": 1137
              }
            ]
          },
          "pitch": -17.47,
          "yaw": -48.92
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Kulkas"
        }
      ],
      "id": "overlay_8ABA3E9A_A425_CD37_41D5_48A76E11F6F7",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 17.85,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -48.92,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0_HS_4_1_6_map.gif",
                "class": "ImageResourceLevel",
                "width": 104,
                "height": 200
              }
            ]
          },
          "pitch": -17.47
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E78D269_05AE_3A0F_4194_073D5A49809B, this.camera_EEC6F572_AACC_EC89_41E1_58C2060C35E5); this.mainPlayList.set('selectedIndex', 12)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.62,
          "image": "this.AnimatedImageResource_E25CE6FD_AADB_AD7B_41C4_B2E7D62B16FA",
          "pitch": -32.01,
          "yaw": -20.97,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E9C3663D_AAD5_ECFA_41D2_E24D84985EBF",
      "maps": [
        {
          "hfov": 17.62,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -20.97,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -32.01
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2, this.camera_EEC9F57F_AACC_EF76_41D0_99F97D873C06); this.mainPlayList.set('selectedIndex', 11)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.27,
          "image": "this.AnimatedImageResource_E25C86FD_AADB_AD7B_41D6_11FF155C8567",
          "pitch": -21.06,
          "yaw": -104.45,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EC1B1EDF_AAD5_9DB7_41DD_94658C7036E4",
      "maps": [
        {
          "hfov": 17.27,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -104.45,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -21.06
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 37.75,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0_HS_1_0.png",
                "class": "ImageResourceLevel",
                "width": 1202,
                "height": 2048
              }
            ]
          },
          "pitch": -31.26,
          "yaw": -106.53
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Kulkas"
        }
      ],
      "id": "overlay_97375842_A42C_D514_41A9_8254D9236165",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 37.75,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -106.53,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0_HS_1_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 117,
                "height": 200
              }
            ]
          },
          "pitch": -31.26
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 51.89,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0_HS_2_0.png",
                "class": "ImageResourceLevel",
                "width": 1183,
                "height": 2047
              }
            ]
          },
          "pitch": -7.84,
          "yaw": 91.42
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Barang"
        }
      ],
      "id": "overlay_8BF82655_A42C_DD3D_41D5_C8AA02BD93FE",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 51.89,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 91.42,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0_HS_2_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 115,
                "height": 200
              }
            ]
          },
          "pitch": -7.84
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 35.07,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0_HS_3_0.png",
                "class": "ImageResourceLevel",
                "width": 1197,
                "height": 1117
              }
            ]
          },
          "pitch": -6.71,
          "yaw": 129.19
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Barang"
        }
      ],
      "id": "overlay_8B5E74E5_A424_3D1D_41E0_447C64E4263F",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 35.07,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 129.19,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0_HS_3_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 186
              }
            ]
          },
          "pitch": -6.71
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F, this.camera_EF54F601_AACC_EC8A_417A_133374992C6E); this.mainPlayList.set('selectedIndex', 13)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.73,
          "image": "this.AnimatedImageResource_E25BB6FB_AADB_AD7E_41DA_EB935A991CE3",
          "pitch": -36.36,
          "yaw": 131.27,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EA51FB2F_AAD5_6497_41D6_12A778F80FA3",
      "maps": [
        {
          "hfov": 16.73,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 131.27,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -36.36
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      },
      "hfov": 41.5,
      "autoplay": true,
      "id": "overlay_2C58D54E_0A52_FE05_4137_464CBDB0F4FC",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_2C58D54E_0A52_FE05_4137_464CBDB0F4FC_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 63.21,
      "useHandCursor": true,
      "roll": 1.64,
      "yaw": -121.3,
      "rotationY": -0.64,
      "class": "VideoPanoramaOverlay",
      "rotationX": -63.33,
      "toolTip": "Klik Untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_8A825FD4_A4EC_CB33_41E2_F14C9CC9B1AB, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E860A048_AABF_E49A_41C9_507231FDBAAB, this.video_281955BC_0A56_3E06_4197_1E835277D5D0, this.PlayList_EAD7BF66_AABD_9C96_41E4_768D89849A0D, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 31.47,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 16.78,
      "id": "popup_296F41B4_0A72_6F49_4193_E31832353C88",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 37.01,
      "yaw": -124.32,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 79.53,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0_HS_3_0.png",
                "class": "ImageResourceLevel",
                "width": 1559,
                "height": 1174
              }
            ]
          },
          "pitch": -2.31,
          "yaw": -4.91
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Glass Cabinet"
        }
      ],
      "id": "overlay_95C21AA5_A4EC_551D_41E3_5C775D1D406D",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 79.53,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -4.91,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0_HS_3_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 150
              }
            ]
          },
          "pitch": -2.31
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA, this.camera_EED6A556_AACC_EC89_41E0_83718262124A); this.mainPlayList.set('selectedIndex', 4)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.01,
          "image": "this.AnimatedImageResource_ED4C15C4_AACC_AF8A_4191_B7D3C442BCAA",
          "pitch": -35.04,
          "yaw": -27.2,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E8CE68AC_AAB4_A59A_41DC_1FE5B20E5A8A",
      "maps": [
        {
          "hfov": 17.01,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -27.2,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -35.04
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7, this.camera_EED96565_AACC_EC8B_41AF_C8CC10C8DC7B); this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.9,
          "image": "this.AnimatedImageResource_ED4DA5C4_AACC_AF8A_41D8_4C2DA9FFA013",
          "pitch": -30.5,
          "yaw": 142.41,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EA4D496D_AAB4_E49B_41DD_B21C2B951048",
      "maps": [
        {
          "hfov": 17.9,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 142.41,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -30.5
        }
      ]
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uidEE63B516_AACC_ECB6_41D4_785BB540EA2C",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.11vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "playbackBarHeadHeight": 15,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "toolTipBorderRadius": 3,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "ViewerArea129715"
      }
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uidEE63B516_AACC_ECB6_41D4_785BB540EA2C",
      "id": "viewer_uidEE63B516_AACC_ECB6_41D4_785BB540EA2CVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Tata Tertib Praktikum",
          "click": "this.showPopupPanoramaOverlay(this.popup_2D415209_0AB2_1A0F_4193_0E51D91DB627, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2D414209_0AB2_1A0F_417B_693E4A1B175C, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 11.13,
          "image": "this.AnimatedImageResource_995A8D77_A4EC_4FFD_41E3_E576C3EB6A7D",
          "pitch": -5.61,
          "yaw": 81.38,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2D20B229_0AB2_1A0F_4198_917A678E0BC5",
      "maps": [
        {
          "hfov": 11.13,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 81.38,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -5.61
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Peraturan Setelah Penggunaan Laboratorium",
          "click": "this.showPopupPanoramaOverlay(this.popup_2A8D7960_0AB6_163D_419A_11A867D54C57, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2C30B1F0_0A72_2EC8_4172_E20A21E8BFF0, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 11.83,
          "image": "this.AnimatedImageResource_2C1C11DC_0A72_2EF8_4197_0AC6FF319FDC",
          "pitch": 7.9,
          "yaw": 83.9,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2B88269A_0AB6_1A0D_4195_7406D39285C9",
      "maps": [
        {
          "hfov": 11.83,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 83.9,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 7.9
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      },
      "hfov": 28.77,
      "autoplay": true,
      "id": "overlay_2890A972_0A56_161D_419B_2D242AFD6226",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_2890A972_0A56_161D_419B_2D242AFD6226_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 0.92,
      "useHandCursor": true,
      "roll": -0.73,
      "yaw": -91.97,
      "rotationY": -35.91,
      "class": "VideoPanoramaOverlay",
      "rotationX": -0.1,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_94D039CD_A46D_F72C_41E1_97B12859F9ED, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E867D04E_AABF_E499_41E4_19294FCA323D, this.video_281955BC_0A56_3E06_4197_1E835277D5D0, this.PlayList_EAD4BF69_AABD_9C9A_41D3_A46CF9C0139D, '95%', '95%', true, true) }",
      "videoVisibleOnStop": false,
      "data": {
        "label": "Video"
      },
      "vfov": 20.67,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 7.02,
      "id": "popup_39753FBC_0BB2_12B8_4179_7561D1FA8826",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 10.15,
      "yaw": -105.94,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 20.3,
          "image": "this.AnimatedImageResource_2F99622B_3EF6_BDA7_41CE_C5AC0D2C05CC",
          "pitch": -5.75,
          "yaw": -41.88,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Dilarang memasuki ruangan kecuali Kepala lab dan Laboran"
        }
      ],
      "id": "overlay_30027219_3EF3_9D63_4195_457676AF905A",
      "data": {
        "label": "Circle Door 02"
      },
      "maps": [
        {
          "hfov": 20.3,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -41.88,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -5.75
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 28.36,
          "image": "this.AnimatedImageResource_2F9ED22B_3EF6_BDA7_41BF_44E9E83EE1E5",
          "pitch": -5.66,
          "yaw": -42.03,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Dilarang memasuki ruangan kecuali Kepala lab dan Laboran"
        }
      ],
      "id": "overlay_30039219_3EF3_9D63_41C7_7EA0856C7BE9",
      "data": {
        "label": "Info Red 08"
      },
      "maps": [
        {
          "hfov": 28.36,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -42.03,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -5.66
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 31.62,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_9_0.png",
                "class": "ImageResourceLevel",
                "width": 869,
                "height": 2048
              }
            ]
          },
          "pitch": -13.32,
          "yaw": 63.27
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Penyimpanan"
        }
      ],
      "id": "overlay_8BEC8F59_A464_4B35_41DB_3DC7ED3DBFF3",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 31.62,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 63.27,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_9_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 84,
                "height": 200
              }
            ]
          },
          "pitch": -13.32
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 15.72,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_10_0.png",
                "class": "ImageResourceLevel",
                "width": 522,
                "height": 1871
              }
            ]
          },
          "pitch": -11.24,
          "yaw": 40.99
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Penyimpanan"
        }
      ],
      "id": "overlay_89E8BB62_A464_4B17_41D9_874E05C32FCB",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 15.72,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 40.99,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_10_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 55,
                "height": 200
              }
            ]
          },
          "pitch": -11.24
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 21.06,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_11_0.png",
                "class": "ImageResourceLevel",
                "width": 704,
                "height": 1577
              }
            ]
          },
          "pitch": -6.52,
          "yaw": 31.73
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Penyimpanan"
        }
      ],
      "id": "overlay_8A3FABD4_A467_CB33_41CA_B32DA7A2C1C3",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 21.06,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 31.73,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_11_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 89,
                "height": 200
              }
            ]
          },
          "pitch": -6.52
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134, this.camera_EE9FD5C0_AACC_EF89_41C5_EDC1533BD2F0); this.mainPlayList.set('selectedIndex', 8)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.22,
          "image": "this.AnimatedImageResource_E24776F0_AADB_AD89_41E2_F3EB565632DA",
          "pitch": -13.32,
          "yaw": -119.18,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_ED6C41C8_AAD5_A79A_41D2_1B60F43907A8",
      "maps": [
        {
          "hfov": 20.22,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -119.18,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_12_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -13.32
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 19.56,
          "image": "this.AnimatedImageResource_E24786F1_AADB_AD8A_41E1_CC97C517F027",
          "pitch": -19.74,
          "yaw": 134.67,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 0)",
          "class": "HotspotPanoramaOverlayArea"
        }
      ],
      "id": "overlay_EC40701F_AAD4_E4B7_41DF_8303EAB2394B",
      "data": {
        "label": "Arrow 01c"
      },
      "maps": [
        {
          "hfov": 19.56,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 134.67,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_15_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -19.74
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2, this.camera_EEB1D5D9_AACC_EFBA_41D4_E49D94E2F0E8); this.mainPlayList.set('selectedIndex', 11)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.89,
          "image": "this.AnimatedImageResource_E8F1CA20_AADD_E48A_41E1_F69F36866E71",
          "pitch": -35.6,
          "yaw": 0.94,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EB54B96D_AADD_A49A_41E2_96CBD9B8C3B9",
      "maps": [
        {
          "hfov": 16.89,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 0.94,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_16_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -35.6
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040, this.camera_EE8AB5CD_AACC_EF9B_41E2_87BD52EBCEBF); this.mainPlayList.set('selectedIndex', 6)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.4,
          "image": "this.AnimatedImageResource_ED99CE87_AAD4_BD96_41B1_6DA8FC8EBB89",
          "pitch": -27.67,
          "yaw": -179.62,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EE01C25E_AADC_A4B9_41D8_638A6F0003F0",
      "maps": [
        {
          "hfov": 18.4,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -179.62,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_17_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -27.67
        }
      ]
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uidEE7EE512_AACC_EC8E_41DD_466BC7B9EFAA",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.11vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "playbackBarHeadHeight": 15,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "toolTipBorderRadius": 3,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "ViewerArea129712"
      }
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uidEE7D1515_AACC_EC8A_41D2_9C60329C9E68",
      "id": "viewer_uidEE7D1515_AACC_EC8A_41D2_9C60329C9E68VideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_0_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 2393.7,
        "x": 176.64,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 2393.7,
        "width": 80,
        "x": 176.64,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_0.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 4)"
        }
      ],
      "id": "overlay_3FAD0AF0_2A24_3167_41A6_053185D5BEFA",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_1_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 2360.58,
        "x": 617.88,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 2360.58,
        "width": 80,
        "x": 617.88,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_1.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 3)"
        }
      ],
      "id": "overlay_3FAD7AF0_2A24_3167_41A9_E42E6F3636D0",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_2_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 2403.49,
        "x": 1010.15,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 2403.49,
        "width": 80,
        "x": 1010.15,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_2.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "id": "overlay_3FAD5AF0_2A24_3167_41A3_A6990286F421",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_3_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1835.29,
        "x": 1002.67,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1835.29,
        "width": 80,
        "x": 1002.67,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_3.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 1)"
        }
      ],
      "id": "overlay_3FADBAF0_2A24_3167_41B3_8EA529BD38ED",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_4_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1827.64,
        "x": 609.33,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1827.64,
        "width": 80,
        "x": 609.33,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_4.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 14)"
        }
      ],
      "id": "overlay_3FADCAF0_2A24_3167_41C0_493985AB4628",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_5_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1818.2,
        "x": 188.03,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1818.2,
        "width": 80,
        "x": 188.03,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_5.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 5)"
        }
      ],
      "id": "overlay_3FADDAF0_2A24_3167_41C4_B55B983C518B",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_6_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1168.63,
        "x": 169.87,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1168.63,
        "width": 80,
        "x": 169.87,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_6.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 10)"
        }
      ],
      "id": "overlay_3FACAAF0_2A24_3167_41BF_873F393CCBF5",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_7_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1130.7,
        "x": 624.82,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1130.7,
        "width": 80,
        "x": 624.82,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_7.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "id": "overlay_3FAC8AF2_2A24_316B_41C1_C7FA34B94E21",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_8_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 576.21,
        "x": 201.21,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 576.21,
        "width": 80,
        "x": 201.21,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_8.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 6)"
        }
      ],
      "id": "overlay_3FACFAF2_2A24_316B_41A9_96EE67D92056",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_9_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 60.36,
        "x": 202.46,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 60.36,
        "width": 80,
        "x": 202.46,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_9.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 7)"
        }
      ],
      "id": "overlay_3FAD2AF2_2A24_316B_41AE_A32D849AF0A8",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_10_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 57.69,
        "x": 577.99,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 57.69,
        "width": 80,
        "x": 577.99,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_10.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 8)"
        }
      ],
      "id": "overlay_3FAD0AF2_2A24_316B_41C0_A6892E2BBFC9",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_11_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 564.64,
        "x": 1069.09,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 564.64,
        "width": 80,
        "x": 1069.09,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_11.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 9)"
        }
      ],
      "id": "overlay_3FAD6AF2_2A24_316B_41B3_8FE9F2C03890",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_12_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 564.64,
        "x": 1395.3,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 564.64,
        "width": 80,
        "x": 1395.3,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_12.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 11)"
        }
      ],
      "id": "overlay_3F5A6E14_2A24_10AF_419A_3F976178F733",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_13_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 534.72,
        "x": 1822.47,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 534.72,
        "width": 80,
        "x": 1822.47,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_13.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 13)"
        }
      ],
      "id": "overlay_3F5A0E14_2A24_10AF_41BD_881D786F593C",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_14_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 227.92,
        "x": 1817.49,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 227.92,
        "width": 80,
        "x": 1817.49,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3F06E654_2A3C_10AF_419C_CAA672FC614E_HS_14.png",
              "class": "ImageResourceLevel",
              "width": 80,
              "height": 80
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 12)"
        }
      ],
      "id": "overlay_3F45DE14_2A24_10AF_41B0_E851E9FCF261",
      "data": {
        "label": "Image"
      }
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uidEE61A517_AACC_ECB6_41D8_A9F2D9C48545",
      "id": "viewer_uidEE61A517_AACC_ECB6_41D8_A9F2D9C48545VideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uidEE7EE512_AACC_EC8E_41DD_466BC7B9EFAA",
      "id": "viewer_uidEE7EE512_AACC_EC8E_41DD_466BC7B9EFAAVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.showPopupPanoramaOverlay(this.popup_2B4ECE46_0AB2_0A05_41A0_79862BE9B3E4, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2B4F2E46_0AB2_0A05_4193_1692F5F776E7, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.68,
          "image": "this.AnimatedImageResource_2C1D61DE_0A72_2EF8_4191_B206FBBFEBD2",
          "pitch": -1.22,
          "yaw": -172.3,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2B134E88_0AB2_0A0E_4181_33E9171EFFBC",
      "maps": [
        {
          "hfov": 7.68,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -172.3,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -1.22
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.showPopupPanoramaOverlay(this.popup_2B31EE53_0AB2_0A03_4158_8FE8685CD958, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2B31CE53_0AB2_0A03_4192_45F552D1F93F, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.67,
          "image": "this.AnimatedImageResource_2C1DA1DE_0A72_2EF8_4197_E1C9D347BC58",
          "pitch": 2.58,
          "yaw": -166.15,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2B13BE88_0AB2_0A0E_41A0_973194D03AC6",
      "maps": [
        {
          "hfov": 7.67,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -166.15,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 2.58
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 36.71,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_5_0.png",
                "class": "ImageResourceLevel",
                "width": 829,
                "height": 2048
              }
            ]
          },
          "pitch": -2.93,
          "yaw": -34.38
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Glass Cabinet"
        }
      ],
      "id": "overlay_89BD41B0_A4DC_3774_419F_4B85259D0E74",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 36.71,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -34.38,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_5_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 80,
                "height": 200
              }
            ]
          },
          "pitch": -2.93
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 30.41,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_6_0.png",
                "class": "ImageResourceLevel",
                "width": 1072,
                "height": 252
              }
            ]
          },
          "pitch": -20.36,
          "yaw": 41.89,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "mapColor": "#FF0000",
          "class": "HotspotPanoramaOverlayArea"
        }
      ],
      "id": "overlay_9D386B76_A4DC_4BFF_41D5_5C09D9C815CD",
      "data": {
        "label": "Pintu Keluar"
      },
      "maps": [
        {
          "hfov": 30.41,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 41.89,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_6_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 68,
                "height": 16
              }
            ]
          },
          "pitch": -20.36
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 31.96,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_7_0.png",
                "class": "ImageResourceLevel",
                "width": 1070,
                "height": 251
              }
            ]
          },
          "pitch": -9.21,
          "yaw": -145.85,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "mapColor": "#FF0000",
          "class": "HotspotPanoramaOverlayArea"
        }
      ],
      "id": "overlay_9D85F308_A4DC_7B13_41D5_B3606CE7C53A",
      "data": {
        "label": "Pintu Keluar"
      },
      "maps": [
        {
          "hfov": 31.96,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -145.85,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_7_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 68,
                "height": 16
              }
            ]
          },
          "pitch": -9.21
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 16.37,
          "image": "this.AnimatedImageResource_95A090DE_A42C_552C_41D0_D6734D042A84",
          "pitch": -2.15,
          "yaw": 40.11,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Pintu Keluar",
          "click": "this.openLink('../index.htm?media-name=IMG_20260427_114453_00_007', '_self')"
        }
      ],
      "id": "overlay_9C37CB0F_A4DC_4B2D_41D9_B901C35EDF70",
      "data": {
        "label": "Circle Door 02"
      },
      "maps": [
        {
          "hfov": 16.37,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 40.11,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -2.15
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 7.84,
          "image": "this.AnimatedImageResource_95A0A0DE_A42C_552C_41E1_7A73AF06E3F1",
          "pitch": -0.86,
          "yaw": -151.26,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Pintu Keluar",
          "click": "this.openLink('../index.htm?media-name=IMG_20260427_114453_00_007', '_self')"
        }
      ],
      "id": "overlay_9C94C1F3_A4DC_76F5_41D9_43A2C024E1C5",
      "data": {
        "label": "Circle Door 02"
      },
      "maps": [
        {
          "hfov": 7.84,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -151.26,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -0.86
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E181F5E_05AE_0A05_416D_04530F9BD830, this.camera_EB8C2758_AACC_ECBA_41E4_BEA6B01D9F6B); this.mainPlayList.set('selectedIndex', 5)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.49,
          "image": "this.AnimatedImageResource_E25846F2_AADB_AD8E_419D_2E6C4D735FB4",
          "pitch": -20.3,
          "yaw": -54.96,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EA564714_AAD4_AC8A_41DB_7451A0BCB4A9",
      "maps": [
        {
          "hfov": 19.49,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -54.96,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_10_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -20.3
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02, this.camera_EC51B79E_AACC_EBB9_41B2_D40C3803E0E3); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.93,
          "image": "this.AnimatedImageResource_E258F6F3_AADB_AD8E_41D6_89EFF7126D09",
          "pitch": -35.41,
          "yaw": -155.07,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EBB44A9C_AAD7_65B9_41E3_53DC85BACEB9",
      "maps": [
        {
          "hfov": 16.93,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -155.07,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_11_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -35.41
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 6)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.29,
          "image": "this.AnimatedImageResource_E25896F3_AADB_AD8E_41DB_F7270E46C596",
          "pitch": -21.82,
          "yaw": 119.56,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EEED142B_AAD7_EC9F_41C2_D133B1E05B8A",
      "maps": [
        {
          "hfov": 19.29,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 119.56,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_12_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -21.82
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      },
      "hfov": 65.56,
      "autoplay": true,
      "id": "overlay_33622F95_3EF3_E363_41B2_C18F43F76016",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_33622F95_3EF3_E363_41B2_C18F43F76016_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 1.37,
      "useHandCursor": true,
      "roll": 0.91,
      "yaw": 37.44,
      "rotationY": 72.84,
      "class": "VideoPanoramaOverlay",
      "rotationX": -0.26,
      "toolTip": "Klik Untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_8BFF396C_A4E4_D713_41A1_10AED543F7D2, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E861B04A_AABF_E49E_41DD_0395207151EF, this.video_281955BC_0A56_3E06_4197_1E835277D5D0, this.PlayList_EAD69F68_AABD_9C9A_41E0_749EF6C6C8B5, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 37.56,
      "distance": 50
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      },
      "hfov": 27.68,
      "autoplay": true,
      "id": "overlay_320B2D46_3EF2_A7E1_41C8_F58E26D0C707",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_320B2D46_3EF2_A7E1_41C8_F58E26D0C707_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 1.27,
      "useHandCursor": true,
      "roll": -2.53,
      "yaw": 54.82,
      "rotationY": 65.31,
      "class": "VideoPanoramaOverlay",
      "rotationX": -3.39,
      "toolTip": "Klik Untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_8A192DBB_A4E4_CF75_41C1_8249A74893DE, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E866104B_AABF_E49E_41E3_CBCD33D6471B, this.video_281955BC_0A56_3E06_4197_1E835277D5D0, this.PlayList_EAD51F68_AABD_9C9A_419C_719447818587, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 18.91,
      "distance": 50
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134, this.camera_EEF6658B_AACC_EF9E_41E1_DE62CD58C4B8); this.mainPlayList.set('selectedIndex', 8)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.28,
          "image": "this.AnimatedImageResource_E24246E5_AADB_AD8A_41CF_5BBC36D445FD",
          "pitch": -33.71,
          "yaw": 59.31,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E9F6F5E9_AACB_AF9B_41D1_84BDA56FCC39",
      "maps": [
        {
          "hfov": 17.28,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 59.31,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0_HS_2_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -33.71
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040, this.camera_EEFF5598_AACC_EFB9_41C9_DCD684B5BDCA); this.mainPlayList.set('selectedIndex', 6)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.59,
          "image": "this.AnimatedImageResource_E242F6E5_AADB_AD8A_41DD_DBE4B1EE1038",
          "pitch": -26.54,
          "yaw": 145.44,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EB7E3469_AACB_6C9A_41CC_945B849EA6E5",
      "maps": [
        {
          "hfov": 18.59,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 145.44,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -26.54
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      },
      "hfov": 8.27,
      "autoplay": true,
      "id": "overlay_28A918BC_0A72_1605_4196_F5993A1D0AC6",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_28A918BC_0A72_1605_4196_F5993A1D0AC6_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 13.21,
      "useHandCursor": true,
      "roll": 6.94,
      "yaw": -154.42,
      "rotationY": -10.51,
      "class": "VideoPanoramaOverlay",
      "rotationX": -8.77,
      "videoVisibleOnStop": false,
      "data": {
        "label": "Video"
      },
      "vfov": 5.57,
      "distance": 50
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 90,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_2_00000.png",
                "class": "ImageResourceLevel",
                "width": 936,
                "height": 936
              }
            ]
          },
          "pitch": 0,
          "yaw": 0
        },
        {
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_2_00003.png",
                "class": "ImageResourceLevel",
                "width": 936,
                "height": 936
              }
            ]
          },
          "pitch": 0,
          "hfov": 90,
          "yaw": -90
        },
        {
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_2_00004.png",
                "class": "ImageResourceLevel",
                "width": 936,
                "height": 936
              }
            ]
          },
          "pitch": 90,
          "hfov": 90,
          "yaw": 0
        },
        {
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_2_00005.png",
                "class": "ImageResourceLevel",
                "width": 936,
                "height": 936
              }
            ]
          },
          "pitch": -90,
          "hfov": 90,
          "yaw": 0
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Glass Cabinet"
        }
      ],
      "id": "overlay_95AAEF2E_A4E4_4B6F_41DD_8C4A636F2AC0",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 90,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 0,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_2_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 200
              }
            ]
          },
          "pitch": 0
        },
        {
          "hfov": 90,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -90,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_2_2_3_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 200
              }
            ]
          },
          "pitch": 0
        },
        {
          "hfov": 90,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 0,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_2_3_4_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 200
              }
            ]
          },
          "pitch": 90
        },
        {
          "hfov": 90,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 0,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_2_4_5_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 200
              }
            ]
          },
          "pitch": -90
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E3757C5_05AE_1A07_4191_3551B2E75546, this.camera_EBE0B6D7_AACC_EDB6_41E0_89829025B1C6); this.mainPlayList.set('selectedIndex', 14)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.58,
          "image": "this.AnimatedImageResource_E24D06DA_AADB_ADBE_41CD_66EBC5FEE9F6",
          "pitch": -32.2,
          "yaw": 146.38,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EC5E44A8_AACD_AD9A_41E1_D18D3FD96799",
      "maps": [
        {
          "hfov": 17.58,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 146.38,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -32.2
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 10)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19,
          "image": "this.AnimatedImageResource_E24DC6DA_AADB_ADBE_41C2_0B2B2CAB474C",
          "pitch": -23.89,
          "yaw": 54.96,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EF9AAF67_AACD_BC96_41E0_E2D67603A263",
      "maps": [
        {
          "hfov": 19,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 54.96,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -23.89
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 90,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0_HS_2_00000.png",
                "class": "ImageResourceLevel",
                "width": 936,
                "height": 936
              }
            ]
          },
          "pitch": 0,
          "yaw": 0
        }

      ],
      "id": "overlay_99C569FC_A4ED_F6F3_41D1_857D01F1E4FD",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 90,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 0,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0_HS_2_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 200
              }
            ]
          },
          "pitch": 0
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6, this.camera_EBE7B6EA_AACC_ED9F_419A_5FC005766910); this.mainPlayList.set('selectedIndex', 3)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.11,
          "image": "this.AnimatedImageResource_ED4BE5C1_AACC_AF8A_41C1_6EC390382CD1",
          "pitch": -29.37,
          "yaw": 151.86,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E841A5EF_AAB5_EF96_41E4_D846E50333BE",
      "maps": [
        {
          "hfov": 18.11,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 151.86,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -29.37
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E, this.camera_EBE9E6FD_AACC_ED7A_41E3_83F3376CBC8A); this.mainPlayList.set('selectedIndex', 1)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 14.17,
          "image": "this.AnimatedImageResource_ED4B25C2_AACC_AF8E_41D7_6BE322B98431",
          "pitch": -28.05,
          "yaw": -116.25,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EA489FD2_AAB5_7B8E_41DE_5BD315FB03C1",
      "maps": [
        {
          "hfov": 14.17,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -116.25,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -28.05
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Klik Untuk Memutar Video",
          "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_2C649E03_0A72_F548_41A0_50F482DEA885, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E8A4C109_AABF_E49A_41D4_75638EB32BAB, this.video_281955BC_0A56_3E06_4197_1E835277D5D0, this.PlayList_EAD66F66_AABD_9C96_41BB_4DCACAB645CE, '95%', '95%', true, true) }"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 10.2,
          "image": "this.AnimatedImageResource_22AF3EA3_0BB6_1548_419C_227AECB9973B",
          "pitch": 21.9,
          "yaw": 170.43,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2D8A8E2D_0A72_F558_419F_C2BA5EFD7DAF",
      "maps": [
        {
          "hfov": 10.2,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 170.43,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_2_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 21.9
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 90,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_3_00000.png",
                "class": "ImageResourceLevel",
                "width": 936,
                "height": 936
              }
            ]
          },
          "pitch": 0,
          "yaw": 0
        },
        {
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_3_00001.png",
                "class": "ImageResourceLevel",
                "width": 936,
                "height": 936
              }
            ]
          },
          "pitch": 0,
          "hfov": 90,
          "yaw": 90
        },
        {
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_3_00003.png",
                "class": "ImageResourceLevel",
                "width": 936,
                "height": 936
              }
            ]
          },
          "pitch": 0,
          "hfov": 90,
          "yaw": -90
        },
        {
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_3_00004.png",
                "class": "ImageResourceLevel",
                "width": 936,
                "height": 936
              }
            ]
          },
          "pitch": 90,
          "hfov": 90,
          "yaw": 0
        },
        {
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_3_00005.png",
                "class": "ImageResourceLevel",
                "width": 936,
                "height": 936
              }
            ]
          },
          "pitch": -90,
          "hfov": 90,
          "yaw": 0
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Glass Cabinet"
        }
      ],
      "id": "overlay_94AE32E5_A4E4_D51C_41D4_F5B9B7BC69B4",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 90,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 0,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_3_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 200
              }
            ]
          },
          "pitch": 0
        },
        {
          "hfov": 90,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 90,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_3_2_1_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 200
              }
            ]
          },
          "pitch": 0
        },
        {
          "hfov": 90,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -90,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_3_3_3_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 200
              }
            ]
          },
          "pitch": 0
        },
        {
          "hfov": 90,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 0,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_3_4_4_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 200
              }
            ]
          },
          "pitch": 90
        },
        {
          "hfov": 90,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 0,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_3_5_5_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 200
              }
            ]
          },
          "pitch": -90
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6, this.camera_EB83173C_AACC_ECFA_4189_DDA63B483810); this.mainPlayList.set('selectedIndex', 3)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.4,
          "image": "this.AnimatedImageResource_ED4E15C6_AACC_AF96_41A1_407CC742D054",
          "pitch": -33.15,
          "yaw": 155.63,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EC42D9B7_AACB_E7F7_418B_F9D4AD5B3111",
      "maps": [
        {
          "hfov": 17.4,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 155.63,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -33.15
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E181F5E_05AE_0A05_416D_04530F9BD830, this.camera_EB8A6749_AACC_EC9A_41E5_0094F29AC909); this.mainPlayList.set('selectedIndex', 5)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.49,
          "image": "this.AnimatedImageResource_EA7D6600_AACC_AC8B_41CD_A5105603DF66",
          "pitch": -27.1,
          "yaw": 67.62,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EA4C9CB5_AACD_7D8A_41D7_B13664BA8715",
      "maps": [
        {
          "hfov": 18.49,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 67.62,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -27.1
        }
      ]
    },
    {
      "transparencyActive": true,
      "maxHeight": 58,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "propagateClick": true,
      "id": "IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7",
      "toolTipShadowSpread": 0,
      "paddingRight": 0,
      "toolTipBorderColor": "#767676",
      "paddingLeft": 0,
      "borderSize": 0,
      "width": 58,
      "minHeight": 1,
      "toolTip": "VR Mode",
      "horizontalAlign": "center",
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "toolTipShadowBlurRadius": 3,
      "toolTipFontSize": "1.65vmin",
      "verticalAlign": "middle",
      "toolTipTextShadowColor": "#000000",
      "toolTipOpacity": 1,
      "iconURL": "skin/IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7.png",
      "minWidth": 1,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "mode": "push",
      "toolTipTextShadowBlurRadius": 3,
      "height": 58,
      "toolTipBorderSize": 1,
      "toolTipShadowColor": "#333333",
      "rollOverIconURL": "skin/IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7_rollover.png",
      "paddingTop": 0,
      "toolTipPaddingLeft": 6,
      "backgroundOpacity": 0,
      "toolTipDisplayTime": 600,
      "shadow": false,
      "paddingBottom": 0,
      "class": "IconButton",
      "toolTipPaddingTop": 4,
      "toolTipBorderRadius": 3,
      "borderRadius": 0,
      "toolTipShadowOpacity": 1,
      "toolTipPaddingRight": 6,
      "toolTipFontStyle": "normal",
      "cursor": "hand",
      "toolTipShadowHorizontalLength": 0,
      "maxWidth": 58,
      "data": {
        "name": "IconButton VR"
      },
      "toolTipTextShadowOpacity": 0
    },
    {
      "transparencyActive": true,
      "maxHeight": 51.5,
      "toolTipFontFamily": "Arial",
      "propagateClick": true,
      "id": "IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781",
      "rollOverIconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_rollover.png",
      "toolTipShadowSpread": 0,
      "paddingRight": 0,
      "toolTipBorderColor": "#767676",
      "paddingLeft": 0,
      "borderSize": 0,
      "width": 45.5,
      "minHeight": 1,
      "toolTip": "Nonaktifkan Hotspot",
      "horizontalAlign": "center",
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "toolTipShadowBlurRadius": 3,
      "toolTipFontSize": "1.65vmin",
      "verticalAlign": "middle",
      "toolTipTextShadowColor": "#000000",
      "toolTipOpacity": 1,
      "iconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_v3.png",
      "pressedRollOverIconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_pressed_rollover.png",
      "minWidth": 1,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "mode": "toggle",
      "toolTipTextShadowBlurRadius": 3,
      "height": 51.5,
      "toolTipBorderSize": 1,
      "toolTipShadowColor": "#333333",
      "paddingTop": 0,
      "toolTipPaddingLeft": 6,
      "backgroundOpacity": 0,
      "toolTipDisplayTime": 600,
      "shadow": false,
      "paddingBottom": 0,
      "class": "IconButton",
      "toolTipPaddingTop": 4,
      "toolTipBorderRadius": 3,
      "borderRadius": 0,
      "toolTipShadowOpacity": 1,
      "pressedIconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_pressed_v3.png",
      "toolTipShadowHorizontalLength": 0,
      "toolTipPaddingRight": 6,
      "toolTipFontStyle": "normal",
      "cursor": "hand",
      "toolTipShadowVerticalLength": 0,
      "maxWidth": 45.5,
      "data": {
        "name": "IconButton HS "
      },
      "toolTipTextShadowOpacity": 0
    },
    {
      "transparencyActive": true,
      "maxHeight": 51.5,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "propagateClick": true,
      "id": "IconButton_B156C269_BF46_B846_41B6_1BAAE2858250",
      "rollOverIconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_rollover_v2.png",
      "toolTipShadowSpread": 0,
      "paddingRight": 0,
      "toolTipBorderColor": "#767676",
      "paddingLeft": 0,
      "borderSize": 0,
      "width": 45.5,
      "minHeight": 1,
      "toolTip": "Gyroscope",
      "horizontalAlign": "center",
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "toolTipShadowBlurRadius": 3,
      "toolTipFontSize": "1.65vmin",
      "verticalAlign": "middle",
      "toolTipTextShadowColor": "#000000",
      "toolTipOpacity": 1,
      "iconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_v2.png",
      "pressedRollOverIconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_pressed_rollover_v2.png",
      "minWidth": 1,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "mode": "toggle",
      "toolTipTextShadowBlurRadius": 3,
      "height": 51.5,
      "toolTipBorderSize": 1,
      "toolTipShadowColor": "#333333",
      "paddingTop": 0,
      "toolTipPaddingLeft": 6,
      "backgroundOpacity": 0,
      "toolTipDisplayTime": 600,
      "shadow": false,
      "paddingBottom": 0,
      "class": "IconButton",
      "toolTipPaddingTop": 4,
      "toolTipBorderRadius": 3,
      "borderRadius": 0,
      "toolTipShadowOpacity": 1,
      "pressedIconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_pressed_v2.png",
      "toolTipPaddingRight": 6,
      "toolTipFontStyle": "normal",
      "cursor": "hand",
      "toolTipShadowHorizontalLength": 0,
      "maxWidth": 45.5,
      "data": {
        "name": "IconButton GYRO"
      },
      "toolTipTextShadowOpacity": 0
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uidEE78B511_AACC_EC8B_41D9_87425C77F79A",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.11vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "playbackBarHeadHeight": 15,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "toolTipBorderRadius": 3,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "ViewerArea129711"
      }
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uidEE61A517_AACC_ECB6_41D8_A9F2D9C48545",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.11vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "playbackBarHeadHeight": 15,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "toolTipBorderRadius": 3,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "ViewerArea129718"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_0_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 2394.23,
        "x": 177.35,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 2393.87,
        "width": 48.15,
        "x": 176.82,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_0.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 4)"
        }
      ],
      "id": "overlay_29C09D0C_0A52_7758_4184_438BFC8A9436",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_1_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 2400.46,
        "x": 600.61,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 2399.93,
        "width": 48.15,
        "x": 600.25,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_1.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 3)"
        }
      ],
      "id": "overlay_29D0C357_0A51_F3C8_4193_4202D53470F3",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_2_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 2403.85,
        "x": 1010.68,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 2403.67,
        "width": 48.15,
        "x": 1010.33,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_2.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "id": "overlay_2C2C450F_0A56_1758_41A0_7AB7DFEE04FE",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_3_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 1835.83,
        "x": 1003.38,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 1835.47,
        "width": 48.15,
        "x": 1002.85,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_3.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 1)"
        }
      ],
      "id": "overlay_29CA04CF_0A56_36D8_41A0_080C586DEB51",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_4_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 1828.17,
        "x": 609.86,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 1827.81,
        "width": 48.15,
        "x": 609.51,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_4.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 14)"
        }
      ],
      "id": "overlay_2B78A218_0A56_2D78_4154_5B78D041462C",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_5_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 1818.73,
        "x": 188.57,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 1818.38,
        "width": 48.15,
        "x": 188.21,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_5.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 5)"
        }
      ],
      "id": "overlay_29CE0144_0A56_6FC8_4181_21945F6DBAFE",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_6_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 1168.91,
        "x": 170.18,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 1168.8,
        "width": 48.15,
        "x": 170.05,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_6.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 10)"
        }
      ],
      "id": "overlay_2B56CC62_0A56_15C8_4194_65732EBF21C9",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_7_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 1131.23,
        "x": 625.18,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 1130.88,
        "width": 48.15,
        "x": 625,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_7.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "id": "overlay_2CEC6CA6_0A56_1548_4185_F15004D7C69E",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_8_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 576.75,
        "x": 201.75,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 576.39,
        "width": 48.15,
        "x": 201.39,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_8.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 6)"
        }
      ],
      "id": "overlay_2AEF8619_0A56_1578_4177_557B816BCF8A",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_9_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 60.9,
        "x": 202.99,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 60.54,
        "width": 48.15,
        "x": 202.64,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_9.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 7)"
        }
      ],
      "id": "overlay_2CA08C5C_0A56_75F8_4175_B42183831BD4",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_10_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 58.23,
        "x": 578.53,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 58.05,
        "width": 48.15,
        "x": 578.17,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_10.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 8)"
        }
      ],
      "id": "overlay_2EA5E864_0A56_3DC8_418C_B4B1FCDA1A8B",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_11_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 565.17,
        "x": 1069.62,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 564.99,
        "width": 48.15,
        "x": 1069.27,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_11.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 9)"
        }
      ],
      "id": "overlay_2C845AC6_0A56_12C8_4180_6690F5D4FF19",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_12_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 565.17,
        "x": 1395.83,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 564.99,
        "width": 48.15,
        "x": 1395.48,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_12.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 11)"
        }
      ],
      "id": "overlay_2AA68E8E_0A56_1558_4195_300D9116E70A",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_13_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 535.26,
        "x": 1823.18,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 534.9,
        "width": 48.15,
        "x": 1822.65,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_13.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 13)"
        }
      ],
      "id": "overlay_2C25BDEE_0A56_36D8_419D_EFC212EA94C0",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 48.15,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_14_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 19
            }
          ]
        },
        "y": 228.45,
        "x": 1818.02,
        "offsetY": 0,
        "height": 57.05,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 57.05,
        "y": 228.1,
        "width": 48.15,
        "x": 1817.66,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_2B68880C_0A52_FD58_417D_95178D044B10_HS_14.png",
              "class": "ImageResourceLevel",
              "width": 48,
              "height": 57
            }
          ]
        }
      },
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotMapOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 12)"
        }
      ],
      "id": "overlay_293835CD_0A56_76D8_4191_A711A581D6D6",
      "data": {
        "label": "Image"
      }
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 9.9,
          "image": "this.AnimatedImageResource_9A4787BD_A424_3B6D_41D5_0260E8FB4D28",
          "pitch": -0.02,
          "yaw": 134.18,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Pintu Keluar",
          "click": "this.openLink('../index.htm?media-name=IMG_20260427_114453_00_007', '_self')"
        }
      ],
      "id": "overlay_1B87B3C9_0652_1A0F_4192_DABD88793C6B",
      "data": {
        "label": "Circle Door 02"
      },
      "maps": [
        {
          "hfov": 9.9,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 134.18,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -0.02
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 12.62,
          "image": "this.AnimatedImageResource_9A4767BE_A424_3B6F_41BA_03DE79710539",
          "pitch": 0.17,
          "yaw": -45.47,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Pintu Keluar",
          "click": "this.openLink('../index.htm?media-name=IMG_20260427_114453_00_007', '_self')"
        }
      ],
      "id": "overlay_1B87A3C9_0652_1A0F_419B_162355E33431",
      "data": {
        "label": "Circle Door 02"
      },
      "maps": [
        {
          "hfov": 12.62,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -45.47,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 0.17
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Tata Tertib Praktikum",
          "click": "this.showPopupPanoramaOverlay(this.popup_178324D3_0AD2_FE03_4178_16C6EB766305, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2A8D9834_0AD2_3605_419B_94739E4D31AA, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.68,
          "image": "this.AnimatedImageResource_2CCC10EF_0AF2_7603_4192_7849C8C1669C",
          "pitch": -1.63,
          "yaw": -85.37,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_16D4308B_0AFE_7603_4178_93F368A811B4",
      "maps": [
        {
          "hfov": 7.68,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -85.37,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -1.63
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Peraturan Setelah Penggunaan Laboratorium",
          "click": "this.showPopupPanoramaOverlay(this.popup_2A1223CC_0AD6_FA05_4184_92549CC03285, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2A8C5839_0AD2_360F_4165_9FFC5FD9DC7B, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.65,
          "image": "this.AnimatedImageResource_2CCCC0EF_0AF2_7603_4167_B0AFAE2D7810",
          "pitch": 5.24,
          "yaw": -77.78,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_291F46EB_0AFE_1A03_4199_1B0BA9E492B7",
      "maps": [
        {
          "hfov": 7.65,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -77.78,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_10_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 5.24
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      },
      "hfov": 7.03,
      "autoplay": true,
      "id": "overlay_28933868_0A56_760D_4182_7BD4A000BEFE",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_28933868_0A56_760D_4182_7BD4A000BEFE_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 8.5,
      "useHandCursor": true,
      "roll": -0.5,
      "yaw": 51.79,
      "rotationY": 4.71,
      "class": "VideoPanoramaOverlay",
      "rotationX": -27.86,
      "toolTip": "Klik Untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_97D9C52E_A4EC_5F6C_41A7_768B48A23B29, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E860F046_AABF_E496_41D0_0AAE039F3E25, this.video_281955BC_0A56_3E06_4197_1E835277D5D0, this.PlayList_EAD00F65_AABD_9C8A_41BC_DC5DBDD1DC13, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 6.19,
      "distance": 50
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Klik untuk memutar video",
          "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_2EE25834_0A7E_3D48_419E_B9BDB5E75114, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E8A77107_AABF_E497_41D5_757A6FA7CE43, this.video_281955BC_0A56_3E06_4197_1E835277D5D0, this.PlayList_EAD0AF66_AABD_9C96_41D1_C8A469DB53CC, '95%', '95%', true, true) }"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.75,
          "image": "this.AnimatedImageResource_22A52E80_0BB6_1548_4193_2A208E4A9210",
          "pitch": 6.4,
          "yaw": -123.61,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2C18FAF6_0A7E_12C8_41A0_F36800AA67B9",
      "maps": [
        {
          "hfov": 5.75,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -123.61,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_11_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 6.4
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 42.51,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_13_0.png",
                "class": "ImageResourceLevel",
                "width": 1474,
                "height": 1346
              }
            ]
          },
          "pitch": -1.42,
          "yaw": 91.42
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Glasss Cabinet"
        }
      ],
      "id": "overlay_9412734D_A4E4_7B2D_41E4_4E91F7DCC7A6",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 42.51,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 91.42,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_13_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 182
              }
            ]
          },
          "pitch": -1.42
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Tata Tertib Praktikum",
          "click": "this.showPopupPanoramaOverlay(this.popup_96436CDC_A4FC_4D33_41D3_6AA4C8FDB78D, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9928FD96_A4EC_4F3C_41D8_A87FFA5E1898, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 02"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.19,
          "image": "this.AnimatedImageResource_9957AD72_A4EC_4FF7_4193_CEF7964EE980",
          "pitch": 6.9,
          "yaw": 153.29,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_913077D6_A4FC_3B3F_41D9_47BDF220589A",
      "maps": [
        {
          "hfov": 5.19,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 153.29,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_14_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 6.9
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 32.03,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_15_0.png",
                "class": "ImageResourceLevel",
                "width": 1073,
                "height": 252
              }
            ]
          },
          "pitch": -9.44,
          "yaw": -40.67,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "mapColor": "#FF0000",
          "class": "HotspotPanoramaOverlayArea"
        }
      ],
      "id": "overlay_9D6763A7_A4DC_3B1D_41D5_F267F90A35B2",
      "data": {
        "label": "Pintu Keluar"
      },
      "maps": [
        {
          "hfov": 32.03,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -40.67,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_15_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 68,
                "height": 16
              }
            ]
          },
          "pitch": -9.44
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 32.19,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_16_0.png",
                "class": "ImageResourceLevel",
                "width": 1073,
                "height": 252
              }
            ]
          },
          "pitch": -7.57,
          "yaw": 139.96,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "mapColor": "#FF0000",
          "class": "HotspotPanoramaOverlayArea"
        }
      ],
      "id": "overlay_9DEFBDB7_A4DC_4F7D_41D2_CCDCF47AE89B",
      "data": {
        "label": "Pintu Keluar"
      },
      "maps": [
        {
          "hfov": 32.19,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 139.96,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_16_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 68,
                "height": 16
              }
            ]
          },
          "pitch": -7.57
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E, this.camera_EBBC7774_AACC_EC89_41CE_BD41E94506F0); this.mainPlayList.set('selectedIndex', 1)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.39,
          "image": "this.AnimatedImageResource_ED47A5BC_AACC_AFF9_41D0_1D833361D90B",
          "pitch": -21.06,
          "yaw": 26.82,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E857C3BE_AAB4_ABF6_41E0_FCEC3D51923B",
      "maps": [
        {
          "hfov": 19.39,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 26.82,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_17_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -21.06
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 14)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.92,
          "image": "this.AnimatedImageResource_ED47F5BC_AACC_AFF9_41E1_E85AB7B18862",
          "pitch": -16.53,
          "yaw": 56.29,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EA5825A7_AAB4_EF97_41CB_E007F8950894",
      "maps": [
        {
          "hfov": 19.92,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 56.29,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_18_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -16.53
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 5)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.23,
          "image": "this.AnimatedImageResource_ED4705BD_AACC_AFFB_41E3_33C4227812BD",
          "pitch": -13.13,
          "yaw": 80.84,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E8DD0176_AAB4_A489_41D9_C76996F0AB32",
      "maps": [
        {
          "hfov": 20.23,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 80.84,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_19_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -13.13
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C, this.camera_EBA7D782_AACC_EB89_41BC_CFE03E35FC14); this.mainPlayList.set('selectedIndex', 10)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.97,
          "image": "this.AnimatedImageResource_ED48A5BE_AACC_AFF9_41E0_F38C365351C4",
          "pitch": -24.08,
          "yaw": 135.24,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E82D1EB9_AAB5_BDFA_41CE_195AC901DB13",
      "maps": [
        {
          "hfov": 18.97,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 135.24,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_20_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -24.08
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2, this.camera_EBAE078F_AACC_EB96_41CB_47ADCF48CE30); this.mainPlayList.set('selectedIndex', 11)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.34,
          "image": "this.AnimatedImageResource_ED48F5BE_AACC_AFF6_41B8_0B19E23C3908",
          "pitch": -21.44,
          "yaw": -104.64,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EA1F6ACF_AAB4_E596_41DF_4CDB04005FF0",
      "maps": [
        {
          "hfov": 19.34,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -104.64,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_21_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -21.44
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 8)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.84,
          "image": "this.AnimatedImageResource_ED4815BF_AACC_AFF7_419D_3D296503FFED",
          "pitch": -17.28,
          "yaw": -147.32,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E8510DB2_AAB7_7F8E_41D8_00CD603F80DF",
      "maps": [
        {
          "hfov": 19.84,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -147.32,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_22_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -17.28
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 6)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.2,
          "image": "this.AnimatedImageResource_ED4845BF_AACC_AFF7_41D6_E4101F499330",
          "pitch": -13.5,
          "yaw": 176.41,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_97C9222D_AAB7_A49B_41DC_259D2FD52393",
      "maps": [
        {
          "hfov": 20.2,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 176.41,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_23_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -13.5
        }
      ]
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uidEE67D518_AACC_ECBA_41D8_3946152F0640",
      "id": "viewer_uidEE67D518_AACC_ECBA_41D8_3946152F0640VideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 87.37,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0_HS_2_0.png",
                "class": "ImageResourceLevel",
                "width": 2048,
                "height": 1114
              }
            ]
          },
          "pitch": -1.26,
          "yaw": 173.58
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Glass Cabinnet"
        }
      ],
      "id": "overlay_946FB132_A47C_F777_41DD_7C74574FA205",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 87.37,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 173.58,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0_HS_2_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 108
              }
            ]
          },
          "pitch": -1.26
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E, this.camera_EBB46766_AACC_EC89_41E3_9569B0221A30); this.mainPlayList.set('selectedIndex', 1)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.44,
          "image": "this.AnimatedImageResource_E25DF6FE_AADB_AD79_41D6_E51169F37E02",
          "pitch": -37.68,
          "yaw": 7.74,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E9ED7CB8_AAD4_BDF9_41E4_75202DD9A625",
      "maps": [
        {
          "hfov": 16.44,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 7.74,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -37.68
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E181F5E_05AE_0A05_416D_04530F9BD830, this.camera_EB8C2758_AACC_ECBA_41E4_BEA6B01D9F6B); this.mainPlayList.set('selectedIndex', 5)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.24,
          "image": "this.AnimatedImageResource_E25D96FE_AADB_AD79_41E2_7BD42962DB4F",
          "pitch": -33.9,
          "yaw": -179.62,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EBFD0BD8_AAD4_9BB9_41DC_466393839F4E",
      "maps": [
        {
          "hfov": 17.24,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -179.62,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -33.9
        }
      ]
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uidEE630516_AACC_ECB6_41C3_3F42B8BE797D",
      "id": "viewer_uidEE630516_AACC_ECB6_41C3_3F42B8BE797DVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uidEE7FB514_AACC_EC89_41C6_AD2EA03FD353",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.11vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "playbackBarHeadHeight": 15,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "toolTipBorderRadius": 3,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "ViewerArea129713"
      }
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uidEE75B50F_AACC_EC96_41D6_18EE7F541A73",
      "id": "viewer_uidEE75B50F_AACC_EC96_41D6_18EE7F541A73VideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uidEE602517_AACC_ECB6_41E2_E0860EF83EC4",
      "id": "viewer_uidEE602517_AACC_ECB6_41E2_E0860EF83EC4VideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "transparencyActive": true,
      "propagateClick": false,
      "id": "IconButton_A7361280_BCBD_AC04_41C9_358137CF7140",
      "left": "10%",
      "paddingRight": 0,
      "paddingLeft": 0,
      "borderSize": 0,
      "width": 32,
      "horizontalAlign": "center",
      "minHeight": 0,
      "verticalAlign": "middle",
      "top": "4.75%",
      "iconURL": "skin/IconButton_A7361280_BCBD_AC04_41C9_358137CF7140.png",
      "minWidth": 0,
      "mode": "push",
      "height": 32,
      "rollOverIconURL": "skin/IconButton_A7361280_BCBD_AC04_41C9_358137CF7140_rollover.png",
      "paddingTop": 0,
      "backgroundOpacity": 0,
      "shadow": false,
      "paddingBottom": 0,
      "class": "IconButton",
      "borderRadius": 0,
      "pressedIconURL": "skin/IconButton_A7361280_BCBD_AC04_41C9_358137CF7140_pressed.png",
      "cursor": "hand",
      "data": {
        "name": "Button37510"
      }
    },
    {
      "transparencyActive": true,
      "propagateClick": false,
      "id": "IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291",
      "left": "12%",
      "paddingLeft": 0,
      "paddingRight": 0,
      "width": 32,
      "borderSize": 0,
      "minHeight": 0,
      "horizontalAlign": "center",
      "verticalAlign": "middle",
      "bottom": "27.18%",
      "minWidth": 0,
      "mode": "push",
      "height": 32,
      "iconURL": "skin/IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291.png",
      "rollOverIconURL": "skin/IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291_rollover.png",
      "paddingTop": 0,
      "backgroundOpacity": 0,
      "shadow": false,
      "paddingBottom": 0,
      "class": "IconButton",
      "borderRadius": 0,
      "pressedIconURL": "skin/IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291_pressed.png",
      "cursor": "hand",
      "data": {
        "name": "Button37499"
      }
    },
    {
      "progressBarBorderColor": "#000000",
      "data": {
        "name": "Floor Plan mini"
      },
      "progressBackgroundColorDirection": "vertical",
      "id": "MapViewer",
      "left": "0%",
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 1,
      "toolTipFontSize": "1.65vmin",
      "toolTipOpacity": 1,
      "playbackBarHeadWidth": 6,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 1,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "playbackBarBorderRadius": 0,
      "toolTipShadowColor": "#333333",
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "fade_out_fade_in",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "top": "0%",
      "playbackBarOpacity": 1,
      "bottom": "0%",
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "vrPointerColor": "#FFFFFF",
      "displayTooltipInTouchScreens": true,
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "click": "this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, true, 0, null, null, false)",
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "toolTipBorderRadius": 3,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "playbackBarHeadHeight": 15,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 0,
      "progressBackgroundColorRatios": [
        0
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Ruang Penyimpanan",
          "click": "this.startPanoramaWithCamera(this.panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F, this.camera_EBF436A3_AACC_ED8F_41D2_58B5E1600FEC); this.mainPlayList.set('selectedIndex', 13)"
        }
      ],
      "data": {
        "label": "Circle Door 02"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.25,
          "image": "this.AnimatedImageResource_241D6641_0652_7A7F_4169_CADB914F8F88",
          "pitch": -6.89,
          "yaw": -99.92,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_1ACA9111_0672_161E_4191_B70AAB9B74EA",
      "maps": [
        {
          "hfov": 20.25,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -99.92,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -6.89
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 28.17,
          "image": "this.AnimatedImageResource_2F9C422C_3EF6_BDA1_41A9_CD062ECE3A8B",
          "pitch": -8.74,
          "yaw": 136.12,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Dilarang memasuki ruangan kecuali Kepala lab dan Laboran"
        }
      ],
      "id": "overlay_301B8236_3EFF_9DA0_41BF_474C5DE464BB",
      "data": {
        "label": "Info Red 08"
      },
      "maps": [
        {
          "hfov": 28.17,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 136.12,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -8.74
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 20.16,
          "image": "this.AnimatedImageResource_2F9D822C_3EF6_BDA1_41C1_10A6B341D540",
          "pitch": -8.78,
          "yaw": 136.08,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Dilarang memasuki ruangan kecuali Kepala lab dan Laboran"
        }
      ],
      "id": "overlay_1C1C4F00_0672_0BFD_4182_000CB66CBB30",
      "data": {
        "label": "Circle Door 02"
      },
      "maps": [
        {
          "hfov": 20.16,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 136.08,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -8.78
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 63.36,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_7_0.png",
                "class": "ImageResourceLevel",
                "width": 2048,
                "height": 2043
              }
            ]
          },
          "pitch": -12.46,
          "yaw": 12.65
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Barang"
        }
      ],
      "id": "overlay_9446BA6A_A424_5517_41D2_1657F29FE489",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 63.36,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 12.65,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_7_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 199
              }
            ]
          },
          "pitch": -12.46
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 39.93,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_8_0.png",
                "class": "ImageResourceLevel",
                "width": 1053,
                "height": 2048
              }
            ]
          },
          "pitch": -10.1,
          "yaw": -31.35
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Barang"
        }
      ],
      "id": "overlay_949B097F_A424_57ED_419C_DB27587563D5",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 39.93,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -31.35,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_8_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 102,
                "height": 200
              }
            ]
          },
          "pitch": -10.1
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02, this.camera_EBFCE6C4_AACC_ED8A_41B0_1D1B85AE6CCB); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 15.8,
          "image": "this.AnimatedImageResource_E25A46F4_AADB_AD8A_41E3_42CCA59B274B",
          "pitch": -40.51,
          "yaw": 42.12,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EA59ED56_AAD7_7C89_41AB_03A92960596D",
      "maps": [
        {
          "hfov": 15.8,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 42.12,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -40.51
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F, this.camera_EBF946B2_AACC_ED8E_41AB_075A86CEBCE9); this.mainPlayList.set('selectedIndex', 13)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 13.47,
          "image": "this.AnimatedImageResource_EB46D2C7_AAD4_A596_4182_3DF02FCE8C6D",
          "pitch": -49.58,
          "yaw": -101.43,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E96E640B_AAD4_AC9E_41C6_68B10A3F96CE",
      "maps": [
        {
          "hfov": 13.47,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -101.43,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_13_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -49.58
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C, this.camera_EF40960F_AACC_EC97_41E4_410CACA1F45A); this.mainPlayList.set('selectedIndex', 9)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 15.8,
          "image": "this.AnimatedImageResource_EB4652C8_AAD4_A59A_41BF_EC6E399E9086",
          "pitch": -40.51,
          "yaw": 84.43,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EA3B3FC3_AAD4_FB8F_41CF_EDB80C73B58A",
      "maps": [
        {
          "hfov": 15.8,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 84.43,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_14_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -40.51
        }
      ]
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uidEE630516_AACC_ECB6_41C3_3F42B8BE797D",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.11vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "playbackBarHeadHeight": 15,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "toolTipBorderRadius": 3,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "ViewerArea129716"
      }
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      },
      "hfov": 131.87,
      "autoplay": true,
      "id": "overlay_2C69B084_0A76_6D48_4195_DA3D76BB802E",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_2C69B084_0A76_6D48_4195_DA3D76BB802E_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 7.83,
      "useHandCursor": true,
      "roll": 4.68,
      "yaw": -64.91,
      "rotationY": -27.48,
      "class": "VideoPanoramaOverlay",
      "rotationX": -11.1,
      "toolTip": "Klik Untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_945BF191_A4DC_3735_41D2_E88BC2762E30, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E866E04C_AABF_E49A_41C5_E6942FD0A0DE, this.video_281955BC_0A56_3E06_4197_1E835277D5D0, this.PlayList_EAD58F68_AABD_9C9A_41E0_A9054AB99D93, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 95.73,
      "distance": 50
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      },
      "hfov": 49.98,
      "autoplay": true,
      "id": "overlay_2CC5F41D_0A76_7578_4190_18D84C192258",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_2CC5F41D_0A76_7578_4190_18D84C192258_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 1.94,
      "useHandCursor": true,
      "roll": -4.89,
      "yaw": 54.36,
      "rotationY": 64.43,
      "class": "VideoPanoramaOverlay",
      "rotationX": -6.45,
      "toolTip": "Klik Untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_90BD679F_A4DB_DB2C_41E3_7C25B00DF91F, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E867404E_AABF_E499_41BE_386075492211, this.video_281955BC_0A56_3E06_4197_1E835277D5D0, this.PlayList_EAD43F69_AABD_9C9A_41E1_FA0A11F3A74B, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 37.51,
      "distance": 50
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C, this.camera_EEBDB5E6_AACC_EF96_41DD_47B0E589FBA7); this.mainPlayList.set('selectedIndex', 9)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.73,
          "image": "this.AnimatedImageResource_E24446E8_AADB_AD99_41A8_0ABABD1E6C61",
          "pitch": -18.23,
          "yaw": 106.34,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E9106772_AAD4_AC89_41B8_4C85D8F389D1",
      "maps": [
        {
          "hfov": 19.73,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 106.34,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0_HS_2_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -18.23
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A, this.camera_EEAB15F3_AACC_EF8E_41A5_263A3AA78FB9); this.mainPlayList.set('selectedIndex', 7)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.13,
          "image": "this.AnimatedImageResource_E24416E8_AADB_AD99_41E4_B7EF55B0030C",
          "pitch": -34.47,
          "yaw": -135.42,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_ED0CC2EA_AAD5_6599_4182_69DCEB221336",
      "maps": [
        {
          "hfov": 17.13,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -135.42,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -34.47
        }
      ]
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uidEE74050E_AACC_EC96_41B4_526DA8CC77FF",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.11vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "playbackBarHeadHeight": 15,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "toolTipBorderRadius": 3,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "ViewerArea129709"
      }
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Tata Tertib Praktikum",
          "click": "this.showPopupPanoramaOverlay(this.popup_2A8DE82E_0AB2_1605_4197_CDF36D85FF90, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2A8D382E_0AB2_1605_4189_2D65425A5D2E, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.67,
          "image": "this.AnimatedImageResource_2C10E1DC_0A72_2EF8_4191_CA31EF8BB1BA",
          "pitch": 3.63,
          "yaw": 78.26,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2B51C8B3_0AB2_1603_41A0_813B88E9F8BA",
      "maps": [
        {
          "hfov": 7.67,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 78.26,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_2_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 3.63
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Peraturan Setelah Penggunaan Laboratorium",
          "click": "this.showPopupPanoramaOverlay(this.popup_2B708838_0AB2_160D_4191_CEF19418F8C8, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2B70E838_0AB2_160D_417C_0E7B87E521CB, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.67,
          "image": "this.AnimatedImageResource_995C4D74_A4EC_4FF3_41DC_752428103AFF",
          "pitch": 3.38,
          "yaw": 84.45,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2B5138B3_0AB2_1603_419B_ECFFF720A5F5",
      "maps": [
        {
          "hfov": 7.67,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 84.45,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 3.38
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Tata Tertib Praktikum",
          "click": "this.showPopupPanoramaOverlay(this.popup_178E9809_0AB3_F60F_4198_84C0F5DE4EB4, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_178EA809_0AB3_F60F_4186_C50C59D04D1A, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 01"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.54,
          "image": "this.AnimatedImageResource_2C1141DC_0A72_2EF8_4159_BFB11A2B7BB4",
          "pitch": 11.2,
          "yaw": 172.7,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2860A833_0AB3_F603_418B_F2C699762562",
      "maps": [
        {
          "hfov": 7.54,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 172.7,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 11.2
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_281955BC_0A56_3E06_4197_1E835277D5D0.mp4"
      },
      "hfov": 19.78,
      "autoplay": true,
      "id": "overlay_2BDCAB38_0A72_33B9_418B_B30945F7BB07",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_2BDCAB38_0A72_33B9_418B_B30945F7BB07_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 0.41,
      "useHandCursor": true,
      "roll": -0.46,
      "yaw": 18.75,
      "rotationY": 23.1,
      "class": "VideoPanoramaOverlay",
      "rotationX": -0.63,
      "toolTip": "Klik Untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_8A96B291_A4E5_F535_418E_908CE5A7862C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E861D049_AABF_E49A_41DD_3C21C1AFF596, this.video_281955BC_0A56_3E06_4197_1E835277D5D0, this.PlayList_EAD6FF66_AABD_9C96_41E2_E8EA8ABA1B38, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 14.36,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 5.06,
      "id": "popup_38103FAF_0BB2_1358_4192_CCE1046739EF",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 6.67,
      "yaw": 29.87,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A, this.camera_EEEA85A5_AACC_EF8A_41A2_9BA22A9C4652); this.mainPlayList.set('selectedIndex', 7)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.02,
          "image": "this.AnimatedImageResource_E24FA6DD_AADB_ADBB_41DF_A223893B6CD8",
          "pitch": -23.7,
          "yaw": -33.81,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E9E3AC5D_AACC_BCBA_41B9_7D24E1D2644B",
      "maps": [
        {
          "hfov": 19.02,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -33.81,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -23.7
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C, this.camera_EE9185B2_AACC_EF89_41CE_F89B27D6DF01); this.mainPlayList.set('selectedIndex', 9)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.62,
          "image": "this.AnimatedImageResource_E24046E2_AADB_AD8E_41E4_18EA7D1F6352",
          "pitch": -26.35,
          "yaw": 60.44,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_ED5D39F1_AACC_A78B_41E2_99AF770B7EDA",
      "maps": [
        {
          "hfov": 18.62,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 60.44,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -26.35
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 18.17,
          "image": "this.AnimatedImageResource_E240E6E2_AADB_AD8E_41E1_008540F6D848",
          "pitch": -28.99,
          "yaw": 150.54,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "mapColor": "#FF0000",
          "class": "HotspotPanoramaOverlayArea",
          "click": "this.startPanoramaWithCamera(this.panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C, this.camera_EBA7D782_AACC_EB89_41BC_CFE03E35FC14); this.mainPlayList.set('selectedIndex', 10)"
        }
      ],
      "id": "overlay_E0BA6D7C_AACB_9F79_41DA_44F90939181E",
      "data": {
        "label": "Arrow 01c"
      },
      "maps": [
        {
          "hfov": 18.17,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 150.54,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -28.99
        }
      ]
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uidEE74050E_AACC_EC96_41B4_526DA8CC77FF",
      "id": "viewer_uidEE74050E_AACC_EC96_41B4_526DA8CC77FFVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uidEE78B511_AACC_EC8B_41D9_87425C77F79A",
      "id": "viewer_uidEE78B511_AACC_EC8B_41D9_87425C77F79AVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uidEE75B50F_AACC_EC96_41D6_18EE7F541A73",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.11vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "playbackBarHeadHeight": 15,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "toolTipBorderRadius": 3,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "ViewerArea129710"
      }
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uidEE602517_AACC_ECB6_41E2_E0860EF83EC4",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.11vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "playbackBarHeadHeight": 15,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "toolTipBorderRadius": 3,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "ViewerArea129717"
      }
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uidEE67D518_AACC_ECBA_41D8_3946152F0640",
      "progressBarBackgroundColorRatios": [
        0
      ],
      "playbackBarBottom": 0,
      "paddingLeft": 0,
      "playbackBarHeadOpacity": 1,
      "progressBorderColor": "#003366",
      "toolTipBorderColor": "#767676",
      "toolTipShadowSpread": 0,
      "playbackBarProgressBackgroundColorDirection": "vertical",
      "progressBarBackgroundColor": [
        "#3399FF"
      ],
      "progressBackgroundColor": [
        "#FFFFFF"
      ],
      "width": "100%",
      "minHeight": 50,
      "toolTipFontSize": "1.11vmin",
      "toolTipOpacity": 1,
      "toolTipShadowBlurRadius": 3,
      "playbackBarBackgroundColorDirection": "vertical",
      "toolTipTextShadowColor": "#000000",
      "playbackBarBackgroundColor": [
        "#FFFFFF"
      ],
      "playbackBarHeadWidth": 6,
      "playbackBarRight": 0,
      "playbackBarHeight": 10,
      "minWidth": 100,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "playbackBarProgressBorderSize": 0,
      "toolTipTextShadowBlurRadius": 3,
      "playbackBarProgressBorderRadius": 0,
      "progressBarBorderRadius": 0,
      "progressBarBorderSize": 0,
      "toolTipShadowColor": "#333333",
      "height": "100%",
      "playbackBarBorderRadius": 0,
      "playbackBarHeadBorderRadius": 0,
      "transitionMode": "blending",
      "class": "ViewerArea",
      "playbackBarHeadBorderColor": "#000000",
      "shadow": false,
      "toolTipShadowOpacity": 1,
      "progressLeft": 0,
      "playbackBarHeadShadowHorizontalLength": 0,
      "playbackBarProgressBorderColor": "#000000",
      "playbackBarHeadBorderSize": 0,
      "playbackBarProgressOpacity": 1,
      "toolTipFontStyle": "normal",
      "playbackBarBorderSize": 0,
      "toolTipShadowHorizontalLength": 0,
      "propagateClick": false,
      "playbackBarBackgroundOpacity": 1,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "vrPointerSelectionColor": "#FF6600",
      "toolTipTextShadowOpacity": 0,
      "playbackBarHeadBackgroundColor": [
        "#111111",
        "#666666"
      ],
      "playbackBarHeadShadowVerticalLength": 0,
      "playbackBarHeadShadowColor": "#000000",
      "vrPointerSelectionTime": 2000,
      "paddingRight": 0,
      "firstTransitionDuration": 0,
      "progressOpacity": 1,
      "progressRight": 0,
      "borderSize": 0,
      "progressBarBackgroundColorDirection": "vertical",
      "playbackBarHeadShadow": true,
      "progressBottom": 2,
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "progressHeight": 10,
      "playbackBarHeadBackgroundColorDirection": "vertical",
      "progressBackgroundOpacity": 1,
      "playbackBarProgressBackgroundColor": [
        "#3399FF"
      ],
      "playbackBarOpacity": 1,
      "displayTooltipInTouchScreens": true,
      "vrPointerColor": "#FFFFFF",
      "progressBarOpacity": 1,
      "playbackBarHeadShadowOpacity": 0.7,
      "playbackBarBorderColor": "#FFFFFF",
      "progressBorderSize": 0,
      "toolTipBorderSize": 1,
      "toolTipPaddingTop": 4,
      "toolTipPaddingLeft": 6,
      "progressBorderRadius": 0,
      "paddingTop": 0,
      "toolTipDisplayTime": 600,
      "playbackBarProgressBackgroundColorRatios": [
        0
      ],
      "playbackBarLeft": 0,
      "paddingBottom": 0,
      "toolTipPaddingRight": 6,
      "playbackBarHeadHeight": 15,
      "borderRadius": 0,
      "playbackBarHeadShadowBlurRadius": 3,
      "progressBackgroundColorRatios": [
        0
      ],
      "toolTipBorderRadius": 3,
      "playbackBarHeadBackgroundColorRatios": [
        0,
        1
      ],
      "transitionDuration": 500,
      "data": {
        "name": "ViewerArea129719"
      }
    },
    {
      "propagateClick": true,
      "scrollBarWidth": 10,
      "id": "Container_B1571269_BF46_B846_41D9_B94D861499DF",
      "scrollBarColor": "#000000",
      "paddingRight": 0,
      "right": "0%",
      "paddingLeft": 0,
      "children": [
        "this.IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8"
      ],
      "borderSize": 0,
      "scrollBarVisible": "rollOver",
      "width": 110,
      "minHeight": 1,
      "horizontalAlign": "center",
      "verticalAlign": "middle",
      "scrollBarOpacity": 0.5,
      "scrollBarMargin": 2,
      "contentOpaque": false,
      "minWidth": 1,
      "height": 110,
      "top": "0%",
      "gap": 10,
      "layout": "horizontal",
      "paddingTop": 0,
      "backgroundOpacity": 0,
      "shadow": false,
      "paddingBottom": 0,
      "class": "Container",
      "borderRadius": 0,
      "overflow": "visible",
      "data": {
        "name": "button menu sup"
      }
    },
    {
      "propagateClick": true,
      "scrollBarWidth": 10,
      "id": "Container_B1573269_BF46_B846_41AD_E3E55F50C328",
      "paddingLeft": 0,
      "scrollBarColor": "#000000",
      "paddingRight": 0,
      "right": "0%",
      "children": [
        "this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7",
        "this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250",
        "this.IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781",
        "this.IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0",
        "this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081",
        "this.IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6"
      ],
      "borderSize": 0,
      "scrollBarVisible": "rollOver",
      "minHeight": 1,
      "horizontalAlign": "center",
      "verticalAlign": "top",
      "scrollBarOpacity": 0.5,
      "scrollBarMargin": 2,
      "contentOpaque": false,
      "minWidth": 1,
      "height": "59.417%",
      "width": "91.265%",
      "top": "14.96%",
      "gap": 3,
      "layout": "vertical",
      "paddingTop": 0,
      "shadow": false,
      "paddingBottom": 0,
      "backgroundOpacity": 0,
      "borderRadius": 0,
      "visible": false,
      "class": "Container",
      "data": {
        "name": "-button set"
      },
      "overflow": "scroll"
    },
    {
      "maxHeight": 222,
      "propagateClick": false,
      "id": "Image_9897FDC6_A425_CF1F_41E4_38D5870C765B",
      "left": "0%",
      "paddingRight": 0,
      "paddingLeft": 0,
      "borderSize": 0,
      "url": "skin/Image_9897FDC6_A425_CF1F_41E4_38D5870C765B.png",
      "minHeight": 1,
      "horizontalAlign": "left",
      "verticalAlign": "top",
      "width": "100%",
      "minWidth": 1,
      "height": "58.392%",
      "top": "0%",
      "paddingTop": 0,
      "shadow": false,
      "paddingBottom": 0,
      "backgroundOpacity": 0,
      "scaleMode": "fit_inside",
      "borderRadius": 0,
      "class": "Image",
      "data": {
        "name": "Image24956"
      },
      "maxWidth": 2000
    },
    {
      "backgroundColorRatios": [
        0,
        1
      ],
      "scrollBarWidth": 10,
      "id": "Container_B0DBDFD9_BF4E_E879_41D9_B737EF8BC042",
      "left": "0%",
      "propagateClick": false,
      "paddingLeft": 0,
      "scrollBarColor": "#000000",
      "paddingRight": 0,
      "width": 190,
      "children": [
        "this.MapViewer"
      ],
      "borderSize": 0,
      "scrollBarVisible": "rollOver",
      "minHeight": 1,
      "backgroundColorDirection": "vertical",
      "horizontalAlign": "left",
      "verticalAlign": "top",
      "scrollBarMargin": 2,
      "contentOpaque": false,
      "height": 190,
      "minWidth": 1,
      "scrollBarOpacity": 0.5,
      "top": "0%",
      "gap": 10,
      "layout": "absolute",
      "backgroundColor": [
        "#FFFFFF",
        "#FFFFFF"
      ],
      "paddingTop": 0,
      "shadow": false,
      "paddingBottom": 0,
      "backgroundOpacity": 0.24,
      "borderRadius": 0,
      "class": "Container",
      "data": {
        "name": "minimap"
      },
      "overflow": "scroll"
    },
    {
      "propagateClick": false,
      "scrollBarWidth": 10,
      "id": "Container_0458057F_17F5_EF63_41B5_2CE2DF0373FD",
      "paddingLeft": 0,
      "scrollBarColor": "#000000",
      "paddingRight": 0,
      "right": "0%",
      "children": [
        "this.IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291",
        "this.IconButton_A7361280_BCBD_AC04_41C9_358137CF7140"
      ],
      "borderSize": 0,
      "scrollBarVisible": "rollOver",
      "minHeight": 1,
      "horizontalAlign": "left",
      "verticalAlign": "top",
      "scrollBarOpacity": 0.5,
      "scrollBarMargin": 2,
      "contentOpaque": false,
      "minWidth": 1,
      "height": "54.211%",
      "width": "20.833%",
      "top": "0%",
      "gap": 10,
      "layout": "absolute",
      "paddingTop": 0,
      "shadow": false,
      "paddingBottom": 0,
      "backgroundOpacity": 0,
      "borderRadius": 0,
      "class": "Container",
      "data": {
        "name": "zoom in out"
      },
      "overflow": "scroll"
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_22A80E95_0BB6_1548_4199_A4DDD69148DF",
      "levels": [
        {
          "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0_HS_3_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED4A65C1_AACC_AF8A_41C8_F0A883D7A3D9",
      "levels": [
        {
          "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0_HS_7_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E8F8EA0F_AADD_E496_41C7_80A6204B4A64",
      "levels": [
        {
          "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0_HS_8_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E8F88A0F_AADD_E496_41AA_99CF88DA4257",
      "levels": [
        {
          "url": "media/panorama_0E45F682_05AE_1AFD_4190_5C488C79FC6E_0_HS_9_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E25CE6FD_AADB_AD7B_41C4_B2E7D62B16FA",
      "levels": [
        {
          "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0_HS_5_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E25C86FD_AADB_AD7B_41D6_11FF155C8567",
      "levels": [
        {
          "url": "media/panorama_0EF88D41_05AE_0E7F_416D_363CEEF8DD3F_0_HS_6_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E25BB6FB_AADB_AD7E_41DA_EB935A991CE3",
      "levels": [
        {
          "url": "media/panorama_0E78D269_05AE_3A0F_4194_073D5A49809B_0_HS_4_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED4C15C4_AACC_AF8A_4191_B7D3C442BCAA",
      "levels": [
        {
          "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0_HS_4_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED4DA5C4_AACC_AF8A_41D8_4C2DA9FFA013",
      "levels": [
        {
          "url": "media/panorama_0E0E929A_05AE_FA02_4192_9B4DC98898E6_0_HS_5_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_995A8D77_A4EC_4FFD_41E3_E576C3EB6A7D",
      "levels": [
        {
          "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_4_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_2C1C11DC_0A72_2EF8_4197_0AC6FF319FDC",
      "levels": [
        {
          "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_5_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_2F99622B_3EF6_BDA7_41CE_C5AC0D2C05CC",
      "levels": [
        {
          "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_7_0.png",
          "class": "ImageResourceLevel",
          "width": 800,
          "height": 1200
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_2F9ED22B_3EF6_BDA7_41BF_44E9E83EE1E5",
      "levels": [
        {
          "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_8_0.png",
          "class": "ImageResourceLevel",
          "width": 600,
          "height": 900
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E24776F0_AADB_AD89_41E2_F3EB565632DA",
      "levels": [
        {
          "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_12_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E24786F1_AADB_AD8A_41E1_CC97C517F027",
      "levels": [
        {
          "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_15_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E8F1CA20_AADD_E48A_41E1_F69F36866E71",
      "levels": [
        {
          "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_16_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED99CE87_AAD4_BD96_41B1_6DA8FC8EBB89",
      "levels": [
        {
          "url": "media/panorama_0E17F74E_05AE_1A05_4191_3BD7E7DC3B3C_0_HS_17_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_2C1D61DE_0A72_2EF8_4191_B206FBBFEBD2",
      "levels": [
        {
          "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_3_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_2C1DA1DE_0A72_2EF8_4197_E1C9D347BC58",
      "levels": [
        {
          "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_4_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_95A090DE_A42C_552C_41D0_D6734D042A84",
      "levels": [
        {
          "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_8_0.png",
          "class": "ImageResourceLevel",
          "width": 800,
          "height": 1200
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_95A0A0DE_A42C_552C_41E1_7A73AF06E3F1",
      "levels": [
        {
          "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_9_0.png",
          "class": "ImageResourceLevel",
          "width": 800,
          "height": 1200
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E25846F2_AADB_AD8E_419D_2E6C4D735FB4",
      "levels": [
        {
          "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_10_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E258F6F3_AADB_AD8E_41D6_89EFF7126D09",
      "levels": [
        {
          "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_11_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E25896F3_AADB_AD8E_41DB_F7270E46C596",
      "levels": [
        {
          "url": "media/panorama_0E3A61E8_05AE_760E_4150_28C072AD2F2C_0_HS_12_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E24246E5_AADB_AD8A_41CF_5BBC36D445FD",
      "levels": [
        {
          "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0_HS_2_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E242F6E5_AADB_AD8A_41DD_DBE4B1EE1038",
      "levels": [
        {
          "url": "media/panorama_0EDA817F_05AE_3603_4193_73EA59B62F1A_0_HS_3_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E24D06DA_AADB_ADBE_41CD_66EBC5FEE9F6",
      "levels": [
        {
          "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_3_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E24DC6DA_AADB_ADBE_41C2_0B2B2CAB474C",
      "levels": [
        {
          "url": "media/panorama_0E181F5E_05AE_0A05_416D_04530F9BD830_0_HS_4_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED4BE5C1_AACC_AF8A_41C1_6EC390382CD1",
      "levels": [
        {
          "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0_HS_3_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED4B25C2_AACC_AF8E_41D7_6BE322B98431",
      "levels": [
        {
          "url": "media/panorama_0E69FC8F_05AE_0E03_4183_1FE0461FD4C7_0_HS_4_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_22AF3EA3_0BB6_1548_419C_227AECB9973B",
      "levels": [
        {
          "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_2_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED4E15C6_AACC_AF96_41A1_407CC742D054",
      "levels": [
        {
          "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_5_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_EA7D6600_AACC_AC8B_41CD_A5105603DF66",
      "levels": [
        {
          "url": "media/panorama_0E68B89A_05AE_F60D_4170_EF87A46885AA_0_HS_6_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_9A4787BD_A424_3B6D_41D5_0260E8FB4D28",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_7_0.png",
          "class": "ImageResourceLevel",
          "width": 800,
          "height": 1200
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_9A4767BE_A424_3B6F_41BA_03DE79710539",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_8_0.png",
          "class": "ImageResourceLevel",
          "width": 800,
          "height": 1200
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_2CCC10EF_0AF2_7603_4192_7849C8C1669C",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_9_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_2CCCC0EF_0AF2_7603_4167_B0AFAE2D7810",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_10_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_22A52E80_0BB6_1548_4193_2A208E4A9210",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_11_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_9957AD72_A4EC_4FF7_4193_CEF7964EE980",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_14_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED47A5BC_AACC_AFF9_41D0_1D833361D90B",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_17_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED47F5BC_AACC_AFF9_41E1_E85AB7B18862",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_18_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED4705BD_AACC_AFFB_41E3_33C4227812BD",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_19_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED48A5BE_AACC_AFF9_41E0_F38C365351C4",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_20_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED48F5BE_AACC_AFF6_41B8_0B19E23C3908",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_21_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED4815BF_AACC_AFF7_419D_3D296503FFED",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_22_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_ED4845BF_AACC_AFF7_41D6_E4101F499330",
      "levels": [
        {
          "url": "media/panorama_0E624C7F_05AE_0E03_4193_0DA91B53BD02_0_HS_23_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E25DF6FE_AADB_AD79_41D6_E51169F37E02",
      "levels": [
        {
          "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0_HS_3_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E25D96FE_AADB_AD79_41E2_7BD42962DB4F",
      "levels": [
        {
          "url": "media/panorama_0E3757C5_05AE_1A07_4191_3551B2E75546_0_HS_4_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_241D6641_0652_7A7F_4169_CADB914F8F88",
      "levels": [
        {
          "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_3_0.png",
          "class": "ImageResourceLevel",
          "width": 800,
          "height": 1200
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_2F9C422C_3EF6_BDA1_41A9_CD062ECE3A8B",
      "levels": [
        {
          "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_6_0.png",
          "class": "ImageResourceLevel",
          "width": 600,
          "height": 900
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_2F9D822C_3EF6_BDA1_41C1_10A6B341D540",
      "levels": [
        {
          "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_4_0.png",
          "class": "ImageResourceLevel",
          "width": 800,
          "height": 1200
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E25A46F4_AADB_AD8A_41E3_42CCA59B274B",
      "levels": [
        {
          "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_9_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_EB46D2C7_AAD4_A596_4182_3DF02FCE8C6D",
      "levels": [
        {
          "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_13_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_EB4652C8_AAD4_A59A_41BF_EC6E399E9086",
      "levels": [
        {
          "url": "media/panorama_0E1EE727_05AE_1A02_4183_7BDE5E01D8E2_0_HS_14_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E24446E8_AADB_AD99_41A8_0ABABD1E6C61",
      "levels": [
        {
          "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0_HS_2_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E24416E8_AADB_AD99_41E4_B7EF55B0030C",
      "levels": [
        {
          "url": "media/panorama_0E049CD3_05AE_0E03_418D_C53DE18D2134_0_HS_3_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_2C10E1DC_0A72_2EF8_4191_CA31EF8BB1BA",
      "levels": [
        {
          "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_2_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_995C4D74_A4EC_4FF3_41DC_752428103AFF",
      "levels": [
        {
          "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_3_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 22,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_2C1141DC_0A72_2EF8_4159_BFB11A2B7BB4",
      "levels": [
        {
          "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_4_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E24FA6DD_AADB_ADBB_41DF_A223893B6CD8",
      "levels": [
        {
          "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_7_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E24046E2_AADB_AD8E_41E4_18EA7D1F6352",
      "levels": [
        {
          "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_8_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "class": "AnimatedImageResource",
      "rowCount": 6,
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_E240E6E2_AADB_AD8E_41E1_008540F6D848",
      "levels": [
        {
          "url": "media/panorama_0E0A9B81_05AE_0AFF_4174_2DCF557F5040_0_HS_9_0.png",
          "class": "ImageResourceLevel",
          "width": 400,
          "height": 360
        }
      ]
    },
    {
      "transparencyActive": true,
      "maxHeight": 60,
      "toolTipFontFamily": "Arial",
      "propagateClick": true,
      "id": "IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8",
      "toolTipShadowSpread": 0,
      "paddingRight": 0,
      "toolTipBorderColor": "#767676",
      "paddingLeft": 0,
      "borderSize": 0,
      "width": 60,
      "minHeight": 1,
      "toolTip": "Pilihan",
      "horizontalAlign": "center",
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "toolTipShadowBlurRadius": 3,
      "toolTipFontSize": "1.65vmin",
      "verticalAlign": "middle",
      "toolTipTextShadowColor": "#000000",
      "toolTipOpacity": 1,
      "iconURL": "skin/IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8.png",
      "pressedRollOverIconURL": "skin/IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8_pressed_rollover.png",
      "minWidth": 1,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "mode": "toggle",
      "toolTipTextShadowBlurRadius": 3,
      "click": "if(!this.Container_B1573269_BF46_B846_41AD_E3E55F50C328.get('visible')){ this.setComponentVisibility(this.Container_B1573269_BF46_B846_41AD_E3E55F50C328, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_B1573269_BF46_B846_41AD_E3E55F50C328, false, 0, null, null, false) }",
      "height": 60,
      "toolTipBorderSize": 1,
      "toolTipShadowColor": "#333333",
      "paddingTop": 0,
      "toolTipPaddingLeft": 6,
      "backgroundOpacity": 0,
      "toolTipDisplayTime": 600,
      "shadow": false,
      "paddingBottom": 0,
      "class": "IconButton",
      "toolTipPaddingTop": 4,
      "toolTipBorderRadius": 3,
      "borderRadius": 0,
      "toolTipShadowOpacity": 1,
      "pressedIconURL": "skin/IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8_pressed.png",
      "toolTipShadowHorizontalLength": 0,
      "toolTipPaddingRight": 6,
      "toolTipFontStyle": "normal",
      "cursor": "hand",
      "toolTipShadowVerticalLength": 0,
      "maxWidth": 60,
      "data": {
        "name": "image button menu"
      },
      "toolTipTextShadowOpacity": 0
    },
    {
      "transparencyActive": true,
      "toolTipFontFamily": "Arial",
      "propagateClick": false,
      "id": "IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0",
      "toolTipShadowSpread": 0,
      "paddingRight": 0,
      "toolTipBorderColor": "#767676",
      "paddingLeft": 0,
      "borderSize": 0,
      "width": 45.5,
      "minHeight": 0,
      "toolTip": "Ruangan",
      "click": "document.getElementById('roomModal').style.display='flex'",
      "horizontalAlign": "center",
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "toolTipShadowBlurRadius": 3,
      "toolTipFontSize": "1.65vmin",
      "verticalAlign": "middle",
      "toolTipTextShadowColor": "#000000",
      "toolTipOpacity": 1,
      "iconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0.png",
      "pressedRollOverIconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0_pressed_rollover.png",
      "minWidth": 0,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "mode": "toggle",
      "toolTipTextShadowBlurRadius": 3,
      "height": 51.5,
      "toolTipBorderSize": 1,
      "toolTipShadowColor": "#333333",
      "rollOverIconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0_rollover.png",
      "paddingTop": 0,
      "toolTipPaddingLeft": 6,
      "backgroundOpacity": 0,
      "toolTipDisplayTime": 600,
      "shadow": false,
      "paddingBottom": 0,
      "class": "IconButton",
      "toolTipPaddingTop": 4,
      "toolTipBorderRadius": 3,
      "borderRadius": 0,
      "toolTipShadowOpacity": 1,
      "pressedIconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0_pressed.png",
      "toolTipShadowHorizontalLength": 0,
      "toolTipPaddingRight": 6,
      "toolTipFontStyle": "normal",
      "cursor": "hand",
      "toolTipShadowVerticalLength": 0,
      "data": {
        "name": "Ruangan"
      },
      "toolTipTextShadowOpacity": 0
    },
    {
      "transparencyActive": false,
      "toolTipFontFamily": "Arial",
      "propagateClick": true,
      "id": "IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6",
      "toolTipShadowSpread": 0,
      "paddingRight": 0,
      "toolTipBorderColor": "#767676",
      "paddingLeft": 0,
      "borderSize": 0,
      "width": 45.5,
      "minHeight": 0,
      "toolTip": "Panduan",
      "horizontalAlign": "center",
      "toolTipBackgroundColor": "#F6F6F6",
      "toolTipFontColor": "#606060",
      "toolTipShadowBlurRadius": 3,
      "toolTipFontSize": "1.65vmin",
      "verticalAlign": "middle",
      "toolTipTextShadowColor": "#000000",
      "toolTipOpacity": 1,
      "iconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6.png",
      "pressedRollOverIconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6_pressed_rollover.png",
      "minWidth": 0,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "mode": "push",
      "toolTipTextShadowBlurRadius": 3,
      "click": "this.showPopupImage(this.ImageResource_95F4D308_A424_7B14_41C4_C0CE7476743A, null, '90%', '90%', this.FadeInEffect_95F42308_A424_7B14_41C9_4D184F418D24, this.FadeOutEffect_95F43308_A424_7B14_41D3_4CD60F6C36B2, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
      "height": 51.5,
      "toolTipBorderSize": 1,
      "toolTipShadowColor": "#333333",
      "rollOverIconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6_rollover.png",
      "paddingTop": 0,
      "toolTipPaddingLeft": 6,
      "backgroundOpacity": 0,
      "toolTipDisplayTime": 600,
      "shadow": false,
      "paddingBottom": 0,
      "class": "IconButton",
      "toolTipPaddingTop": 4,
      "toolTipBorderRadius": 3,
      "borderRadius": 0,
      "toolTipShadowOpacity": 1,
      "pressedIconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6_pressed.png",
      "toolTipShadowHorizontalLength": 0,
      "toolTipPaddingRight": 6,
      "toolTipFontStyle": "normal",
      "cursor": "hand",
      "toolTipShadowVerticalLength": 0,
      "data": {
        "name": "Information"
      },
      "toolTipTextShadowOpacity": 0
    }],
    "width": "100%"
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

