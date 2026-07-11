(function () {
  var script = {
    "mouseWheelEnabled": true,
    "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7,this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250], 'cardboardAvailable'); this.playList_95DF9C55_AA7C_BC8B_4189_09544FED9C70.set('selectedIndex', 0); this.playList_95DFAC54_AA7C_BC89_41E2_E87010E7F6D7.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081].forEach(function(component) { component.set('visible', false); }) }",
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
          "yaw": 90.28,
          "backwardYaw": -81.22,
          "distance": 1,
          "panorama": "this.panorama_E1E96E28_ED73_90DF_41CD_DB0322920492"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_132116_00_051",
      "id": "panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF",
      "thumbnailUrl": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": 0,
          "y": 572.56,
          "x": 184.67
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
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_273F746A_3DB2_CBD8_41C3_6047992DE35E",
        "this.overlay_20C1C29D_3D52_4F7B_41C7_866BB69D1730",
        "this.popup_272C7449_3DB2_CBDB_41C6_2D346677502A",
        "this.popup_20D7927D_3D52_4FBB_41C3_1F84812D24B6",
        "this.overlay_9500BB65_A64C_A48A_41D2_18B621699372",
        "this.overlay_95600393_A5CD_AB8E_41CC_463BA0F14486",
        "this.overlay_95601393_A5CD_AB8E_41B0_C06E7CBCF402",
        "this.overlay_922FA1F6_A5CC_E789_41DC_D195D9DDB046",
        "this.popup_955B2349_A5CD_A49B_41E0_1837B3546551",
        "this.popup_955BD34B_A5CD_A49E_41E4_0D33EE5A538D"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -132.97,
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
      "id": "camera_96BA3E22_AA7C_BC89_41E4_0F368B4FFAED"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -105.96,
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
      "id": "camera_9229BFB4_AA7C_BB8A_41E1_2D968461BA76"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 18.43,
      "autoplay": true,
      "id": "popup_94A5E251_A584_8321_41DF_E5C6DAE1BE5C",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 5.38,
      "yaw": -157.15,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A.mp4"
      }
    },
    {
      "fieldOfViewOverlayOutsideOpacity": 0,
      "label": "Minimap",
      "id": "map_F98E9261_F214_A505_41E9_1B645F7CE860",
      "minimumZoomFactor": 0.51,
      "thumbnailUrl": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_t.png",
      "width": 1143,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860.png",
            "class": "ImageResourceLevel",
            "width": 1143,
            "height": 2000
          },
          {
            "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_lq.png",
            "class": "ImageResourceLevel",
            "width": 193,
            "height": 338,
            "tags": "preload"
          }
        ]
      },
      "fieldOfViewOverlayRadiusScale": 0.14,
      "fieldOfViewOverlayOutsideColor": "#000000",
      "maximumZoomFactor": 4,
      "class": "Map",
      "fieldOfViewOverlayInsideOpacity": 0.4,
      "scaleMode": "fit_inside",
      "initialZoomFactor": 3,
      "fieldOfViewOverlayInsideColor": "#FFFFFF",
      "height": 2000,
      "overlays": [
        "this.overlay_FE6A134F_F217_EB1C_41E0_8B5403A19D7C",
        "this.overlay_FEA8A0B5_F214_650D_41D9_FA0D2AED033B",
        "this.overlay_FE583162_F214_6704_41ED_A79CD64DC58F",
        "this.overlay_FEE635CD_F215_AF1D_41D9_3C05ED32387C",
        "this.overlay_FF6A471D_F215_EB3C_41D6_548C19287526",
        "this.overlay_FC5EAC62_F214_7D04_4191_B2869E30F2FB",
        "this.overlay_FC004F8E_F214_5B1F_41D3_7155DCB8A675",
        "this.overlay_FF8DB38A_F21B_AB07_41E0_AF3453B3B4D2",
        "this.overlay_FE6BFCD2_F21C_5D04_41DE_0D84B4C8FC61",
        "this.overlay_FF26CBD3_F21C_BB05_41D6_2D3B0C0CA2B5",
        "this.overlay_FFBA26DF_F21C_ED3D_41E5_A315AC858E05",
        "this.overlay_FEB929BF_F21C_E77D_4199_CC6D4D6057E7",
        "this.overlay_FF6318F3_F21C_A505_41D0_9854C5F40596",
        "this.overlay_FE807B3D_F21C_5B7D_41E9_4EDDEDD9051E",
        "this.overlay_FF5C82C8_F21C_6503_41E3_D1273B552288",
        "this.overlay_FE8871D8_F21D_E703_41E1_A7D00DB4AA97"
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -155.26,
          "backwardYaw": 107.28,
          "distance": 1,
          "panorama": "this.panorama_E1EF4BC9_ED70_B751_41DF_471345E94441"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 113.7,
          "backwardYaw": 177.92,
          "distance": 1,
          "panorama": "this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 19.64,
          "backwardYaw": 165.17,
          "distance": 1,
          "panorama": "this.panorama_E1EE4069_ED70_B150_41DE_8D514E981C75"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260428_093051_00_106",
      "id": "panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301",
      "thumbnailUrl": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": 87.78,
          "y": 91.08,
          "x": 519
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
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_t.jpg"
        }
      ],
      "overlays": [
        "this.popup_EA12E675_FCDE_6C04_41B8_74476AEC6222",
        "this.overlay_26530317_3DB6_4D48_41CB_A04B8005AAAB",
        "this.overlay_97262363_A64C_A48E_41E3_931D09DAC89C",
        "this.overlay_966749F7_A64C_A776_41D6_E97A7BE09E75",
        "this.overlay_93B4B793_A64C_EB8F_41CE_035D919EDC34"
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 3.36,
      "id": "popup_955B2349_A5CD_A49B_41E0_1837B3546551",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_955B2349_A5CD_A49B_41E0_1837B3546551_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 10.14,
      "yaw": 135.7,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -175.09,
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
      "id": "camera_96927DF5_AA7C_BF8B_41E0_4C21145381FE"
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
      "id": "panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_camera"
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
        "yaw": -81.22,
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
      "id": "camera_968DEE0A_AA7C_BC9E_41DC_DF03D9BE6834"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
          "class": "MapPlayListItem",
          "media": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "player": "this.MapViewerMapPlayer"
        }
      ],
      "id": "playList_95D86C54_AA7C_BC89_41B7_CAA5C6DCC0AD"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.02,
      "id": "popup_886B8A06_A584_8323_41DD_FEC1D9AF4D2D",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_886B8A06_A584_8323_41DD_FEC1D9AF4D2D_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 14.06,
      "yaw": 32.17,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PlayList",
      "items": [
        "this.PanoramaPlayListItem_95DE2C56_AA7C_BC89_41D4_5AE8B5A54B2E",
        "this.PanoramaPlayListItem_95DDEC56_AA7C_BC89_41A7_E120587F9F94",
        "this.PanoramaPlayListItem_95DD4C57_AA7C_BCB6_41D8_3256637D17EF",
        "this.PanoramaPlayListItem_95DC2C57_AA7C_BCB6_41C8_C1D177DA983A",
        "this.PanoramaPlayListItem_95D3BC58_AA7C_BCBA_41DA_A66E3CE33CCC",
        "this.PanoramaPlayListItem_95D30C59_AA7C_BCBA_419B_68BF5C9BEAF4",
        "this.PanoramaPlayListItem_95D2FC59_AA7C_BCBA_41E2_508F18CECD5C",
        "this.PanoramaPlayListItem_95D24C59_AA7C_BCBA_41D5_1AD6DBC2DF13",
        "this.PanoramaPlayListItem_95D1CC59_AA7C_BCBA_41BB_357B69A37023",
        "this.PanoramaPlayListItem_95D0BC5A_AA7C_BCBE_41E1_E5CA74963DA3",
        "this.PanoramaPlayListItem_95D00C5B_AA7C_BCBE_41DF_E99E86A712C5",
        "this.PanoramaPlayListItem_95D7EC5B_AA7C_BCBE_41E2_6D0AB74B8739",
        "this.PanoramaPlayListItem_95D74C5B_AA7C_BCBE_41CD_49CB5363CCA8",
        "this.PanoramaPlayListItem_95D6CC5C_AA7C_BCBA_4196_6AE8894BCDF3",
        "this.PanoramaPlayListItem_95D72C5C_AA7C_BCBA_41DD_5E583E50554A",
        {
          "class": "VideoPlayListItem",
          "end": "this.trigger('tourEnded')",
          "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 15, 0)",
          "media": "this.video_F7832A71_F912_DADA_41D7_5C9D29F987EA",
          "player": "this.MainViewerVideoPlayer",
          "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 15, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 15)"
        }
      ],
      "id": "mainPlayList"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2D1702D3_3F36_280A_41B4_22956D694885",
      "levels": [
        {
          "url": "media/popup_275BD730_3DB2_B549_4184_434D6E95CE15_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1768,
          "height": 2500
        },
        {
          "url": "media/popup_275BD730_3DB2_B549_4184_434D6E95CE15_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_275BD730_3DB2_B549_4184_434D6E95CE15_0_2.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_275BD730_3DB2_B549_4184_434D6E95CE15_0_3.png",
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
          "start": "this.viewer_uid95B1FC2D_AA7C_BC9A_41D6_6ADBB9D88136VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_92063D96_AA7C_9FB6_41D3_6403BB9F57E5, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_92063D96_AA7C_9FB6_41D3_6403BB9F57E5, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid95B1FC2D_AA7C_BC9A_41D6_6ADBB9D88136VideoPlayer)",
          "media": "this.video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A",
          "player": "this.viewer_uid95B1FC2D_AA7C_BC9A_41D6_6ADBB9D88136VideoPlayer"
        }
      ],
      "id": "PlayList_92063D96_AA7C_9FB6_41D3_6403BB9F57E5"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -93.87,
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
      "id": "camera_962BAD35_AA7C_BC8B_41D5_4B67F6BBA4DB"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 93.87,
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
      "id": "camera_9243B05D_AA7C_A4BA_41B8_EFDE252CDAB1"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_8B9B5F8F_A583_8121_41E1_33130C01B89F",
      "levels": [
        {
          "url": "media/popup_8B9AAF8F_A583_8121_41DA_D10BEEBB67AA_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_8B9AAF8F_A583_8121_41DA_D10BEEBB67AA_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_8B9AAF8F_A583_8121_41DA_D10BEEBB67AA_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
          "height": 512
        }
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 173.58,
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
      "id": "camera_9654AD83_AA7C_BF8E_41DF_DF1CFD6EA3CD"
    },
    {
      "fieldOfViewOverlayOutsideOpacity": 0,
      "label": "BigMap",
      "id": "map_3AADAED6_2A2C_31AB_4176_07414AC7F956",
      "minimumZoomFactor": 0.5,
      "thumbnailUrl": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_t.png",
      "width": 1143,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956.png",
            "class": "ImageResourceLevel",
            "width": 1143,
            "height": 2000
          },
          {
            "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_lq.png",
            "class": "ImageResourceLevel",
            "width": 193,
            "height": 338,
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
      "height": 2000,
      "overlays": [
        "this.overlay_2547E28F_2A2C_31B9_41C3_05D83806409A",
        "this.overlay_2559E290_2A2C_31A7_4192_7AA4BA858340",
        "this.overlay_25592290_2A2C_31A7_41C3_F1DEFD030079",
        "this.overlay_25593290_2A2C_31A7_41C2_071AE724B34E",
        "this.overlay_25591290_2A2C_31A7_41B5_5609154E6E3A",
        "this.overlay_25597290_2A2C_31A7_41B0_9E96758C9C1A",
        "this.overlay_25595290_2A2C_31A7_41A9_408C452F16A2",
        "this.overlay_255EB290_2A2C_31A7_41BF_8A02FF12B1A3",
        "this.overlay_25586291_2A2C_31A9_4198_3389498285E9",
        "this.overlay_25587291_2A2C_31A9_41BA_78313503050E",
        "this.overlay_25584291_2A2C_31A9_41A6_3D9E95552055",
        "this.overlay_2559B291_2A2C_31A9_418E_A34DBCC744EF"
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
          "class": "MapPlayListItem",
          "media": "this.map_3AADAED6_2A2C_31AB_4176_07414AC7F956",
          "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
        }
      ],
      "id": "playList_95DFAC54_AA7C_BC89_41E2_E87010E7F6D7"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
          "class": "MapPlayListItem",
          "media": "this.map_3AADAED6_2A2C_31AB_4176_07414AC7F956",
          "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
        }
      ],
      "id": "playList_95DF2C55_AA7C_BC8B_41D3_B2E973CECF41"
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
      "id": "panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -99.16,
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
      "id": "camera_926820BA_AA7C_A5FE_41C1_212CEC255821"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.22,
      "id": "popup_F4B90B36_FB9B_AB99_41E3_4229E714F0C9",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_F4B90B36_FB9B_AB99_41E3_4229E714F0C9_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 19.12,
      "yaw": 79.93,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 90.85,
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
      "id": "camera_9246E073_AA7C_A48E_41D6_FA0F1F2B8922"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 11.31,
      "autoplay": true,
      "id": "popup_8C1DFE00_A584_831F_41AD_820D4F63F2A8",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 3.31,
      "yaw": -169.05,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A.mp4"
      }
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid95A76C4D_AA7C_BC9A_41DB_7BD1841FE68AVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_92073D97_AA7C_9FB6_41BA_E2E22DFBC3F0, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_92073D97_AA7C_9FB6_41BA_E2E22DFBC3F0, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid95A76C4D_AA7C_BC9A_41DB_7BD1841FE68AVideoPlayer)",
          "media": "this.video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A",
          "player": "this.viewer_uid95A76C4D_AA7C_BC9A_41DB_7BD1841FE68AVideoPlayer"
        }
      ],
      "id": "PlayList_92073D97_AA7C_9FB6_41BA_E2E22DFBC3F0"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 3.41,
      "id": "popup_955BD34B_A5CD_A49E_41E4_0D33EE5A538D",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_955BD34B_A5CD_A49E_41E4_0D33EE5A538D_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 9.1,
      "yaw": 140.67,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -88.58,
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
      "id": "camera_92241FFB_AA7C_BB7F_41C0_87E3872AD388"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 3.3,
      "id": "popup_8DF20275_A584_83E1_41B0_B6F405B12F7A",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_8DF20275_A584_83E1_41B0_B6F405B12F7A_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 8.78,
      "yaw": 12.62,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_8DF21275_A584_83E1_41E0_DC703EE2F23C",
      "levels": [
        {
          "url": "media/popup_8DF20275_A584_83E1_41B0_B6F405B12F7A_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_8DF20275_A584_83E1_41B0_B6F405B12F7A_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_8DF20275_A584_83E1_41B0_B6F405B12F7A_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
          "height": 512
        }
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 2.46,
          "backwardYaw": 178.68,
          "distance": 1,
          "panorama": "this.panorama_E1E96E28_ED73_90DF_41CD_DB0322920492"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 98.78,
          "backwardYaw": 9.07,
          "distance": 1,
          "panorama": "this.panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -179.81,
          "backwardYaw": -6.42,
          "distance": 1,
          "panorama": "this.panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776"
        }
      ],
      "hfov": 360,
      "partial": false,
      "id": "panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67",
      "thumbnailUrl": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_t.jpg",
      "label": "IMG_20260427_131728_00_046",
      "pitch": 0,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": -4.3,
          "y": 1134.1,
          "x": 449.48
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
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_t.jpg"
        }
      ],
      "overlays": [
        "this.popup_E983843A_F911_4E49_41E9_C29B9A985460",
        "this.popup_F61EF34F_F911_CAC7_41D6_7E851A83410D",
        "this.popup_F7B85619_F916_CA4B_41E1_EE3AF2CEC5A4",
        "this.overlay_E852D9D9_F91F_F9CB_41E9_66746F6B4998",
        "this.popup_F6C8D65F_F917_4AC7_418F_B1DE853E9C81",
        "this.overlay_27FBA263_3DBF_CFC8_4142_2E2B8C1A8E0C",
        "this.overlay_20FECAEE_3DBE_5CD8_41C3_6075D19FC06C",
        "this.overlay_27A8687D_3DBE_BBB8_41C9_5C22992440EF",
        "this.overlay_8B9D5A25_A584_8360_41C5_D09DA5381375",
        "this.overlay_8B284F1F_A585_8120_41D3_9CEBD20090AA",
        "this.popup_94A5E251_A584_8321_41DF_E5C6DAE1BE5C",
        "this.popup_886B8A06_A584_8323_41DD_FEC1D9AF4D2D",
        "this.overlay_8B84455D_A65B_6CBA_41D5_DFEDF21A2DDE",
        "this.overlay_8B2FE6B7_A65B_ADF7_41D5_F911D3B2583D",
        "this.overlay_891BAB42_A65B_6489_41E3_B9EC4B5B6D41",
        "this.overlay_8AAA7DC9_A654_9F9A_41E1_34903377B18F"
      ]
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window93732"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_9725C9B1_AA54_E78B_41E1_093F3064E476",
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
        "this.viewer_uid95B45C3F_AA7C_BCF6_41D8_86517539F5BA"
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
          "panorama": "this.panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -89.15,
          "backwardYaw": 74.42,
          "distance": 1,
          "panorama": "this.panorama_E1EE4069_ED70_B150_41DE_8D514E981C75"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -155.26,
          "backwardYaw": -89.15,
          "distance": 1,
          "panorama": "this.panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260428_093235_00_110",
      "id": "panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69",
      "thumbnailUrl": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": 36.9,
          "y": 356.6,
          "x": 1063.3
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
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_26EC34FE_3DB1_D4B8_41B3_93A716BA797D",
        "this.popup_27DA84B4_3DB1_CB48_41B3_19B4EC74722B",
        "this.overlay_96AF5F96_A655_9BB6_41C7_8C472F7BCA9A",
        "this.overlay_9564DB1F_A655_A4B6_41DE_69B1F8482068",
        "this.overlay_92BAD66F_A655_6C96_41E2_20D10D5D2FF0",
        "this.overlay_97F805F6_A654_AF76_41AE_A0CBFFD66DEE"
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 74.42,
          "backwardYaw": -89.15,
          "distance": 1,
          "panorama": "this.panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 165.17,
          "backwardYaw": 19.64,
          "distance": 1,
          "panorama": "this.panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260428_093024_00_105",
      "id": "panorama_E1EE4069_ED70_B150_41DE_8D514E981C75",
      "thumbnailUrl": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": 94.74,
          "y": 83.81,
          "x": 983.67
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
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_27D72624_3DB1_B748_41C2_F581335603C2",
        "this.popup_2067CEF0_3DB1_F4C8_418C_5D8DF6977B7B",
        "this.overlay_9583A3AD_A64F_6B9B_41C6_4ED22FC05092",
        "this.overlay_94A09A27_A64F_6497_41D2_BEF3029598AC",
        "this.overlay_92BA23A0_A64F_AB8A_41CF_FB92C08F6FCD"
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid95BCBC23_AA7C_BC8F_41B0_18329BF3D9ECVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_9206FD94_AA7C_9F8A_41E4_8F98DBB6DDFB, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_9206FD94_AA7C_9F8A_41E4_8F98DBB6DDFB, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid95BCBC23_AA7C_BC8F_41B0_18329BF3D9ECVideoPlayer)",
          "media": "this.video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A",
          "player": "this.viewer_uid95BCBC23_AA7C_BC8F_41B0_18329BF3D9ECVideoPlayer"
        }
      ],
      "id": "PlayList_9206FD94_AA7C_9F8A_41E4_8F98DBB6DDFB"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.55,
      "id": "popup_8B9AAF8F_A583_8121_41DA_D10BEEBB67AA",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_8B9AAF8F_A583_8121_41DA_D10BEEBB67AA_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 15,
      "yaw": 78.18,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 5.69,
      "id": "popup_EC276EB9_F2EC_7D04_41DA_3DBBE4658BFC",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_EC276EB9_F2EC_7D04_41DA_3DBBE4658BFC_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 44.71,
      "yaw": 163.59,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -154.88,
          "backwardYaw": -6.04,
          "distance": 1,
          "panorama": "this.panorama_E1EA366B_ED70_9150_41E2_C0F604C64037"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 107.28,
          "backwardYaw": -155.26,
          "distance": 1,
          "panorama": "this.panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260428_093347_00_112",
      "id": "panorama_E1EF4BC9_ED70_B751_41DF_471345E94441",
      "thumbnailUrl": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": -27.71,
          "y": 93.21,
          "x": 114.01
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
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_2769574F_3DB2_B5D8_41C2_CA8DB5BC6112",
        "this.popup_275BD730_3DB2_B549_4184_434D6E95CE15",
        "this.overlay_8A5D9F20_A654_9C8A_41D2_B86A829304AA",
        "this.overlay_880EBC33_A654_9C8E_41A6_FEB38DB17D7A",
        "this.overlay_9644EB65_A654_E48B_41D1_79DCE247A662"
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_95DF6C55_AA7C_BC8B_41C2_5999082A1166, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_95DF6C55_AA7C_BC8B_41C2_5999082A1166, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
          "media": "this.video_23C33C52_3D56_7BC8_41C3_D8DD89A1AE26",
          "player": "this.MainViewerVideoPlayer"
        }
      ],
      "id": "playList_95DF6C55_AA7C_BC8B_41C2_5999082A1166"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 9.67,
      "id": "popup_275BD730_3DB2_B549_4184_434D6E95CE15",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_275BD730_3DB2_B549_4184_434D6E95CE15_0_2.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 10.57,
      "yaw": 106.46,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window93730"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_972839AA_AA54_E799_41C5_D170A5EFC8DF",
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
        "this.viewer_uid95BCBC23_AA7C_BC8F_41B0_18329BF3D9EC"
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
        "yaw": -17.94,
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
      "id": "camera_96650DDF_AA7C_BFB7_41BD_6B2081792E41"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window93734"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_9726D9B9_AA54_E7FB_41E3_0B99DA8E53F5",
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
        "this.viewer_uid95A76C4D_AA7C_BC9A_41DB_7BD1841FE68A"
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
          "panorama": "this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 80.84,
          "backwardYaw": 168.1,
          "distance": 1,
          "panorama": "this.panorama_E1EA366B_ED70_9150_41E2_C0F604C64037"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 162.06,
          "backwardYaw": 80.84,
          "distance": 1,
          "panorama": "this.panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260428_093149_00_108",
      "id": "panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9",
      "thumbnailUrl": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": 268.89,
          "y": 279.11,
          "x": 116.15
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
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_262B0795_3DB6_5548_41B5_7121F05BB4E8",
        "this.popup_2616A777_3DB6_55C8_41C4_2256E447179F",
        "this.overlay_97076157_A64C_A4B6_41B4_D3E731DC3433",
        "this.overlay_9580CD06_A64C_9C96_41E0_AED1AA661F76",
        "this.overlay_93D747C6_A64D_6B96_41DC_08963E56561D"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -177.54,
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
      "id": "camera_96069CFB_AA7C_BD7E_41DD_17098229FAB6"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -11.9,
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
      "id": "camera_9270D0A2_AA7C_A589_41CD_46CAB3BFE12A"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 94.82,
          "backwardYaw": 82.35,
          "distance": 1,
          "panorama": "this.panorama_E1E96E28_ED73_90DF_41CD_DB0322920492"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 4.91,
          "backwardYaw": 86.13,
          "distance": 1,
          "panorama": "this.panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260428_093253_00_111",
      "id": "panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B",
      "thumbnailUrl": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": 182.94,
          "y": 538.37,
          "x": 1050.48
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
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_t.jpg"
        }
      ],
      "overlays": [
        "this.popup_EC276EB9_F2EC_7D04_41DA_3DBBE4658BFC",
        "this.overlay_2AE72914_3DD2_5D48_41CB_111FC9F2FE1D",
        "this.overlay_208BA9CE_3DB3_DCD8_41BA_B53B11577E31",
        "this.overlay_2721BDD6_3DAE_74C9_41C1_6A85CF164F11",
        "this.popup_2733DDAE_3DAE_7558_41C6_074640EA8E75",
        "this.popup_8C2C3AE3_A587_80E0_41B0_3332D3C2FC83",
        "this.overlay_881445D2_A657_AF89_41D4_E9B41506AC23",
        "this.overlay_9534EB7E_A654_BB76_41D6_E4BB87923C65",
        "this.overlay_96C4010D_AA7D_649A_41CF_59D754203228"
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_272C6449_3DB2_CBDB_41C5_4868D2C953F6",
      "levels": [
        {
          "url": "media/popup_272C7449_3DB2_CBDB_41C6_2D346677502A_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_272C7449_3DB2_CBDB_41C6_2D346677502A_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_272C7449_3DB2_CBDB_41C6_2D346677502A_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
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
      "hfov": 3.94,
      "id": "popup_F4B9FB36_FB9B_AB99_41DA_67C0DDD41003",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_F4B9FB36_FB9B_AB99_41DA_67C0DDD41003_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 17.59,
      "yaw": 53.75,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -97.65,
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
      "id": "camera_963EED18_AA7C_BCB9_41C3_DFC28CD3A5A8"
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
        "yaw": -66.3,
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
      "id": "camera_922ECFCB_AA7C_BB9F_41D6_75A6E0781DC7"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -1.32,
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
      "id": "camera_9622ED51_AA7C_BC8A_416C_92D0B84B8610"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 24.74,
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
      "id": "camera_966A7DC8_AA7C_BF99_418F_AAC70CD451D3"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.18,
      "id": "popup_21430BD0_3D5F_DCC9_41CD_44015B0EF558",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_21430BD0_3D5F_DCC9_41CD_44015B0EF558_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 11.83,
      "yaw": -147.55,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -160.36,
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
      "id": "camera_927E808C_AA7C_A599_41BF_71D7042F1C60"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_EBE85048_F911_C6C9_41E0_EA2E52FAE9D2",
      "levels": [
        {
          "url": "media/popup_F7B85619_F916_CA4B_41E1_EE3AF2CEC5A4_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_F7B85619_F916_CA4B_41E1_EE3AF2CEC5A4_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_F7B85619_F916_CA4B_41E1_EE3AF2CEC5A4_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
          "height": 512
        }
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2604C2FA_3DBE_4CB8_41B3_C2C9A554C9F3",
      "levels": [
        {
          "url": "media/popup_2604D2FA_3DBE_4CB8_41A7_FC22C147E81B_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_2604D2FA_3DBE_4CB8_41A7_FC22C147E81B_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_2604D2FA_3DBE_4CB8_41A7_FC22C147E81B_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
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
      "hfov": 7.1,
      "id": "popup_2067CEF0_3DB1_F4C8_418C_5D8DF6977B7B",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2067CEF0_3DB1_F4C8_418C_5D8DF6977B7B_0_2.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 32.49,
      "yaw": -18.79,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window93731"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_972B39B0_AA54_E789_41D8_81FC8D0D6568",
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
        "this.viewer_uid95B1FC2D_AA7C_BC9A_41D6_6ADBB9D88136"
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
        "yaw": -72.72,
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
      "id": "camera_96DDAE68_AA7C_BC99_41B3_2AD6E4E67EAF"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 9.4,
      "id": "popup_26EA2CA5_3DB2_BB48_41B6_5FBA13A427C7",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_26EA2CA5_3DB2_BB48_41B6_5FBA13A427C7_0_2.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 12.56,
      "yaw": -111.72,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 3.71,
      "id": "popup_2604D2FA_3DBE_4CB8_41A7_FC22C147E81B",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2604D2FA_3DBE_4CB8_41A7_FC22C147E81B_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 24.17,
      "yaw": -67.25,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.14,
      "id": "popup_272C7449_3DB2_CBDB_41C6_2D346677502A",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_272C7449_3DB2_CBDB_41C6_2D346677502A_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 14.09,
      "yaw": -158.12,
      "hideDuration": 500,
      "popupDistance": 100
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
      "id": "panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_camera"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 9.39,
      "id": "popup_2616A777_3DB6_55C8_41C4_2256E447179F",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2616A777_3DB6_55C8_41C4_2256E447179F_0_2.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 7.34,
      "yaw": 141.01,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 1.32,
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
      "id": "camera_9235BF9E_AA7C_BBB6_41D4_76B19774F580"
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
      "id": "panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_camera"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -178.68,
          "backwardYaw": -86.13,
          "distance": 1,
          "panorama": "this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_E1EE4069_ED70_B150_41DE_8D514E981C75"
        }
      ],
      "hfov": 360,
      "partial": false,
      "id": "panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2",
      "thumbnailUrl": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_t.jpg",
      "label": "IMG_20260428_092859_00_104",
      "pitch": 0,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": 69.96,
          "y": 199.62,
          "x": 1012.73
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
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_t.jpg"
        }
      ],
      "overlays": [
        "this.popup_EFACD4EC_FC76_6C04_41E7_45C343C448E8",
        "this.overlay_26C8CD3C_3DAF_B5B8_41C1_377CD0DADC00",
        "this.popup_277F7AB5_3DAE_BF48_4168_37958A6E43A0",
        "this.overlay_95EEEBDD_A64F_BBBA_41D0_F88D3170D5DE",
        "this.overlay_93A7798C_A64F_679A_41E2_4397C8E4E4D7",
        "this.overlay_908F6404_A64C_AC89_41C0_1B42B00CEC89"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -105.58,
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
      "id": "camera_92511027_AA7C_A497_41C6_C36A0F1BDAD9"
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
      "id": "panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_camera"
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
      "id": "panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_camera"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid95A16C4B_AA7C_BC9E_41B0_52C7925F041FVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_92079D96_AA7C_9FB6_41E4_067FB6D0C704, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_92079D96_AA7C_9FB6_41E4_067FB6D0C704, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid95A16C4B_AA7C_BC9E_41B0_52C7925F041FVideoPlayer)",
          "media": "this.video_F7832A71_F912_DADA_41D7_5C9D29F987EA",
          "player": "this.viewer_uid95A16C4B_AA7C_BC9E_41B0_52C7925F041FVideoPlayer"
        }
      ],
      "id": "PlayList_92079D96_AA7C_9FB6_41E4_067FB6D0C704"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -6.04,
          "backwardYaw": -154.88,
          "distance": 1,
          "panorama": "this.panorama_E1EF4BC9_ED70_B751_41DF_471345E94441"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 74.04,
          "backwardYaw": 91.42,
          "distance": 1,
          "panorama": "this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 168.1,
          "backwardYaw": 80.84,
          "distance": 1,
          "panorama": "this.panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260428_093121_00_107",
      "id": "panorama_E1EA366B_ED70_9150_41E2_C0F604C64037",
      "thumbnailUrl": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": 0,
          "y": 185.24,
          "x": 110.02
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
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_267DDD66_3DB6_F5C8_41CB_2970C9A3DCD3",
        "this.popup_2668ED48_3DB6_F5D8_41C1_5E9B4A035543",
        "this.overlay_974FB305_A64D_E48A_41C1_8831F3DEFB0F",
        "this.overlay_95DB3CBA_A64D_9DFE_41D8_42270C1A1D98",
        "this.overlay_93118918_A64D_A4B9_41B9_2CD6016C22B2"
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 82.35,
          "backwardYaw": 94.82,
          "distance": 1,
          "panorama": "this.panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -81.22,
          "backwardYaw": 90.28,
          "distance": 1,
          "panorama": "this.panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 178.68,
          "backwardYaw": 2.46,
          "distance": 1,
          "panorama": "this.panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67"
        }
      ],
      "hfov": 360,
      "partial": false,
      "id": "panorama_E1E96E28_ED73_90DF_41CD_DB0322920492",
      "thumbnailUrl": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_t.jpg",
      "label": "IMG_20260427_131802_00_047",
      "pitch": 0,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": 0,
          "y": 592.79,
          "x": 457.89
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
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_20C1C9E2_3D56_DCC8_41B8_2A43DF493DD0",
        "this.overlay_217E8BEF_3D5F_DCD8_41C6_F8BE318FCBA1",
        "this.popup_20D359C1_3D56_DCC8_41CC_6B8365D9ADA6",
        "this.popup_21430BD0_3D5F_DCC9_41CD_44015B0EF558",
        "this.popup_8C1DFE00_A584_831F_41AD_820D4F63F2A8",
        "this.overlay_95D65DDE_A64D_9FB6_41E0_5C1568432927",
        "this.overlay_93856422_A64C_AC8E_41E3_41D1AF9CC7BF",
        "this.overlay_91FD53AA_A64C_EB9E_41D3_2682855A4325",
        "this.overlay_95B6827C_A5D5_A57A_41D3_E77054028A48"
      ]
    },
    {
      "class": "Video",
      "label": "Virtual Reality (1)",
      "scaleMode": "fit_inside",
      "thumbnailUrl": "media/video_23C33C52_3D56_7BC8_41C3_D8DD89A1AE26_t.jpg",
      "width": 2240,
      "loop": false,
      "id": "video_23C33C52_3D56_7BC8_41C3_D8DD89A1AE26",
      "height": 2240,
      "video": {
        "width": 2240,
        "class": "VideoResource",
        "height": 2240,
        "mp4Url": "media/video_23C33C52_3D56_7BC8_41C3_D8DD89A1AE26.mp4"
      }
    },
    {
      "class": "MapPlayer",
      "viewerArea": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4",
      "id": "ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer",
      "movementMode": "constrained"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 86.13,
          "backwardYaw": 4.91,
          "distance": 1,
          "panorama": "this.panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 9.07,
          "backwardYaw": 98.78,
          "distance": 1,
          "panorama": "this.panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -58.17,
          "backwardYaw": 47.03,
          "distance": 1,
          "panorama": "this.panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776"
        }
      ],
      "hfov": 360,
      "partial": false,
      "id": "panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E",
      "thumbnailUrl": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_t.jpg",
      "label": "IMG_20260427_131950_00_050",
      "pitch": 0,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": -85.59,
          "y": 1065.44,
          "x": 973.98
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_2731BBEE_3DB2_5CD9_41C8_0B225C6C2DF6",
        "this.overlay_27237AE6_3D56_5CC8_4192_DF138B78E270",
        "this.popup_26B35F5F_3DB1_B5F7_41C7_AAA4731A77BC",
        "this.popup_273D1BD0_3DB2_5CC9_41C8_3254B67358B7",
        "this.popup_273DEAC4_3D56_5CC8_41C5_6849297FCBD7",
        "this.popup_8CCB2360_A584_811F_41B4_5DC2E943A262",
        "this.overlay_8BB39FBB_A583_8161_41AF_3D8CC51CCF56",
        "this.overlay_8B070BDB_A58C_8121_4182_31A2408DE7FA",
        "this.popup_8B9AAF8F_A583_8121_41DA_D10BEEBB67AA",
        "this.overlay_9649BF94_A64D_7B89_41D1_4F779B78B19F",
        "this.overlay_940C2C94_A64D_BD89_41C6_1CDBF155A1F0",
        "this.overlay_91B69C14_A64D_FC89_41E0_9460B175C305"
      ]
    },
    {
      "class": "Video",
      "label": "6. LAB_FISIKA",
      "scaleMode": "fit_inside",
      "thumbnailUrl": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A_t.jpg",
      "width": 2964,
      "loop": false,
      "id": "video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A",
      "height": 1694,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A.mp4"
      }
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_886BFA06_A584_8323_41C4_406DA7AACDD5",
      "levels": [
        {
          "url": "media/popup_886B8A06_A584_8323_41DD_FEC1D9AF4D2D_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_886B8A06_A584_8323_41DD_FEC1D9AF4D2D_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_886B8A06_A584_8323_41DD_FEC1D9AF4D2D_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
          "height": 512
        }
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -89.15,
          "backwardYaw": -155.26,
          "distance": 1,
          "panorama": "this.panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 80.84,
          "backwardYaw": 162.06,
          "distance": 1,
          "panorama": "this.panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260428_093220_00_109",
      "id": "panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE",
      "thumbnailUrl": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": -172.36,
          "y": 284.38,
          "x": 528.26
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
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_26008725_3DB1_D54B_41C2_A912A990E14A",
        "this.popup_260BD707_3DB1_D548_41CB_0BEDA58D3283",
        "this.overlay_976C0AA1_A654_A58A_41D5_E638B9A077A6",
        "this.overlay_91117D2A_A64B_BC9E_41C7_865FA62D26B5",
        "this.overlay_97FC6991_A64B_678A_41E1_F795F36CDBB5"
      ]
    },
    {
      "class": "Video",
      "label": "6. LAB_FISIKA",
      "scaleMode": "fit_inside",
      "thumbnailUrl": "media/video_F7832A71_F912_DADA_41D7_5C9D29F987EA_t.jpg",
      "width": 2964,
      "loop": false,
      "id": "video_F7832A71_F912_DADA_41D7_5C9D29F987EA",
      "height": 1694,
      "video": {
        "width": 2964,
        "class": "VideoResource",
        "height": 1694,
        "mp4Url": "media/video_F7832A71_F912_DADA_41D7_5C9D29F987EA.mp4"
      }
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 121.83,
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
      "id": "camera_967D1DB0_AA7C_BF89_41E1_3C9A67AC8046"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_955BD34B_A5CD_A49E_41DD_0E23D505557D",
      "levels": [
        {
          "url": "media/popup_955BD34B_A5CD_A49E_41E4_0D33EE5A538D_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_955BD34B_A5CD_A49E_41E4_0D33EE5A538D_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_955BD34B_A5CD_A49E_41E4_0D33EE5A538D_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
          "height": 512
        }
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 24.74,
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
      "id": "camera_96A17E51_AA7C_BC8A_41CB_CB101FBE14F5"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_EBEE0041_F911_C63B_41DD_C58C21F771C7",
      "levels": [
        {
          "url": "media/popup_E983843A_F911_4E49_41E9_C29B9A985460_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_E983843A_F911_4E49_41E9_C29B9A985460_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_E983843A_F911_4E49_41E9_C29B9A985460_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
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
      "id": "panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_camera"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2D1222D8_3F36_2806_41C3_88C5F04536D2",
      "levels": [
        {
          "url": "media/popup_260BD707_3DB1_D548_41CB_0BEDA58D3283_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1768,
          "height": 2500
        },
        {
          "url": "media/popup_260BD707_3DB1_D548_41CB_0BEDA58D3283_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_260BD707_3DB1_D548_41CB_0BEDA58D3283_0_2.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_260BD707_3DB1_D548_41CB_0BEDA58D3283_0_3.png",
          "class": "ImageResourceLevel",
          "width": 362,
          "height": 512
        }
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_ED2BF7D7_F26D_AB0D_41E3_9A11F1BA8E48",
      "levels": [
        {
          "url": "media/popup_EC276EB9_F2EC_7D04_41DA_3DBBE4658BFC_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_EC276EB9_F2EC_7D04_41DA_3DBBE4658BFC_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_EC276EB9_F2EC_7D04_41DA_3DBBE4658BFC_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
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
      "hfov": 11.3,
      "autoplay": true,
      "id": "popup_8CCB2360_A584_811F_41B4_5DC2E943A262",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 4.06,
      "yaw": -53.07,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 2964,
        "class": "VideoResource",
        "height": 1694,
        "mp4Url": "media/video_F7832A71_F912_DADA_41D7_5C9D29F987EA.mp4"
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
      "id": "panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_camera"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_BCBF5ECD_A65D_7D9A_419A_80C1B718A42E",
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
      "id": "panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_camera"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 7.69,
      "id": "popup_EA12E675_FCDE_6C04_41B8_74476AEC6222",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_EA12E675_FCDE_6C04_41B8_74476AEC6222_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 15.03,
      "yaw": 9.38,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 12.51,
      "id": "popup_27DA84B4_3DB1_CB48_41B3_19B4EC74722B",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_27DA84B4_3DB1_CB48_41B3_19B4EC74722B_0_2.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 21.15,
      "yaw": -58.84,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 13.01,
      "id": "popup_260BD707_3DB1_D548_41CB_0BEDA58D3283",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_260BD707_3DB1_D548_41CB_0BEDA58D3283_0_2.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 13.98,
      "yaw": -137.79,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -86.13,
          "backwardYaw": -178.68,
          "distance": 1,
          "panorama": "this.panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 91.42,
          "backwardYaw": 74.04,
          "distance": 1,
          "panorama": "this.panorama_E1EA366B_ED70_9150_41E2_C0F604C64037"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 177.92,
          "backwardYaw": 113.7,
          "distance": 1,
          "panorama": "this.panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260428_093415_00_113",
      "id": "panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F",
      "thumbnailUrl": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_t.jpg",
      "pitch": 0,
      "partial": false,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": 179,
          "y": 188.09,
          "x": 526.4
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
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_26F1DCC6_3DB2_B4C9_41BD_9E6E44DA2D2D",
        "this.popup_26EA2CA5_3DB2_BB48_41B6_5FBA13A427C7",
        "this.overlay_8A7F5FA3_A655_7B8E_41E1_6D664AFB77A7",
        "this.overlay_887DEE84_A655_BD89_41E0_DC053E9CA353",
        "this.overlay_95DF0C22_A655_FC8E_41A6_B4AFA4823933",
        "this.overlay_89B0B9FF_A655_A776_41D6_6B651AE325C4"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 98.78,
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
      "id": "camera_9231EF8D_AA7C_BB9A_41D2_4EFBCD50D3D6"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -85.18,
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
      "id": "camera_96102CC6_AA7C_BD96_41D3_5F1D76A28937"
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
      "id": "panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -99.16,
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
      "id": "camera_925E0011_AA7C_A48B_41E1_101F2CE191EF"
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
      "id": "panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_camera"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 13.24,
      "id": "popup_2668ED48_3DB6_F5D8_41C1_5E9B4A035543",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2668ED48_3DB6_F5D8_41C1_5E9B4A035543_0_2.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 9.07,
      "yaw": 60.16,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window93733"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_972429B2_AA54_E78E_41DD_91BDCB075D4F",
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
        "this.viewer_uid95A16C4B_AA7C_BC9E_41B0_52C7925F041F"
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
      "id": "ImageResource_2D15C2D2_3F36_280A_41B3_F5356EDC2871",
      "levels": [
        {
          "url": "media/popup_26EA2CA5_3DB2_BB48_41B6_5FBA13A427C7_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1768,
          "height": 2500
        },
        {
          "url": "media/popup_26EA2CA5_3DB2_BB48_41B6_5FBA13A427C7_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_26EA2CA5_3DB2_BB48_41B6_5FBA13A427C7_0_2.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_26EA2CA5_3DB2_BB48_41B6_5FBA13A427C7_0_3.png",
          "class": "ImageResourceLevel",
          "width": 362,
          "height": 512
        }
      ]
    },
    {
      "class": "FadeInEffect",
      "duration": 500,
      "id": "FadeInEffect_BCBF7ECD_A65D_7D9A_41CD_7EE3F04E8F06",
      "easing": "cubic_in"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
          "class": "MapPlayListItem",
          "media": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "player": "this.MapViewerMapPlayer"
        }
      ],
      "id": "playList_95DF9C55_AA7C_BC8B_4189_09544FED9C70"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -6.42,
          "backwardYaw": -179.81,
          "distance": 1,
          "panorama": "this.panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 47.03,
          "backwardYaw": -58.17,
          "distance": 1,
          "panorama": "this.panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E"
        }
      ],
      "hfov": 360,
      "partial": false,
      "id": "panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776",
      "thumbnailUrl": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_t.jpg",
      "label": "IMG_20260427_131658_00_045",
      "pitch": 0,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_F98E9261_F214_A505_41E9_1B645F7CE860",
          "class": "PanoramaMapLocation",
          "angle": 0,
          "y": 1609.6,
          "x": 475.26
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
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_E9217B3F_F911_BA47_41CA_218E794F46BF",
        "this.popup_F4B9FB36_FB9B_AB99_41DA_67C0DDD41003",
        "this.popup_F4B90B36_FB9B_AB99_41E3_4229E714F0C9",
        "this.overlay_2AC3C313_3DD1_CD48_41BE_32DC0BB7CF34",
        "this.overlay_2617B318_3DBE_4D78_41BB_058ED7E246EE",
        "this.overlay_20DD70BD_3DB2_4CBB_418C_7CF2A53EA3A4",
        "this.overlay_278B666F_3DB2_F7D7_41C3_A57747B1FAEA",
        "this.popup_2604D2FA_3DBE_4CB8_41A7_FC22C147E81B",
        "this.overlay_8235577A_A59C_81E0_41CC_124E83790787",
        "this.overlay_8DFDB2A0_A584_831F_41E3_9FCB7F513217",
        "this.popup_94898D26_A58D_8163_41A8_AD65E002FD71",
        "this.overlay_960652D6_A584_8320_41E2_FEEBC69B4291",
        "this.popup_8DF20275_A584_83E1_41B0_B6F405B12F7A",
        "this.overlay_8D41BFF6_A65D_7B76_41D1_C2E7AEFE5FBD",
        "this.overlay_8BF1D7B7_A65C_ABF7_41B6_9CE8BC2BE4CE"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 90.85,
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
      "id": "camera_924A8042_AA7C_A489_41C0_B5F95D332B27"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 173.96,
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
      "id": "camera_96B5FE39_AA7C_BCFA_41C5_187C431E9B61"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.34,
      "id": "popup_F61EF34F_F911_CAC7_41D6_7E851A83410D",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_F61EF34F_F911_CAC7_41D6_7E851A83410D_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 15.75,
      "yaw": 128.27,
      "hideDuration": 500,
      "popupDistance": 100
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
      "id": "panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -170.93,
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
      "id": "camera_965EBD6C_AA7C_BC9A_41CA_440CBBB24C71"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -89.72,
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
      "id": "camera_960F8CDF_AA7C_BDB6_41BC_2F9F0B6CA48B"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_23C1DF27_3D5E_D548_41BA_A2A30A0661BB",
      "levels": [
        {
          "url": "media/popup_2067CEF0_3DB1_F4C8_418C_5D8DF6977B7B_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1768,
          "height": 2500
        },
        {
          "url": "media/popup_2067CEF0_3DB1_F4C8_418C_5D8DF6977B7B_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_2067CEF0_3DB1_F4C8_418C_5D8DF6977B7B_0_2.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_2067CEF0_3DB1_F4C8_418C_5D8DF6977B7B_0_3.png",
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
      "id": "panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_camera"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid95B45C3F_AA7C_BCF6_41D8_86517539F5BAVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_92066D96_AA7C_9FB6_41D6_4429583011A2, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_92066D96_AA7C_9FB6_41D6_4429583011A2, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid95B45C3F_AA7C_BCF6_41D8_86517539F5BAVideoPlayer)",
          "media": "this.video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A",
          "player": "this.viewer_uid95B45C3F_AA7C_BCF6_41D8_86517539F5BAVideoPlayer"
        }
      ],
      "id": "PlayList_92066D96_AA7C_9FB6_41D6_4429583011A2"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 25.12,
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
      "id": "camera_92208FE2_AA7C_BB89_41E4_0788FDE56632"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 3.11,
      "id": "popup_F7B85619_F916_CA4B_41E1_EE3AF2CEC5A4",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_F7B85619_F916_CA4B_41E1_EE3AF2CEC5A4_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 27.17,
      "yaw": -97.22,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 37.41,
      "autoplay": true,
      "id": "popup_94898D26_A58D_8163_41A8_AD65E002FD71",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 15.96,
      "yaw": -139.01,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A.mp4"
      }
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2D10A2D8_3F36_2806_41CC_116EB31C0285",
      "levels": [
        {
          "url": "media/popup_27DA84B4_3DB1_CB48_41B3_19B4EC74722B_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1768,
          "height": 2500
        },
        {
          "url": "media/popup_27DA84B4_3DB1_CB48_41B3_19B4EC74722B_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_27DA84B4_3DB1_CB48_41B3_19B4EC74722B_0_2.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_27DA84B4_3DB1_CB48_41B3_19B4EC74722B_0_3.png",
          "class": "ImageResourceLevel",
          "width": 362,
          "height": 512
        }
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_F4B92B36_FB9B_AB99_41C8_522AD82EB040",
      "levels": [
        {
          "url": "media/popup_F4B90B36_FB9B_AB99_41E3_4229E714F0C9_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_F4B90B36_FB9B_AB99_41E3_4229E714F0C9_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_F4B90B36_FB9B_AB99_41E3_4229E714F0C9_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
          "height": 512
        }
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_273D6BD0_3DB2_5CC9_41C7_5391FB7053D3",
      "levels": [
        {
          "url": "media/popup_273D1BD0_3DB2_5CC9_41C8_3254B67358B7_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_273D1BD0_3DB2_5CC9_41C8_3254B67358B7_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_273D1BD0_3DB2_5CC9_41C8_3254B67358B7_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
          "height": 512
        }
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -2.08,
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
      "id": "camera_96C96E7D_AA7C_BD7A_41D4_22C3653433B3"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_F4B9EB36_FB9B_AB99_41EA_265F453B91D2",
      "levels": [
        {
          "url": "media/popup_F4B9FB36_FB9B_AB99_41DA_67C0DDD41003_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_F4B9FB36_FB9B_AB99_41DA_67C0DDD41003_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_F4B9FB36_FB9B_AB99_41DA_67C0DDD41003_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
          "height": 512
        }
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_95DFCC55_AA7C_BC8B_41E3_B0CD17091CF1, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_95DFCC55_AA7C_BC8B_41E3_B0CD17091CF1, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
          "media": "this.video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A",
          "player": "this.MainViewerVideoPlayer"
        }
      ],
      "id": "playList_95DFCC55_AA7C_BC8B_41E3_B0CD17091CF1"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_23C33F27_3D5E_D548_41C2_B20334F355B9",
      "levels": [
        {
          "url": "media/popup_277F7AB5_3DAE_BF48_4168_37958A6E43A0_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1768,
          "height": 2500
        },
        {
          "url": "media/popup_277F7AB5_3DAE_BF48_4168_37958A6E43A0_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_277F7AB5_3DAE_BF48_4168_37958A6E43A0_0_2.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_277F7AB5_3DAE_BF48_4168_37958A6E43A0_0_3.png",
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
        "yaw": -14.83,
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
      "id": "camera_923CDF7B_AA7C_BB7F_41E1_8773DB4E5657"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 0.19,
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
      "id": "camera_96412D9B_AA7C_BFBF_41E2_8EFB54DC1EB8"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_21431BD1_3D5F_DCCB_41C3_509F345E25E7",
      "levels": [
        {
          "url": "media/popup_21430BD0_3D5F_DCC9_41CD_44015B0EF558_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_21430BD0_3D5F_DCC9_41CD_44015B0EF558_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_21430BD0_3D5F_DCC9_41CD_44015B0EF558_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
          "height": 512
        }
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_EA12E675_FCDE_6C04_41EF_37CE5657741E",
      "levels": [
        {
          "url": "media/popup_EA12E675_FCDE_6C04_41B8_74476AEC6222_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_EA12E675_FCDE_6C04_41B8_74476AEC6222_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_EA12E675_FCDE_6C04_41B8_74476AEC6222_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
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
      "hfov": 3.44,
      "id": "popup_273D1BD0_3DB2_5CC9_41C8_3254B67358B7",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_273D1BD0_3DB2_5CC9_41C8_3254B67358B7_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 10.41,
      "yaw": -20.14,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 7.12,
      "id": "popup_277F7AB5_3DAE_BF48_4168_37958A6E43A0",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_277F7AB5_3DAE_BF48_4168_37958A6E43A0_0_2.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 27.29,
      "yaw": -77.06,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_955B3349_A5CD_A49B_41CE_B1611845C60A",
      "levels": [
        {
          "url": "media/popup_955B2349_A5CD_A49B_41E0_1837B3546551_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_955B2349_A5CD_A49B_41E0_1837B3546551_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_955B2349_A5CD_A49B_41E0_1837B3546551_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
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
      "hfov": 9.08,
      "autoplay": true,
      "id": "popup_8C2C3AE3_A587_80E0_41B0_3332D3C2FC83",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 2.57,
      "yaw": 34.09,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A.mp4"
      }
    },
    {
      "class": "FadeOutEffect",
      "duration": 500,
      "id": "FadeOutEffect_BCBF8ECD_A65D_7D9A_41DB_E0E354146430",
      "easing": "cubic_out"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_3012A316_3F36_280B_41C7_CD29950DE62E",
      "levels": [
        {
          "url": "media/popup_2668ED48_3DB6_F5D8_41C1_5E9B4A035543_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1768,
          "height": 2500
        },
        {
          "url": "media/popup_2668ED48_3DB6_F5D8_41C1_5E9B4A035543_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_2668ED48_3DB6_F5D8_41C1_5E9B4A035543_0_2.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_2668ED48_3DB6_F5D8_41C1_5E9B4A035543_0_3.png",
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
      "id": "panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_camera"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2D0C52D9_3F36_2806_41C7_D63F1DD3E21C",
      "levels": [
        {
          "url": "media/popup_2616A777_3DB6_55C8_41C4_2256E447179F_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1768,
          "height": 2500
        },
        {
          "url": "media/popup_2616A777_3DB6_55C8_41C4_2256E447179F_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1448,
          "height": 2048
        },
        {
          "url": "media/popup_2616A777_3DB6_55C8_41C4_2256E447179F_0_2.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_2616A777_3DB6_55C8_41C4_2256E447179F_0_3.png",
          "class": "ImageResourceLevel",
          "width": 362,
          "height": 512
        }
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_EBEB4044_F911_C639_41E3_4ECB24043090",
      "levels": [
        {
          "url": "media/popup_F61EF34F_F911_CAC7_41D6_7E851A83410D_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1414,
          "height": 2000
        },
        {
          "url": "media/popup_F61EF34F_F911_CAC7_41D6_7E851A83410D_0_1.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_F61EF34F_F911_CAC7_41D6_7E851A83410D_0_2.png",
          "class": "ImageResourceLevel",
          "width": 361,
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
      "id": "panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_camera"
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.MainViewer",
      "id": "MainViewerVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.56,
      "id": "popup_E983843A_F911_4E49_41E9_C29B9A985460",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E983843A_F911_4E49_41E9_C29B9A985460_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 18.86,
      "yaw": 103.2,
      "hideDuration": 500,
      "popupDistance": 100
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
        "this.Image_832BB3C6_A59C_8120_41D7_698AF5212ED8"
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
        "name": "minimap"
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
        "name": "UIComponent94797"
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
        "name": "ZoomImage94798"
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
        "name": "CloseButton94799"
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
          "toolTip": "Safety Rules",
          "click": "this.showPopupPanoramaOverlay(this.popup_272C7449_3DB2_CBDB_41C6_2D346677502A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_272C6449_3DB2_CBDB_41C5_4868D2C953F6, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.76,
          "image": "this.AnimatedImageResource_223CCF0E_3D5E_D559_41CC_9A2304C2B6BF",
          "pitch": 14.09,
          "yaw": -158.12,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_273F746A_3DB2_CBD8_41C3_6047992DE35E",
      "maps": [
        {
          "hfov": 7.76,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -158.12,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0_HS_1_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 14.09
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A.mp4"
      },
      "hfov": 11.48,
      "autoplay": true,
      "id": "overlay_20C1C29D_3D52_4F7B_41C7_866BB69D1730",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_20C1C29D_3D52_4F7B_41C7_866BB69D1730_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 3.22,
      "useHandCursor": true,
      "roll": 0.02,
      "yaw": -174.3,
      "rotationY": -15.81,
      "class": "VideoPanoramaOverlay",
      "rotationX": -6.47,
      "toolTip": "Klik untuk Memnutar Video",
      "videoVisibleOnStop": false,
      "data": {
        "label": "Video"
      },
      "vfov": 6.42,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.46,
      "id": "popup_20D7927D_3D52_4FBB_41C3_1F84812D24B6",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 8.12,
      "yaw": -174.16,
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1E96E28_ED73_90DF_41CD_DB0322920492, this.camera_9231EF8D_AA7C_BB9A_41D2_4EFBCD50D3D6); this.mainPlayList.set('selectedIndex', 14)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.25,
          "image": "this.AnimatedImageResource_954F049B_A5D4_ADBF_41DF_9CAFB78F25A9",
          "pitch": -47.88,
          "yaw": 90.28,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9500BB65_A64C_A48A_41D2_18B621699372",
      "maps": [
        {
          "hfov": 19.25,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 90.28,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -47.88
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
          "toolTip": "Tata-Tertib Penelitian Laboratorium",
          "click": "this.showPopupPanoramaOverlay(this.popup_955B2349_A5CD_A49B_41E0_1837B3546551, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_955B3349_A5CD_A49B_41CE_B1611845C60A, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.17,
          "image": "this.AnimatedImageResource_954CF49B_A5D4_ADBF_41A6_4D4971DC487D",
          "pitch": 10.14,
          "yaw": 135.7,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_95600393_A5CD_AB8E_41CC_463BA0F14486",
      "maps": [
        {
          "hfov": 5.17,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 135.7,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 10.14
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
          "click": "this.showPopupPanoramaOverlay(this.popup_955BD34B_A5CD_A49E_41E4_0D33EE5A538D, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_955BD34B_A5CD_A49E_41DD_0E23D505557D, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 4.95,
          "image": "this.AnimatedImageResource_954CD49B_A5D4_ADBF_41CB_62F81E078652",
          "pitch": 9.1,
          "yaw": 140.67,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_95601393_A5CD_AB8E_41B0_C06E7CBCF402",
      "maps": [
        {
          "hfov": 4.95,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 140.67,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 9.1
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
          "hfov": 11.67,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0_HS_6_0.png",
                "class": "ImageResourceLevel",
                "width": 387,
                "height": 684
              }
            ]
          },
          "pitch": -2.74,
          "yaw": 129.95
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Alat Pelindung Diri (APD)"
        }
      ],
      "id": "overlay_922FA1F6_A5CC_E789_41DC_D195D9DDB046",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 11.67,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 129.95,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0_HS_6_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 112,
                "height": 200
              }
            ]
          },
          "pitch": -2.74
        }
      ]
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_0_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 571.79,
        "x": 423.93,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 570.94,
        "width": 69.33,
        "x": 423.22,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_0.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FE6A134F_F217_EB1C_41E0_8B5403A19D7C",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_1_map.gif",
              "class": "ImageResourceLevel",
              "width": 34,
              "height": 21
            }
          ]
        },
        "y": 1112.82,
        "x": 415.67,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 1112.25,
        "width": 69.33,
        "x": 414.81,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_1.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FEA8A0B5_F214_650D_41D9_FA0D2AED033B",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_2_map.gif",
              "class": "ImageResourceLevel",
              "width": 34,
              "height": 21
            }
          ]
        },
        "y": 1588.46,
        "x": 441.45,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 1587.75,
        "width": 69.33,
        "x": 440.6,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_2.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FE583162_F214_6704_41ED_A79CD64DC58F",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_3_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 551.57,
        "x": 150.85,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 550.71,
        "width": 69.33,
        "x": 150,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_3.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FEE635CD_F215_AF1D_41D9_3C05ED32387C",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_4_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 517.38,
        "x": 1016.81,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 516.52,
        "width": 69.33,
        "x": 1015.81,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_4.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FF6A471D_F215_EB3C_41D6_548C19287526",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_5_map.gif",
              "class": "ImageResourceLevel",
              "width": 34,
              "height": 21
            }
          ]
        },
        "y": 1044.44,
        "x": 940.03,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 1043.59,
        "width": 69.33,
        "x": 939.32,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_5.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FC5EAC62_F214_7D04_4191_B2869E30F2FB",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_6_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 166.95,
        "x": 492.74,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 166.24,
        "width": 69.33,
        "x": 491.74,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_6.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FC004F8E_F214_5B1F_41D3_7155DCB8A675",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_7_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 258.12,
        "x": 82.34,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 257.26,
        "width": 69.33,
        "x": 81.48,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_7.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FF8DB38A_F21B_AB07_41E0_AF3453B3B4D2",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_8_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 164.1,
        "x": 76.21,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 163.39,
        "width": 69.33,
        "x": 75.36,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_8.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FE6BFCD2_F21C_5D04_41DE_0D84B4C8FC61",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_9_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 72.22,
        "x": 80.34,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 71.37,
        "width": 69.33,
        "x": 79.34,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_9.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FF26CBD3_F21C_BB05_41D6_2D3B0C0CA2B5",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_10_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 70.09,
        "x": 485.19,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 69.23,
        "width": 69.33,
        "x": 484.33,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_10.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FFBA26DF_F21C_ED3D_41E5_A315AC858E05",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_11_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 263.25,
        "x": 494.44,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 262.54,
        "width": 69.33,
        "x": 493.59,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_11.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FEB929BF_F21C_E77D_4199_CC6D4D6057E7",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_12_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 264.25,
        "x": 849.72,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "areas": [
        {
          "mapColor": "#FF0000",
          "class": "HotspotMapOverlayArea"
        }
      ],
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 263.39,
        "width": 69.33,
        "x": 848.72,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_12.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
            }
          ]
        }
      },
      "useHandCursor": true,
      "rollOverDisplay": true,
      "id": "overlay_FF6318F3_F21C_A505_41D0_9854C5F40596",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_13_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 62.82,
        "x": 949.86,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 61.97,
        "width": 69.33,
        "x": 949,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_13.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FE807B3D_F21C_5B7D_41E9_4EDDEDD9051E",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_14_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 178.49,
        "x": 978.77,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 177.78,
        "width": 69.33,
        "x": 978.06,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_14.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FF5C82C8_F21C_6503_41E3_D1273B552288",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 69.33,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_15_map.gif",
              "class": "ImageResourceLevel",
              "width": 25,
              "height": 16
            }
          ]
        },
        "y": 335.61,
        "x": 1029.49,
        "offsetY": 0,
        "height": 43.69,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 43.69,
        "y": 334.76,
        "width": 69.33,
        "x": 1028.63,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_F98E9261_F214_A505_41E9_1B645F7CE860_HS_15.png",
              "class": "ImageResourceLevel",
              "width": 69,
              "height": 43
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
      "id": "overlay_FE8871D8_F21D_E703_41E1_A7D00DB4AA97",
      "data": {
        "label": "Image"
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
          "toolTip": "Aturan Pemakaian Ruang Produksi",
          "click": "this.showPopupPanoramaOverlay(this.popup_EA12E675_FCDE_6C04_41B8_74476AEC6222, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_EA12E675_FCDE_6C04_41EF_37CE5657741E, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 9.69,
          "image": "this.AnimatedImageResource_223BEF0C_3D5E_D559_41C3_944893099768",
          "pitch": 15.03,
          "yaw": 9.38,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_26530317_3DB6_4D48_41CB_A04B8005AAAB",
      "maps": [
        {
          "hfov": 9.69,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 9.38,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 15.03
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EE4069_ED70_B150_41DE_8D514E981C75, this.camera_923CDF7B_AA7C_BB7F_41E1_8773DB4E5657); this.mainPlayList.set('selectedIndex', 10)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 22.25,
          "image": "this.AnimatedImageResource_95416498_A5D4_ADBA_41E4_338F07B473A0",
          "pitch": -39.19,
          "yaw": 19.64,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_97262363_A64C_A48E_41E3_931D09DAC89C",
      "maps": [
        {
          "hfov": 22.25,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 19.64,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -39.19
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F, this.camera_96C96E7D_AA7C_BD7A_41D4_22C3653433B3); this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 22.49,
          "image": "this.AnimatedImageResource_95414498_A5D4_ADBA_41D9_48E7F45E2100",
          "pitch": -38.44,
          "yaw": 113.7,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_966749F7_A64C_A776_41D6_E97A7BE09E75",
      "maps": [
        {
          "hfov": 22.49,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 113.7,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -38.44
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EF4BC9_ED70_B751_41DF_471345E94441, this.camera_96DDAE68_AA7C_BC99_41B3_2AD6E4E67EAF); this.mainPlayList.set('selectedIndex', 3)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.06,
          "image": "this.AnimatedImageResource_95413499_A5D4_ADBA_41D3_50A6CCFE8D23",
          "pitch": -53.55,
          "yaw": -155.26,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_93B4B793_A64C_EB8F_41CE_035D919EDC34",
      "maps": [
        {
          "hfov": 17.06,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -155.26,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -53.55
        }
      ]
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
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95DE2C56_AA7C_BC89_41D4_5AE8B5A54B2E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
      "media": "this.panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95DE2C56_AA7C_BC89_41D4_5AE8B5A54B2E"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95DDEC56_AA7C_BC89_41A7_E120587F9F94, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
      "media": "this.panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95DDEC56_AA7C_BC89_41A7_E120587F9F94"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95DD4C57_AA7C_BCB6_41D8_3256637D17EF, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
      "media": "this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95DD4C57_AA7C_BCB6_41D8_3256637D17EF"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95DC2C57_AA7C_BCB6_41C8_C1D177DA983A, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
      "media": "this.panorama_E1EF4BC9_ED70_B751_41DF_471345E94441",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95DC2C57_AA7C_BCB6_41C8_C1D177DA983A"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95D3BC58_AA7C_BCBA_41DA_A66E3CE33CCC, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
      "media": "this.panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95D3BC58_AA7C_BCBA_41DA_A66E3CE33CCC"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95D30C59_AA7C_BCBA_419B_68BF5C9BEAF4, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
      "media": "this.panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95D30C59_AA7C_BCBA_419B_68BF5C9BEAF4"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95D2FC59_AA7C_BCBA_41E2_508F18CECD5C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
      "media": "this.panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95D2FC59_AA7C_BCBA_41E2_508F18CECD5C"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95D24C59_AA7C_BCBA_41D5_1AD6DBC2DF13, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
      "media": "this.panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95D24C59_AA7C_BCBA_41D5_1AD6DBC2DF13"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95D1CC59_AA7C_BCBA_41BB_357B69A37023, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
      "media": "this.panorama_E1EA366B_ED70_9150_41E2_C0F604C64037",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95D1CC59_AA7C_BCBA_41BB_357B69A37023"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95D0BC5A_AA7C_BCBE_41E1_E5CA74963DA3, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
      "media": "this.panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95D0BC5A_AA7C_BCBE_41E1_E5CA74963DA3"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95D00C5B_AA7C_BCBE_41DF_E99E86A712C5, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
      "media": "this.panorama_E1EE4069_ED70_B150_41DE_8D514E981C75",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95D00C5B_AA7C_BCBE_41DF_E99E86A712C5"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95D7EC5B_AA7C_BCBE_41E2_6D0AB74B8739, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
      "media": "this.panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95D7EC5B_AA7C_BCBE_41E2_6D0AB74B8739"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95D74C5B_AA7C_BCBE_41CD_49CB5363CCA8, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 13)",
      "media": "this.panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95D74C5B_AA7C_BCBE_41CD_49CB5363CCA8"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95D6CC5C_AA7C_BCBA_4196_6AE8894BCDF3, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 13, 14)",
      "media": "this.panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95D6CC5C_AA7C_BCBA_4196_6AE8894BCDF3"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_95D72C5C_AA7C_BCBA_41DD_5E583E50554A, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 15)",
      "media": "this.panorama_E1E96E28_ED73_90DF_41CD_DB0322920492",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_95D72C5C_AA7C_BCBA_41DD_5E583E50554A"
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid95B1FC2D_AA7C_BC9A_41D6_6ADBB9D88136",
      "id": "viewer_uid95B1FC2D_AA7C_BC9A_41D6_6ADBB9D88136VideoPlayer",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_0_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 570.94,
        "x": 423.22,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 570.94,
        "width": 80,
        "x": 423.22,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_0.png",
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
      "id": "overlay_2547E28F_2A2C_31B9_41C3_05D83806409A",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_1_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1112.25,
        "x": 414.81,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1112.25,
        "width": 80,
        "x": 414.81,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_1.png",
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
      "id": "overlay_2559E290_2A2C_31A7_4192_7AA4BA858340",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_2_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1587.75,
        "x": 440.6,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1587.75,
        "width": 80,
        "x": 440.6,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_2.png",
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
      "id": "overlay_25592290_2A2C_31A7_41C3_F1DEFD030079",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_3_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 550.71,
        "x": 150,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 550.71,
        "width": 80,
        "x": 150,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_3.png",
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
      "id": "overlay_25593290_2A2C_31A7_41C2_071AE724B34E",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_4_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 516.52,
        "x": 1015.81,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 516.52,
        "width": 80,
        "x": 1015.81,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_4.png",
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
      "id": "overlay_25591290_2A2C_31A7_41B5_5609154E6E3A",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_5_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1043.59,
        "x": 939.32,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1043.59,
        "width": 80,
        "x": 939.32,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_5.png",
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
      "id": "overlay_25597290_2A2C_31A7_41B0_9E96758C9C1A",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_6_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 146.3,
        "x": 454.7,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 146.3,
        "width": 80,
        "x": 454.7,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_6.png",
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
      "id": "overlay_25595290_2A2C_31A7_41A9_408C452F16A2",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_7_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 257.26,
        "x": 81.48,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 257.26,
        "width": 80,
        "x": 81.48,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_7.png",
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
      "id": "overlay_255EB290_2A2C_31A7_41BF_8A02FF12B1A3",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_8_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 140.6,
        "x": 78.21,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 140.6,
        "width": 80,
        "x": 78.21,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_8.png",
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
      "id": "overlay_25586291_2A2C_31A9_4198_3389498285E9",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_9_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 37.18,
        "x": 73.65,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 37.18,
        "width": 80,
        "x": 73.65,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_9.png",
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
      "id": "overlay_25587291_2A2C_31A9_41BA_78313503050E",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_10_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 20.8,
        "x": 455.84,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 20.8,
        "width": 80,
        "x": 455.84,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_10.png",
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
      "id": "overlay_25584291_2A2C_31A9_41A6_3D9E95552055",
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
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_11_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 262.54,
        "x": 493.59,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 262.54,
        "width": 80,
        "x": 493.59,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3AADAED6_2A2C_31AB_4176_07414AC7F956_HS_11.png",
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
      "id": "overlay_2559B291_2A2C_31A9_418E_A34DBCC744EF",
      "data": {
        "label": "Image"
      }
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid95A76C4D_AA7C_BC9A_41DB_7BD1841FE68A",
      "id": "viewer_uid95A76C4D_AA7C_BC9A_41DB_7BD1841FE68AVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A.mp4"
      },
      "hfov": 18.62,
      "autoplay": true,
      "id": "overlay_E852D9D9_F91F_F9CB_41E9_66746F6B4998",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_E852D9D9_F91F_F9CB_41E9_66746F6B4998_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 5.41,
      "useHandCursor": true,
      "roll": -0.91,
      "yaw": -157.05,
      "rotationY": 6.66,
      "class": "VideoPanoramaOverlay",
      "rotationX": 0.16,
      "toolTip": "Klik untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_94A5E251_A584_8321_41DF_E5C6DAE1BE5C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_972B39B0_AA54_E789_41D8_81FC8D0D6568, this.video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A, this.PlayList_92063D96_AA7C_9FB6_41D3_6403BB9F57E5, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 10.5,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 5.23,
      "id": "popup_F6C8D65F_F917_4AC7_418F_B1DE853E9C81",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 9.64,
      "yaw": -169.14,
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
          "toolTip": "Tata-Tertib Penelitian Laboratorium",
          "click": "this.showPopupPanoramaOverlay(this.popup_E983843A_F911_4E49_41E9_C29B9A985460, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_EBEE0041_F911_C63B_41DD_C58C21F771C7, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 6.14,
          "image": "this.AnimatedImageResource_220EDF09_3D5E_D558_41BC_A4FDB6CF0410",
          "pitch": 18.86,
          "yaw": 103.2,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_27FBA263_3DBF_CFC8_4142_2E2B8C1A8E0C",
      "maps": [
        {
          "hfov": 6.14,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 103.2,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 18.86
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
          "click": "this.showPopupPanoramaOverlay(this.popup_F61EF34F_F911_CAC7_41D6_7E851A83410D, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_EBEB4044_F911_C639_41E3_4ECB24043090, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.34,
          "image": "this.AnimatedImageResource_220E9F09_3D5E_D558_41C7_D5CF16602895",
          "pitch": 15.75,
          "yaw": 128.27,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_20FECAEE_3DBE_5CD8_41C3_6075D19FC06C",
      "maps": [
        {
          "hfov": 5.34,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 128.27,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_10_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 15.75
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
          "toolTip": "Safety Rules",
          "click": "this.showPopupPanoramaOverlay(this.popup_F7B85619_F916_CA4B_41E1_EE3AF2CEC5A4, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_EBE85048_F911_C6C9_41E0_EA2E52FAE9D2, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 4.81,
          "image": "this.AnimatedImageResource_22013F09_3D5E_D558_41CD_92C12EA38C75",
          "pitch": 27.17,
          "yaw": -97.22,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_27A8687D_3DBE_BBB8_41C9_5C22992440EF",
      "maps": [
        {
          "hfov": 4.81,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -97.22,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_11_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 27.17
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
          "toolTip": "Tanggap Darurat",
          "click": "this.showPopupPanoramaOverlay(this.popup_886B8A06_A584_8323_41DD_FEC1D9AF4D2D, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_886BFA06_A584_8323_41C4_406DA7AACDD5, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.05,
          "image": "this.AnimatedImageResource_AB31FFEA_A59C_2116_41A8_46EF6163C03B",
          "pitch": 14.06,
          "yaw": 32.17,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_8B9D5A25_A584_8360_41C5_D09DA5381375",
      "maps": [
        {
          "hfov": 5.05,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 32.17,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_13_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 14.06
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
          "hfov": 23.48,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_14_0.png",
                "class": "ImageResourceLevel",
                "width": 787,
                "height": 1173
              }
            ]
          },
          "pitch": -5.75,
          "yaw": 95.99
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Alat Pelindung Diri (APD)"
        }
      ],
      "id": "overlay_8B284F1F_A585_8120_41D3_9CEBD20090AA",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 23.48,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 95.99,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_14_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 134,
                "height": 200
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
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_E1E96E28_ED73_90DF_41CD_DB0322920492, this.camera_9622ED51_AA7C_BC8A_416C_92D0B84B8610); this.mainPlayList.set('selectedIndex', 14)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.74,
          "image": "this.AnimatedImageResource_9544D492_A5D4_AD89_41C6_C43D89CC730E",
          "pitch": -25.59,
          "yaw": 2.46,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_8B84455D_A65B_6CBA_41D5_DFEDF21A2DDE",
      "maps": [
        {
          "hfov": 18.74,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 2.46,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_15_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -25.59
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
          "click": "this.mainPlayList.set('selectedIndex', 4)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.09,
          "image": "this.AnimatedImageResource_9544B492_A5D4_AD89_41E2_866B27324AEE",
          "pitch": -34.66,
          "yaw": 52.32,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_8B2FE6B7_A65B_ADF7_41D5_F911D3B2583D",
      "maps": [
        {
          "hfov": 17.09,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 52.32,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_16_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -34.66
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E, this.camera_965EBD6C_AA7C_BC9A_41CA_440CBBB24C71); this.mainPlayList.set('selectedIndex', 13)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.13,
          "image": "this.AnimatedImageResource_95447493_A5D4_AD8E_41DA_6B38AAD46CC7",
          "pitch": -22.95,
          "yaw": 98.78,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_891BAB42_A65B_6489_41E3_B9EC4B5B6D41",
      "maps": [
        {
          "hfov": 19.13,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 98.78,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_17_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -22.95
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776, this.camera_9654AD83_AA7C_BF8E_41DF_DF1CFD6EA3CD); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 22.84,
          "image": "this.AnimatedImageResource_95445493_A5D4_AD8E_41E3_F03D4AA2C60C",
          "pitch": -37.3,
          "yaw": -179.81,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_8AAA7DC9_A654_9F9A_41E1_34903377B18F",
      "maps": [
        {
          "hfov": 22.84,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -179.81,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_18_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -37.3
        }
      ]
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid95B45C3F_AA7C_BCF6_41D8_86517539F5BA",
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
        "name": "ViewerArea94794"
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
          "toolTip": "Aturan Pemakaian Ruang Produksi",
          "click": "this.showPopupPanoramaOverlay(this.popup_27DA84B4_3DB1_CB48_41B3_19B4EC74722B, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2D10A2D8_3F36_2806_41CC_116EB31C0285, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 02"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 12.51,
          "image": "this.AnimatedImageResource_2207FF0B_3D5E_D55F_41B1_C8BFAF1A43DD",
          "pitch": 21.15,
          "yaw": -58.84,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_26EC34FE_3DB1_D4B8_41B3_93A716BA797D",
      "maps": [
        {
          "hfov": 12.51,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -58.84,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 21.15
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
          "click": "this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 27.36,
          "image": "this.AnimatedImageResource_95430496_A5D4_ADB6_41A9_865D637001EE",
          "pitch": -17.66,
          "yaw": -129.19,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_96AF5F96_A655_9BB6_41C7_8C472F7BCA9A",
      "maps": [
        {
          "hfov": 27.36,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -129.19,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -17.66
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EE4069_ED70_B150_41DE_8D514E981C75, this.camera_92511027_AA7C_A497_41C6_C36A0F1BDAD9); this.mainPlayList.set('selectedIndex', 10)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.6,
          "image": "this.AnimatedImageResource_9540C496_A5D4_ADB6_41CD_EE61A545EAAA",
          "pitch": -54.68,
          "yaw": -89.15,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9564DB1F_A655_A4B6_41DE_69B1F8482068",
      "maps": [
        {
          "hfov": 16.6,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -89.15,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -54.68
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE, this.camera_924A8042_AA7C_A489_41C0_B5F95D332B27); this.mainPlayList.set('selectedIndex', 6)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.62,
          "image": "this.AnimatedImageResource_9540A496_A5D4_ADB6_41DC_08F2752707E0",
          "pitch": -44.1,
          "yaw": -155.26,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_92BAD66F_A655_6C96_41E2_20D10D5D2FF0",
      "maps": [
        {
          "hfov": 20.62,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -155.26,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -44.1
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
          "click": "this.mainPlayList.set('selectedIndex', 4)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 21.52,
          "image": "this.AnimatedImageResource_95409496_A5D4_ADB6_41CF_601DFAE9E6E2",
          "pitch": -41.46,
          "yaw": 110.68,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_97F805F6_A654_AF76_41AE_A0CBFFD66DEE",
      "maps": [
        {
          "hfov": 21.52,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 110.68,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -41.46
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
          "toolTip": "Aturan Pemakaian Ruang Produksi",
          "click": "this.showPopupPanoramaOverlay(this.popup_2067CEF0_3DB1_F4C8_418C_5D8DF6977B7B, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_23C1DF27_3D5E_D548_41BA_A2A30A0661BB, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 02"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 11.31,
          "image": "this.AnimatedImageResource_223AEF0D_3D5E_D55B_4195_99EAD86755B1",
          "pitch": 32.49,
          "yaw": -18.79,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_27D72624_3DB1_B748_41C2_F581335603C2",
      "maps": [
        {
          "hfov": 11.31,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -18.79,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 32.49
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69, this.camera_9246E073_AA7C_A48E_41D6_FA0F1F2B8922); this.mainPlayList.set('selectedIndex', 5)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.95,
          "image": "this.AnimatedImageResource_954ED499_A5D4_ADBA_41E4_E2CE1D0FC719",
          "pitch": -45.99,
          "yaw": 74.42,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9583A3AD_A64F_6B9B_41C6_4ED22FC05092",
      "maps": [
        {
          "hfov": 19.95,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 74.42,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -45.99
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
          "click": "this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 26.72,
          "image": "this.AnimatedImageResource_954EB499_A5D4_ADBA_41A1_8EF736A187E2",
          "pitch": -21.44,
          "yaw": 137.5,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_94A09A27_A64F_6497_41D2_BEF3029598AC",
      "maps": [
        {
          "hfov": 26.72,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 137.5,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0_HS_6_0_0_map.gif",
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301, this.camera_927E808C_AA7C_A599_41BF_71D7042F1C60); this.mainPlayList.set('selectedIndex', 9)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.18,
          "image": "this.AnimatedImageResource_954E6499_A5D4_ADBA_41DF_B5C9CF22E386",
          "pitch": -39.76,
          "yaw": 165.17,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_92BA23A0_A64F_AB8A_41CF_FB92C08F6FCD",
      "maps": [
        {
          "hfov": 20.18,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 165.17,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -39.76
        }
      ]
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid95BCBC23_AA7C_BC8F_41B0_18329BF3D9EC",
      "id": "viewer_uid95BCBC23_AA7C_BC8F_41B0_18329BF3D9ECVideoPlayer",
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
          "toolTip": "Aturan Pemakaian Ruang Produksi",
          "click": "this.showPopupPanoramaOverlay(this.popup_275BD730_3DB2_B549_4184_434D6E95CE15, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2D1702D3_3F36_280A_41B4_22956D694885, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 02"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 9.67,
          "image": "this.AnimatedImageResource_22022F0A_3D5E_D558_41B7_0F35938B5D3C",
          "pitch": 10.57,
          "yaw": 106.46,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2769574F_3DB2_B5D8_41C2_CA8DB5BC6112",
      "maps": [
        {
          "hfov": 9.67,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 106.46,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 10.57
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EA366B_ED70_9150_41E2_C0F604C64037, this.camera_96B5FE39_AA7C_BCFA_41C5_187C431E9B61); this.mainPlayList.set('selectedIndex', 8)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.13,
          "image": "this.AnimatedImageResource_95450493_A5D4_AD8E_41E2_29D77C0D1EE3",
          "pitch": -55.81,
          "yaw": -154.88,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_8A5D9F20_A654_9C8A_41D2_B86A829304AA",
      "maps": [
        {
          "hfov": 16.13,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -154.88,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -55.81
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301, this.camera_96A17E51_AA7C_BC8A_41CB_CB101FBE14F5); this.mainPlayList.set('selectedIndex', 9)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 24.24,
          "image": "this.AnimatedImageResource_9542C494_A5D4_AD8A_41D6_7E400A2A6C68",
          "pitch": -32.39,
          "yaw": 107.28,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_880EBC33_A654_9C8E_41A6_FEB38DB17D7A",
      "maps": [
        {
          "hfov": 24.24,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 107.28,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -32.39
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
          "click": "this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 23.61,
          "image": "this.AnimatedImageResource_9542A494_A5D4_AD8A_41E1_62C4B7C4124B",
          "pitch": -34.66,
          "yaw": 155.63,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9644EB65_A654_E48B_41D1_79DCE247A662",
      "maps": [
        {
          "hfov": 23.61,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 155.63,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -34.66
        }
      ]
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid95BCBC23_AA7C_BC8F_41B0_18329BF3D9EC",
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
        "name": "ViewerArea94792"
      }
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid95A76C4D_AA7C_BC9A_41DB_7BD1841FE68A",
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
        "name": "ViewerArea94796"
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
          "toolTip": "Aturan Pemakaian Ruang Produksi",
          "click": "this.showPopupPanoramaOverlay(this.popup_2616A777_3DB6_55C8_41C4_2256E447179F, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2D0C52D9_3F36_2806_41C7_D63F1DD3E21C, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 02"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 9.39,
          "image": "this.AnimatedImageResource_2239EF0C_3D5E_D559_41BE_371055459568",
          "pitch": 7.34,
          "yaw": 141.01,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_262B0795_3DB6_5548_41B5_7121F05BB4E8",
      "maps": [
        {
          "hfov": 9.39,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 141.01,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 7.34
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EA366B_ED70_9150_41E2_C0F604C64037, this.camera_9270D0A2_AA7C_A589_41CD_46CAB3BFE12A); this.mainPlayList.set('selectedIndex', 8)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.83,
          "image": "this.AnimatedImageResource_9540E497_A5D4_ADB6_41B4_46392E42A7F2",
          "pitch": -49.01,
          "yaw": 80.84,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_97076157_A64C_A4B6_41B4_D3E731DC3433",
      "maps": [
        {
          "hfov": 18.83,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 80.84,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -49.01
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
          "click": "this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 26.36,
          "image": "this.AnimatedImageResource_9540D497_A5D4_ADB6_41E1_9B3430F0B9F0",
          "pitch": -23.33,
          "yaw": 134.86,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9580CD06_A64C_9C96_41E0_AED1AA661F76",
      "maps": [
        {
          "hfov": 26.36,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 134.86,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -23.33
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE, this.camera_926820BA_AA7C_A5FE_41C1_212CEC255821); this.mainPlayList.set('selectedIndex', 6)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.48,
          "image": "this.AnimatedImageResource_95408497_A5D4_ADB6_41CC_5AEFB8019BA9",
          "pitch": -44.48,
          "yaw": 162.06,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_93D747C6_A64D_6B96_41DC_08963E56561D",
      "maps": [
        {
          "hfov": 20.48,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 162.06,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -44.48
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
          "toolTip": "Ruang Produksi",
          "click": "this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Pintu Ruang Produksi"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.4,
          "image": "this.AnimatedImageResource_245CA617_3DDE_5748_41C3_70975C797F48",
          "pitch": 1.04,
          "yaw": -175.47,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2AE72914_3DD2_5D48_41CB_111FC9F2FE1D",
      "maps": [
        {
          "hfov": 20.4,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -175.47,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 1.04
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
          "click": "this.showPopupPanoramaOverlay(this.popup_EC276EB9_F2EC_7D04_41DA_3DBBE4658BFC, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_ED2BF7D7_F26D_AB0D_41E3_9A11F1BA8E48, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 8.75,
          "image": "this.AnimatedImageResource_2205FF0A_3D5E_D558_41C6_97E109075EDF",
          "pitch": 44.71,
          "yaw": 163.59,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_208BA9CE_3DB3_DCD8_41BA_B53B11577E31",
      "maps": [
        {
          "hfov": 8.75,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 163.59,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 44.71
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A.mp4"
      },
      "hfov": 9.32,
      "autoplay": true,
      "id": "overlay_2721BDD6_3DAE_74C9_41C1_6A85CF164F11",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_2721BDD6_3DAE_74C9_41C1_6A85CF164F11_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 2.56,
      "useHandCursor": true,
      "roll": -0.97,
      "yaw": 34.05,
      "rotationY": 16.13,
      "class": "VideoPanoramaOverlay",
      "rotationX": 2.02,
      "toolTip": "Klik untuk Memnutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_8C2C3AE3_A587_80E0_41B0_3332D3C2FC83, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_9725C9B1_AA54_E78B_41E1_093F3064E476, this.video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A, this.PlayList_92066D96_AA7C_9FB6_41D6_4429583011A2, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 5.54,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 3.8,
      "id": "popup_2733DDAE_3DAE_7558_41C6_074640EA8E75",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 4.51,
      "yaw": 27.65,
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E, this.camera_962BAD35_AA7C_BC8B_41D5_4B67F6BBA4DB); this.mainPlayList.set('selectedIndex', 13)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 22.61,
          "image": "this.AnimatedImageResource_9543D495_A5D4_AD8B_41D4_2E7944A83E16",
          "pitch": -38.06,
          "yaw": 4.91,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_881445D2_A657_AF89_41D4_E9B41506AC23",
      "maps": [
        {
          "hfov": 22.61,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 4.91,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -38.06
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1E96E28_ED73_90DF_41CD_DB0322920492, this.camera_963EED18_AA7C_BCB9_41C3_DFC28CD3A5A8); this.mainPlayList.set('selectedIndex', 14)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 25.11,
          "image": "this.AnimatedImageResource_95438495_A5D4_AD8B_41DB_F908D07160A6",
          "pitch": -28.99,
          "yaw": 94.82,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9534EB7E_A654_BB76_41D6_E4BB87923C65",
      "maps": [
        {
          "hfov": 25.11,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 94.82,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0_HS_8_0_0_map.gif",
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
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 25.43,
          "image": "this.AnimatedImageResource_95AB5C40_AA7C_BC8A_41E1_3B09CFD9D197",
          "pitch": -41.15,
          "yaw": -179.45,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_96C4010D_AA7D_649A_41CF_59D754203228",
      "maps": [
        {
          "hfov": 25.43,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -179.45,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0_HS_10_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -41.15
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
      "width":  45.5,
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
      "iconURL": "skin/nonaktifkan_hotspot_button_pressed.png",
      "pressedRollOverIconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_pressed_rollover.png",
      "minWidth": 1,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "mode": "toggle",
      "toolTipTextShadowBlurRadius": 3,
      "height":  45.5,
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
      "maxWidth":  45.5,
      "data": {
        "name": "IconButton HS "
      },
      "toolTipTextShadowOpacity": 0
    },
    {
      "transparencyActive": true,
      "maxHeight":  45.5,
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
      "id": "viewer_uid95B1FC2D_AA7C_BC9A_41D6_6ADBB9D88136",
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
        "name": "ViewerArea94793"
      }
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 7.7,
      "id": "popup_EFACD4EC_FC76_6C04_41E7_45C343C448E8",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_EFACD4EC_FC76_6C04_41E7_45C343C448E8_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 29.18,
      "yaw": -75.43,
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
          "toolTip": "Aturan Pemakaian Ruang Produksi",
          "click": "this.showPopupPanoramaOverlay(this.popup_277F7AB5_3DAE_BF48_4168_37958A6E43A0, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_23C33F27_3D5E_D548_41C2_B20334F355B9, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 02"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 10.07,
          "image": "this.AnimatedImageResource_223DDF0D_3D5E_D55B_41BF_0C243BA6E7F7",
          "pitch": 27.29,
          "yaw": -77.06,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_26C8CD3C_3DAF_B5B8_41C1_377CD0DADC00",
      "maps": [
        {
          "hfov": 10.07,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -77.06,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 27.29
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
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 23.18,
          "image": "this.AnimatedImageResource_954E1499_A5D4_ADBA_41E0_ADEB1B9B443F",
          "pitch": -36.17,
          "yaw": 85.37,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_95EEEBDD_A64F_BBBA_41D0_F88D3170D5DE",
      "maps": [
        {
          "hfov": 23.18,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 85.37,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -36.17
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
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 21.26,
          "image": "this.AnimatedImageResource_954FC499_A5D4_ADBA_41D7_653E3CE38871",
          "pitch": -42.21,
          "yaw": -112.57,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_93A7798C_A64F_679A_41E2_4397C8E4E4D7",
      "maps": [
        {
          "hfov": 21.26,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -112.57,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -42.21
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F, this.camera_9243B05D_AA7C_A4BA_41B8_EFDE252CDAB1); this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 27.41,
          "image": "this.AnimatedImageResource_954FB499_A5D4_ADBA_41BF_36E88E13EE06",
          "pitch": -17.28,
          "yaw": -178.68,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_908F6404_A64C_AC89_41C0_1B42B00CEC89",
      "maps": [
        {
          "hfov": 27.41,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -178.68,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0_HS_7_0_0_map.gif",
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
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid95A16C4B_AA7C_BC9E_41B0_52C7925F041F",
      "id": "viewer_uid95A16C4B_AA7C_BC9E_41B0_52C7925F041FVideoPlayer",
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
          "toolTip": "Aturan Pemakaian Ruang Produksi",
          "click": "this.showPopupPanoramaOverlay(this.popup_2668ED48_3DB6_F5D8_41C1_5E9B4A035543, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_3012A316_3F36_280B_41C7_CD29950DE62E, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 02"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 13.24,
          "image": "this.AnimatedImageResource_22380F0C_3D5E_D559_41B7_1DFF7F73067D",
          "pitch": 9.07,
          "yaw": 60.16,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_267DDD66_3DB6_F5C8_41CB_2970C9A3DCD3",
      "maps": [
        {
          "hfov": 13.24,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 60.16,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 9.07
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F, this.camera_92241FFB_AA7C_BB7F_41C0_87E3872AD388); this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 25.2,
          "image": "this.AnimatedImageResource_95402498_A5D4_ADBA_41DC_D9E15BFB49CB",
          "pitch": -28.61,
          "yaw": 74.04,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_974FB305_A64D_E48A_41C1_8831F3DEFB0F",
      "maps": [
        {
          "hfov": 25.2,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 74.04,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -28.61
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EF4BC9_ED70_B751_41DF_471345E94441, this.camera_92208FE2_AA7C_BB89_41E4_0788FDE56632); this.mainPlayList.set('selectedIndex', 3)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.29,
          "image": "this.AnimatedImageResource_95401498_A5D4_ADBA_4175_EEAD35ABE622",
          "pitch": -55.44,
          "yaw": -6.04,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_95DB3CBA_A64D_9DFE_41D8_42270C1A1D98",
      "maps": [
        {
          "hfov": 16.29,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -6.04,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -55.44
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9, this.camera_925E0011_AA7C_A48B_41E1_101F2CE191EF); this.mainPlayList.set('selectedIndex', 7)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 12.7,
          "image": "this.AnimatedImageResource_9541C498_A5D4_ADBA_41CE_B9823521A1E1",
          "pitch": -63.75,
          "yaw": 168.1,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_93118918_A64D_A4B9_41B9_2CD6016C22B2",
      "maps": [
        {
          "hfov": 12.7,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 168.1,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -63.75
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A.mp4"
      },
      "hfov": 11.53,
      "autoplay": true,
      "id": "overlay_20C1C9E2_3D56_DCC8_41B8_2A43DF493DD0",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_20C1C9E2_3D56_DCC8_41B8_2A43DF493DD0_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 3.4,
      "useHandCursor": true,
      "roll": -0.1,
      "yaw": -169.23,
      "rotationY": -13.49,
      "class": "VideoPanoramaOverlay",
      "rotationX": -2.56,
      "toolTip": "Klik untuk Memnutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_8C1DFE00_A584_831F_41AD_820D4F63F2A8, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_9726D9B9_AA54_E7FB_41E3_0B99DA8E53F5, this.video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A, this.PlayList_92073D97_AA7C_9FB6_41BA_E2E22DFBC3F0, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 6.51,
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
          "toolTip": "Safety Rules",
          "click": "this.showPopupPanoramaOverlay(this.popup_21430BD0_3D5F_DCC9_41CD_44015B0EF558, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_21431BD1_3D5F_DCCB_41C3_509F345E25E7, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.83,
          "image": "this.AnimatedImageResource_22332F10_3D5E_D549_41CC_DE47325EB5BA",
          "pitch": 11.83,
          "yaw": -147.55,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_217E8BEF_3D5F_DCD8_41C6_F8BE318FCBA1",
      "maps": [
        {
          "hfov": 7.83,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -147.55,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 11.83
        }
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 6.11,
      "id": "popup_20D359C1_3D56_DCC8_41CC_6B8365D9ADA6",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 9.18,
      "yaw": -168.63,
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B, this.camera_96102CC6_AA7C_BD96_41D3_5F1D76A28937); this.mainPlayList.set('selectedIndex', 4)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 24.04,
          "image": "this.AnimatedImageResource_954A449C_A5D4_ADBB_41D6_268DC8286717",
          "pitch": -33.15,
          "yaw": 82.35,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_95D65DDE_A64D_9FB6_41E0_5C1568432927",
      "maps": [
        {
          "hfov": 24.04,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 82.35,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0_HS_5_0_0_map.gif",
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67, this.camera_96069CFB_AA7C_BD7E_41DD_17098229FAB6); this.mainPlayList.set('selectedIndex', 1)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 23.29,
          "image": "this.AnimatedImageResource_954A349D_A5D4_ADBA_41DD_9D8EE9E2C1BF",
          "pitch": -35.79,
          "yaw": 178.68,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_93856422_A64C_AC8E_41E3_41D1AF9CC7BF",
      "maps": [
        {
          "hfov": 23.29,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 178.68,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -35.79
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF, this.camera_960F8CDF_AA7C_BDB6_41BC_2F9F0B6CA48B); this.mainPlayList.set('selectedIndex', 12)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.08,
          "image": "this.AnimatedImageResource_954D849D_A5D4_ADBA_41BA_80EE7F75B89B",
          "pitch": -45.61,
          "yaw": -81.22,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_91FD53AA_A64C_EB9E_41D3_2682855A4325",
      "maps": [
        {
          "hfov": 20.08,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -81.22,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -45.61
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
          "hfov": 12.38,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0_HS_8_0.png",
                "class": "ImageResourceLevel",
                "width": 411,
                "height": 816
              }
            ]
          },
          "pitch": -3.66,
          "yaw": 131.82
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Alat Pelindung Diri (APD)"
        }
      ],
      "id": "overlay_95B6827C_A5D5_A57A_41D3_E77054028A48",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 12.38,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 131.82,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0_HS_8_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 100,
                "height": 200
              }
            ]
          },
          "pitch": -3.66
        }
      ]
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
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Safety Rules",
          "click": "this.showPopupPanoramaOverlay(this.popup_273D1BD0_3DB2_5CC9_41C8_3254B67358B7, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_273D6BD0_3DB2_5CC9_41C7_5391FB7053D3, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.32,
          "image": "this.AnimatedImageResource_223ECF0F_3D5E_D557_41C7_E957CEA57DF4",
          "pitch": 10.41,
          "yaw": -20.14,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2731BBEE_3DB2_5CD9_41C8_0B225C6C2DF6",
      "maps": [
        {
          "hfov": 5.32,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -20.14,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 10.41
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A.mp4"
      },
      "hfov": 13.03,
      "autoplay": true,
      "id": "overlay_27237AE6_3D56_5CC8_4192_DF138B78E270",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_27237AE6_3D56_5CC8_4192_DF138B78E270_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 3.84,
      "useHandCursor": true,
      "roll": -2.3,
      "yaw": -52.78,
      "rotationY": 30.14,
      "class": "VideoPanoramaOverlay",
      "rotationX": 0.43,
      "toolTip": "Klik untuk Memnutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_8CCB2360_A584_811F_41B4_5DC2E943A262, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_972429B2_AA54_E78E_41DD_91BDCB075D4F, this.video_F7832A71_F912_DADA_41D7_5C9D29F987EA, this.PlayList_92079D96_AA7C_9FB6_41E4_067FB6D0C704, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 7.53,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 7.73,
      "id": "popup_26B35F5F_3DB1_B5F7_41C7_AAA4731A77BC",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_26B35F5F_3DB1_B5F7_41C7_AAA4731A77BC_0_1.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 15.24,
      "yaw": 77.84,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 3.76,
      "id": "popup_273DEAC4_3D56_5CC8_41C5_6849297FCBD7",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 9.08,
      "yaw": -52.7,
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
          "toolTip": "Tanggap Darurat",
          "click": "this.showPopupPanoramaOverlay(this.popup_8B9AAF8F_A583_8121_41DA_D10BEEBB67AA, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_8B9B5F8F_A583_8121_41E1_33130C01B89F, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.39,
          "image": "this.AnimatedImageResource_AB211FFA_A59C_20F6_41BB_D56811673145",
          "pitch": 15,
          "yaw": 78.18,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_8BB39FBB_A583_8161_41AF_3D8CC51CCF56",
      "maps": [
        {
          "hfov": 5.39,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 78.18,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 15
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_7_00000.png",
                "class": "ImageResourceLevel",
                "width": 1892,
                "height": 1892
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_7_00001.png",
                "class": "ImageResourceLevel",
                "width": 1892,
                "height": 1892
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_7_00004.png",
                "class": "ImageResourceLevel",
                "width": 1892,
                "height": 1892
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_7_00005.png",
                "class": "ImageResourceLevel",
                "width": 1892,
                "height": 1892
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
          "toolTip": "Lemari Alat Pelindung Diri (APD)"
        }
      ],
      "id": "overlay_8B070BDB_A58C_8121_4182_31A2408DE7FA",
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_7_1_0_map.gif",
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_7_2_1_map.gif",
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_7_3_4_map.gif",
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
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_7_4_5_map.gif",
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776, this.camera_96BA3E22_AA7C_BC89_41E4_0F368B4FFAED); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 24.34,
          "image": "this.AnimatedImageResource_954D649C_A5D4_ADBA_41C8_CA9B1ED2B82A",
          "pitch": -32.01,
          "yaw": -58.17,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9649BF94_A64D_7B89_41D1_4F779B78B19F",
      "maps": [
        {
          "hfov": 24.34,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -58.17,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_8_0_0_map.gif",
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67, this.camera_968DEE0A_AA7C_BC9E_41DC_DF03D9BE6834); this.mainPlayList.set('selectedIndex', 1)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 24.74,
          "image": "this.AnimatedImageResource_954D549C_A5D4_ADBA_41DD_64D0842BF84B",
          "pitch": -30.5,
          "yaw": 9.07,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_940C2C94_A64D_BD89_41C6_1CDBF155A1F0",
      "maps": [
        {
          "hfov": 24.74,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 9.07,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_9_0_0_map.gif",
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
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B, this.camera_96927DF5_AA7C_BF8B_41E0_4C21145381FE); this.mainPlayList.set('selectedIndex', 4)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 24.74,
          "image": "this.AnimatedImageResource_954D049C_A5D4_ADBA_41E1_8AE3FD4E3FFE",
          "pitch": -30.5,
          "yaw": 86.13,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_91B69C14_A64D_FC89_41E0_9460B175C305",
      "maps": [
        {
          "hfov": 24.74,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 86.13,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_10_0_0_map.gif",
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
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Aturan Pemakaian Ruang Produksi",
          "click": "this.showPopupPanoramaOverlay(this.popup_260BD707_3DB1_D548_41CB_0BEDA58D3283, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2D1222D8_3F36_2806_41C3_88C5F04536D2, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 02"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 13.01,
          "image": "this.AnimatedImageResource_22061F0B_3D5E_D55F_41C3_E82ACA9867DA",
          "pitch": 13.98,
          "yaw": -137.79,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_26008725_3DB1_D54B_41C2_A912A990E14A",
      "maps": [
        {
          "hfov": 13.01,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -137.79,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 13.98
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69, this.camera_966A7DC8_AA7C_BF99_418F_AAC70CD451D3); this.mainPlayList.set('selectedIndex', 5)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 21.14,
          "image": "this.AnimatedImageResource_9543B497_A5D4_ADB6_41E4_1F0B8399AFDE",
          "pitch": -42.59,
          "yaw": -89.15,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_976C0AA1_A654_A58A_41D5_E638B9A077A6",
      "maps": [
        {
          "hfov": 21.14,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -89.15,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -42.59
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9, this.camera_96650DDF_AA7C_BFB7_41BD_6B2081792E41); this.mainPlayList.set('selectedIndex', 7)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 24.83,
          "image": "this.AnimatedImageResource_95439497_A5D4_ADB6_41E0_99490F60CFFA",
          "pitch": -30.13,
          "yaw": 80.84,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_91117D2A_A64B_BC9E_41C7_865FA62D26B5",
      "maps": [
        {
          "hfov": 24.83,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 80.84,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -30.13
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 21.52,
          "image": "this.AnimatedImageResource_95435497_A5D4_ADB6_41C3_F6ABC43364A2",
          "pitch": -41.46,
          "yaw": 145.81,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "mapColor": "#FF0000",
          "class": "HotspotPanoramaOverlayArea"
        }
      ],
      "id": "overlay_97FC6991_A64B_678A_41E1_F795F36CDBB5",
      "data": {
        "label": "Arrow 01b"
      },
      "maps": [
        {
          "hfov": 21.52,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 145.81,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -41.46
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
          "toolTip": "Aturan Pemakaian Ruang Produksi",
          "click": "this.showPopupPanoramaOverlay(this.popup_26EA2CA5_3DB2_BB48_41B6_5FBA13A427C7, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2D15C2D2_3F36_280A_41B3_F5356EDC2871, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Info 02"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 9.4,
          "image": "this.AnimatedImageResource_22032F0A_3D5E_D558_41B4_8EB538EF4005",
          "pitch": 12.56,
          "yaw": -111.72,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_26F1DCC6_3DB2_B4C9_41BD_9E6E44DA2D2D",
      "maps": [
        {
          "hfov": 9.4,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -111.72,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 12.56
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EA366B_ED70_9150_41E2_C0F604C64037, this.camera_9229BFB4_AA7C_BB8A_41E1_2D968461BA76); this.mainPlayList.set('selectedIndex', 8)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.43,
          "image": "this.AnimatedImageResource_9545F493_A5D4_AD8E_41E3_91DC37587C30",
          "pitch": -27.48,
          "yaw": 91.42,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_8A7F5FA3_A655_7B8E_41E1_6D664AFB77A7",
      "maps": [
        {
          "hfov": 18.43,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 91.42,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -27.48
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
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.17,
          "image": "this.AnimatedImageResource_9545A493_A5D4_AD8E_4182_9F01C524440D",
          "pitch": -28.99,
          "yaw": 11.33,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_887DEE84_A655_BD89_41E0_DC053E9CA353",
      "maps": [
        {
          "hfov": 18.17,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 11.33,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0_HS_6_0_0_map.gif",
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
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2, this.camera_9235BF9E_AA7C_BBB6_41D4_76B19774F580); this.mainPlayList.set('selectedIndex', 11)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.02,
          "image": "this.AnimatedImageResource_95458493_A5D4_AD8E_41BE_8B61BCEED123",
          "pitch": -23.7,
          "yaw": -86.13,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_95DF0C22_A655_FC8E_41A6_B4AFA4823933",
      "maps": [
        {
          "hfov": 19.02,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -86.13,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0_HS_7_0_0_map.gif",
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301, this.camera_922ECFCB_AA7C_BB9F_41D6_75A6E0781DC7); this.mainPlayList.set('selectedIndex', 9)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.27,
          "image": "this.AnimatedImageResource_95454493_A5D4_AD8E_41DF_94A185248A48",
          "pitch": -38.44,
          "yaw": 177.92,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_89B0B9FF_A655_A776_41D6_6B651AE325C4",
      "maps": [
        {
          "hfov": 16.27,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 177.92,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -38.44
        }
      ]
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid95A16C4B_AA7C_BC9E_41B0_52C7925F041F",
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
        "name": "ViewerArea94795"
      }
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A.mp4"
      },
      "hfov": 44.16,
      "autoplay": true,
      "id": "overlay_E9217B3F_F911_BA47_41CA_218E794F46BF",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_E9217B3F_F911_BA47_41CA_218E794F46BF_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 13.78,
      "useHandCursor": true,
      "roll": -11.5,
      "yaw": -134.56,
      "rotationY": 37.73,
      "class": "VideoPanoramaOverlay",
      "rotationX": -13.78,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_94898D26_A58D_8163_41A8_AD65E002FD71, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_972839AA_AA54_E799_41C5_D170A5EFC8DF, this.video_E92EB0F8_F91F_47C9_41E0_C2BEF4D13E7A, this.PlayList_9206FD94_AA7C_9F8A_41E4_8F98DBB6DDFB, '95%', '95%', true, true) }",
      "videoVisibleOnStop": false,
      "data": {
        "label": "Video"
      },
      "vfov": 25.72,
      "distance": 50
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 13.4,
          "image": "this.AnimatedImageResource_245A0614_3DDE_5748_41B5_E2D493A8E515",
          "pitch": -2.46,
          "yaw": 93.02,
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
          "click": "this.openLink('../index.htm?media-name=IMG_20260427_113852_00_004', '_self')"
        }
      ],
      "id": "overlay_2AC3C313_3DD1_CD48_41BE_32DC0BB7CF34",
      "data": {
        "label": "Pintu Keluar"
      },
      "maps": [
        {
          "hfov": 13.4,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 93.02,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -2.46
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
          "toolTip": "Safety Rules",
          "click": "this.showPopupPanoramaOverlay(this.popup_2604D2FA_3DBE_4CB8_41A7_FC22C147E81B, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2604C2FA_3DBE_4CB8_41B3_C2C9A554C9F3, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 8.11,
          "image": "this.AnimatedImageResource_220DCF05_3D5E_D548_41C9_4B16FABE46D5",
          "pitch": 24.17,
          "yaw": -67.25,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2617B318_3DBE_4D78_41BB_058ED7E246EE",
      "maps": [
        {
          "hfov": 8.11,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -67.25,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 24.17
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
          "click": "this.showPopupPanoramaOverlay(this.popup_F4B90B36_FB9B_AB99_41E3_4229E714F0C9, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_F4B92B36_FB9B_AB99_41C8_522AD82EB040, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.27,
          "image": "this.AnimatedImageResource_220DBF05_3D5E_D548_41C1_639AE8400B4E",
          "pitch": 19.12,
          "yaw": 79.93,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_20DD70BD_3DB2_4CBB_418C_7CF2A53EA3A4",
      "maps": [
        {
          "hfov": 5.27,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 79.93,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 19.12
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
          "toolTip": "Tata-Tertib Penelitian Laboratorium",
          "click": "this.showPopupPanoramaOverlay(this.popup_F4B9FB36_FB9B_AB99_41DA_67C0DDD41003, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_F4B9EB36_FB9B_AB99_41EA_265F453B91D2, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.83,
          "image": "this.AnimatedImageResource_220C7F05_3D5E_D548_41C2_009CB1EE70D9",
          "pitch": 17.59,
          "yaw": 53.75,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_278B666F_3DB2_F7D7_41C3_A57747B1FAEA",
      "maps": [
        {
          "hfov": 5.83,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 53.75,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 17.59
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 29.58,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_10_0.png",
                "class": "ImageResourceLevel",
                "width": 994,
                "height": 155
              }
            ]
          },
          "pitch": -10.54,
          "yaw": 98.58,
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
      "id": "overlay_8235577A_A59C_81E0_41CC_124E83790787",
      "data": {
        "label": "Pintu Keluar"
      },
      "maps": [
        {
          "hfov": 29.58,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 98.58,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_10_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 102,
                "height": 16
              }
            ]
          },
          "pitch": -10.54
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
          "toolTip": "Tanggap Darurat",
          "click": "this.showPopupPanoramaOverlay(this.popup_8DF20275_A584_83E1_41B0_B6F405B12F7A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_8DF21275_A584_83E1_41E0_DC703EE2F23C, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 3.95,
          "image": "this.AnimatedImageResource_AB34CFE9_A59C_2112_41C3_27CCA8F8C52E",
          "pitch": 8.78,
          "yaw": 12.62,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_8DFDB2A0_A584_831F_41E3_9FCB7F513217",
      "maps": [
        {
          "hfov": 3.95,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 12.62,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_11_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 8.78
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
          "hfov": 18.6,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_12_0.png",
                "class": "ImageResourceLevel",
                "width": 620,
                "height": 923
              }
            ]
          },
          "pitch": -4.3,
          "yaw": 48.14
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Lemari Alat Pelindung Diri (APD)"
        }
      ],
      "id": "overlay_960652D6_A584_8320_41E2_FEEBC69B4291",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 18.6,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 48.14,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_12_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 134,
                "height": 200
              }
            ]
          },
          "pitch": -4.3
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67, this.camera_96412D9B_AA7C_BFBF_41E2_8EFB54DC1EB8); this.mainPlayList.set('selectedIndex', 1)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.97,
          "image": "this.AnimatedImageResource_9546748F_A5D4_AD96_41D3_5836BF606C06",
          "pitch": -30.13,
          "yaw": -6.42,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_8D41BFF6_A65D_7B76_41D1_C2E7AEFE5FBD",
      "maps": [
        {
          "hfov": 17.97,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -6.42,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_13_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -30.13
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
          "click": "this.startPanoramaWithCamera(this.panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E, this.camera_967D1DB0_AA7C_BF89_41E1_3C9A67AC8046); this.mainPlayList.set('selectedIndex', 13)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.39,
          "image": "this.AnimatedImageResource_95462490_A5D4_AD8A_41D9_8811A2513F1D",
          "pitch": -21.06,
          "yaw": 47.03,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_8BF1D7B7_A65C_ABF7_41B6_9CE8BC2BE4CE",
      "maps": [
        {
          "hfov": 19.39,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 47.03,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_14_0_0_map.gif",
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
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid95B45C3F_AA7C_BCF6_41D8_86517539F5BA",
      "id": "viewer_uid95B45C3F_AA7C_BCF6_41D8_86517539F5BAVideoPlayer",
      "displayPlaybackBar": true
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
      "id": "Image_832BB3C6_A59C_8120_41D7_698AF5212ED8",
      "left": "0%",
      "paddingRight": 0,
      "paddingLeft": 0,
      "borderSize": 0,
      "url": "skin/Image_832BB3C6_A59C_8120_41D7_698AF5212ED8.png",
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
        "name": "tittlelabfisika"
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
      "frameCount": 24,
      "frameDuration": 41,
      "colCount": 4,
      "id": "AnimatedImageResource_223CCF0E_3D5E_D559_41CC_9A2304C2B6BF",
      "levels": [
        {
          "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0_HS_1_0.png",
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
      "id": "AnimatedImageResource_954F049B_A5D4_ADBF_41DF_9CAFB78F25A9",
      "levels": [
        {
          "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0_HS_3_0.png",
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
      "id": "AnimatedImageResource_954CF49B_A5D4_ADBF_41A6_4D4971DC487D",
      "levels": [
        {
          "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_954CD49B_A5D4_ADBF_41CB_62F81E078652",
      "levels": [
        {
          "url": "media/panorama_E1EEFF86_ED73_8FD3_41D6_17AB9E585FFF_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_223BEF0C_3D5E_D559_41C3_944893099768",
      "levels": [
        {
          "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_95416498_A5D4_ADBA_41E4_338F07B473A0",
      "levels": [
        {
          "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_95414498_A5D4_ADBA_41D9_48E7F45E2100",
      "levels": [
        {
          "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_95413499_A5D4_ADBA_41D3_50A6CCFE8D23",
      "levels": [
        {
          "url": "media/panorama_E1EF1B2B_ED70_B0D0_41DC_C979CFD19301_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_220EDF09_3D5E_D558_41BC_A4FDB6CF0410",
      "levels": [
        {
          "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_9_0.png",
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
      "id": "AnimatedImageResource_220E9F09_3D5E_D558_41C7_D5CF16602895",
      "levels": [
        {
          "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_10_0.png",
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
      "id": "AnimatedImageResource_22013F09_3D5E_D558_41CD_92C12EA38C75",
      "levels": [
        {
          "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_11_0.png",
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
      "id": "AnimatedImageResource_AB31FFEA_A59C_2116_41A8_46EF6163C03B",
      "levels": [
        {
          "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_13_0.png",
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
      "id": "AnimatedImageResource_9544D492_A5D4_AD89_41C6_C43D89CC730E",
      "levels": [
        {
          "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_15_0.png",
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
      "id": "AnimatedImageResource_9544B492_A5D4_AD89_41E2_866B27324AEE",
      "levels": [
        {
          "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_16_0.png",
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
      "id": "AnimatedImageResource_95447493_A5D4_AD8E_41DA_6B38AAD46CC7",
      "levels": [
        {
          "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_17_0.png",
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
      "id": "AnimatedImageResource_95445493_A5D4_AD8E_41E3_F03D4AA2C60C",
      "levels": [
        {
          "url": "media/panorama_E1ED9392_ED73_97F3_41D8_C764C2FF9C67_0_HS_18_0.png",
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
      "id": "AnimatedImageResource_2207FF0B_3D5E_D55F_41B1_C8BFAF1A43DD",
      "levels": [
        {
          "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_95430496_A5D4_ADB6_41A9_865D637001EE",
      "levels": [
        {
          "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_9540C496_A5D4_ADB6_41CD_EE61A545EAAA",
      "levels": [
        {
          "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_9540A496_A5D4_ADB6_41DC_08F2752707E0",
      "levels": [
        {
          "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_95409496_A5D4_ADB6_41CF_601DFAE9E6E2",
      "levels": [
        {
          "url": "media/panorama_E1EA56BA_ED70_9133_41C1_634D33BA1B69_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_223AEF0D_3D5E_D55B_4195_99EAD86755B1",
      "levels": [
        {
          "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_954ED499_A5D4_ADBA_41E4_E2CE1D0FC719",
      "levels": [
        {
          "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_954EB499_A5D4_ADBA_41A1_8EF736A187E2",
      "levels": [
        {
          "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_954E6499_A5D4_ADBA_41DF_B5C9CF22E386",
      "levels": [
        {
          "url": "media/panorama_E1EE4069_ED70_B150_41DE_8D514E981C75_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_22022F0A_3D5E_D558_41B7_0F35938B5D3C",
      "levels": [
        {
          "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_95450493_A5D4_AD8E_41E2_29D77C0D1EE3",
      "levels": [
        {
          "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_9542C494_A5D4_AD8A_41D6_7E400A2A6C68",
      "levels": [
        {
          "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_9542A494_A5D4_AD8A_41E1_62C4B7C4124B",
      "levels": [
        {
          "url": "media/panorama_E1EF4BC9_ED70_B751_41DF_471345E94441_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_2239EF0C_3D5E_D559_41BE_371055459568",
      "levels": [
        {
          "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0_HS_3_0.png",
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
      "id": "AnimatedImageResource_9540E497_A5D4_ADB6_41B4_46392E42A7F2",
      "levels": [
        {
          "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_9540D497_A5D4_ADB6_41E1_9B3430F0B9F0",
      "levels": [
        {
          "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_95408497_A5D4_ADB6_41CC_5AEFB8019BA9",
      "levels": [
        {
          "url": "media/panorama_E1EBC142_ED70_F353_41E1_ADA673B2D5E9_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_245CA617_3DDE_5748_41C3_70975C797F48",
      "levels": [
        {
          "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_2205FF0A_3D5E_D558_41C6_97E109075EDF",
      "levels": [
        {
          "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_9543D495_A5D4_AD8B_41D4_2E7944A83E16",
      "levels": [
        {
          "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_95438495_A5D4_AD8B_41DB_F908D07160A6",
      "levels": [
        {
          "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_95AB5C40_AA7C_BC8A_41E1_3B09CFD9D197",
      "levels": [
        {
          "url": "media/panorama_E1EE2130_ED70_B330_41EC_5E88196D3B2B_0_HS_10_0.png",
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
      "id": "AnimatedImageResource_223DDF0D_3D5E_D55B_41BF_0C243BA6E7F7",
      "levels": [
        {
          "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_954E1499_A5D4_ADBA_41E0_ADEB1B9B443F",
      "levels": [
        {
          "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_954FC499_A5D4_ADBA_41D7_653E3CE38871",
      "levels": [
        {
          "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_954FB499_A5D4_ADBA_41BF_36E88E13EE06",
      "levels": [
        {
          "url": "media/panorama_E1EDB562_ED70_9353_41ED_8DE1A78E08D2_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_22380F0C_3D5E_D559_41B7_1DFF7F73067D",
      "levels": [
        {
          "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0_HS_3_0.png",
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
      "id": "AnimatedImageResource_95402498_A5D4_ADBA_41DC_D9E15BFB49CB",
      "levels": [
        {
          "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_95401498_A5D4_ADBA_4175_EEAD35ABE622",
      "levels": [
        {
          "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_9541C498_A5D4_ADBA_41CE_B9823521A1E1",
      "levels": [
        {
          "url": "media/panorama_E1EA366B_ED70_9150_41E2_C0F604C64037_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_22332F10_3D5E_D549_41CC_DE47325EB5BA",
      "levels": [
        {
          "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_954A449C_A5D4_ADBB_41D6_268DC8286717",
      "levels": [
        {
          "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_954A349D_A5D4_ADBA_41DD_9D8EE9E2C1BF",
      "levels": [
        {
          "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_954D849D_A5D4_ADBA_41BA_80EE7F75B89B",
      "levels": [
        {
          "url": "media/panorama_E1E96E28_ED73_90DF_41CD_DB0322920492_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_223ECF0F_3D5E_D557_41C7_E957CEA57DF4",
      "levels": [
        {
          "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_AB211FFA_A59C_20F6_41BB_D56811673145",
      "levels": [
        {
          "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_954D649C_A5D4_ADBA_41C8_CA9B1ED2B82A",
      "levels": [
        {
          "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_954D549C_A5D4_ADBA_41DD_64D0842BF84B",
      "levels": [
        {
          "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_9_0.png",
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
      "id": "AnimatedImageResource_954D049C_A5D4_ADBA_41E1_8AE3FD4E3FFE",
      "levels": [
        {
          "url": "media/panorama_E1EF1479_ED73_9130_41D3_6188DE9EC37E_0_HS_10_0.png",
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
      "id": "AnimatedImageResource_22061F0B_3D5E_D55F_41C3_E82ACA9867DA",
      "levels": [
        {
          "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0_HS_3_0.png",
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
      "id": "AnimatedImageResource_9543B497_A5D4_ADB6_41E4_1F0B8399AFDE",
      "levels": [
        {
          "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_95439497_A5D4_ADB6_41E0_99490F60CFFA",
      "levels": [
        {
          "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_95435497_A5D4_ADB6_41C3_F6ABC43364A2",
      "levels": [
        {
          "url": "media/panorama_E1EA4BF7_ED70_F731_41D2_C90E7CCED4AE_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_22032F0A_3D5E_D558_41B4_8EB538EF4005",
      "levels": [
        {
          "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_9545F493_A5D4_AD8E_41E3_91DC37587C30",
      "levels": [
        {
          "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_9545A493_A5D4_AD8E_4182_9F01C524440D",
      "levels": [
        {
          "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_95458493_A5D4_AD8E_41BE_8B61BCEED123",
      "levels": [
        {
          "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_95454493_A5D4_AD8E_41DF_94A185248A48",
      "levels": [
        {
          "url": "media/panorama_E1EBD6AF_ED70_91D1_41D9_A6C4FDC1869F_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_245A0614_3DDE_5748_41B5_E2D493A8E515",
      "levels": [
        {
          "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_220DCF05_3D5E_D548_41C9_4B16FABE46D5",
      "levels": [
        {
          "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_220DBF05_3D5E_D548_41C1_639AE8400B4E",
      "levels": [
        {
          "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_220C7F05_3D5E_D548_41C2_009CB1EE70D9",
      "levels": [
        {
          "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_AB34CFE9_A59C_2112_41C3_27CCA8F8C52E",
      "levels": [
        {
          "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_11_0.png",
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
      "id": "AnimatedImageResource_9546748F_A5D4_AD96_41D3_5836BF606C06",
      "levels": [
        {
          "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_13_0.png",
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
      "id": "AnimatedImageResource_95462490_A5D4_AD8A_41D9_8811A2513F1D",
      "levels": [
        {
          "url": "media/panorama_E1EFA92E_ED73_F0D3_41E6_966D7CB40776_0_HS_14_0.png",
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
      "click": "this.showPopupImage(this.ImageResource_BCBF5ECD_A65D_7D9A_419A_80C1B718A42E, null, '90%', '90%', this.FadeInEffect_BCBF7ECD_A65D_7D9A_41CD_7EE3F04E8F06, this.FadeOutEffect_BCBF8ECD_A65D_7D9A_41DB_E0E354146430, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
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

