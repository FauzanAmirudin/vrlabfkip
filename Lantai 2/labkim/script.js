(function () {
  var script = {
    "mouseWheelEnabled": true,
    "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7,this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250], 'cardboardAvailable'); this.playList_91C6E30F_AA55_E497_41E0_78E47BFA1772.set('selectedIndex', 0); this.playList_91C6D30F_AA55_E497_41A2_6E796CE0CF74.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081].forEach(function(component) { component.set('visible', false); }) }",
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
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 3.44,
      "id": "popup_9EEBA9A1_A5BC_E78B_41E1_FECA87A60F67",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_9EEBA9A1_A5BC_E78B_41E1_FECA87A60F67_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 576
          }
        ]
      },
      "pitch": 4.53,
      "yaw": -112.59,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -82.16,
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
      "id": "camera_926C1460_AA55_EC89_415C_A8559164EFF0"
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
      "id": "panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_camera"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_E4ED1EA6_A5CC_9D89_41E2_EF8521DD1C96",
      "levels": [
        {
          "url": "media/popup_E543C5C9_A5D5_AF9B_41D9_80294CA85573_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1055,
          "height": 1491
        },
        {
          "url": "media/popup_E543C5C9_A5D5_AF9B_41D9_80294CA85573_0_1.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_E543C5C9_A5D5_AF9B_41D9_80294CA85573_0_2.png",
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
      "id": "panorama_0A38AE77_0189_C110_4171_BE63086A2049_camera"
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
      "id": "panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -29.09,
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
      "id": "camera_9212B3D9_AA55_EBBA_41C3_548AEAB4F2EF"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'free_drag_and_rotation')",
          "class": "MapPlayListItem",
          "media": "this.map_3DDC1625_2A24_10E9_41BB_9517D7DADA17",
          "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
        }
      ],
      "id": "playList_91C6D30F_AA55_E497_41A2_6E796CE0CF74"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_1503A013_035A_1D32_4174_75F4FD0346D9",
      "levels": [
        {
          "url": "media/popup_169B29D7_035A_6F32_4160_89030C356E9A_0_0.jpeg",
          "class": "ImageResourceLevel",
          "width": 1600,
          "height": 1560
        },
        {
          "url": "media/popup_169B29D7_035A_6F32_4160_89030C356E9A_0_1.jpeg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 998
        },
        {
          "url": "media/popup_169B29D7_035A_6F32_4160_89030C356E9A_0_2.jpeg",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 499
        }
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid91C81308_AA55_E499_41E0_B05489907723VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_E030E033_A5D5_E48F_41E4_86F8E4C6D748, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_E030E033_A5D5_E48F_41E4_86F8E4C6D748, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid91C81308_AA55_E499_41E0_B05489907723VideoPlayer)",
          "media": "this.video_150CD3E8_0356_631E_4181_C938348D61F8",
          "player": "this.viewer_uid91C81308_AA55_E499_41E0_B05489907723VideoPlayer"
        }
      ],
      "id": "PlayList_E030E033_A5D5_E48F_41E4_86F8E4C6D748"
    },
    {
      "class": "PlayList",
      "items": [
        "this.PanoramaPlayListItem_91C13310_AA55_E48A_41D4_98614B3D47E6",
        "this.PanoramaPlayListItem_91C1A311_AA55_E48B_41CC_F2875902C5C4",
        "this.PanoramaPlayListItem_91C07311_AA55_E48B_41DF_014FE8B64FBB",
        "this.PanoramaPlayListItem_91C0C312_AA55_E48E_41D9_71782736500C",
        "this.PanoramaPlayListItem_91C08312_AA55_E48E_41DA_B78613314287",
        "this.PanoramaPlayListItem_91C35312_AA55_E48E_41E1_2BD9632B89C6",
        "this.PanoramaPlayListItem_91C1A312_AA55_E48E_41DB_5AE0DCC63DA6",
        "this.PanoramaPlayListItem_91C07313_AA55_E48E_4190_DE5E9F0EECEA",
        "this.PanoramaPlayListItem_91C0C313_AA55_E48E_41E1_FE718233C408",
        "this.PanoramaPlayListItem_91C09313_AA55_E48E_41DF_828E80D22AB4",
        "this.PanoramaPlayListItem_91C36313_AA55_E48E_41E3_9303DADE6488",
        "this.PanoramaPlayListItem_91C32314_AA55_E48A_41E4_5962C731B18C",
        "this.PanoramaPlayListItem_91C3F314_AA55_E48A_41E4_2C4709E7B1F9",
        "this.PanoramaPlayListItem_91C24314_AA55_E48A_41A7_FB8C15BFBED1"
      ],
      "id": "mainPlayList"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 5.52,
      "id": "popup_B371A170_A584_81E0_41D5_9AE47427318B",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_B371A170_A584_81E0_41D5_9AE47427318B_0_1.jpeg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 998
          }
        ]
      },
      "pitch": 2.64,
      "yaw": 39.49,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 8.34,
      "id": "popup_B1CA27B8_A584_8160_41D2_2C9D47988006",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_B1CA27B8_A584_8160_41D2_2C9D47988006_0_1.jpeg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 998
          }
        ]
      },
      "pitch": 1.24,
      "yaw": 143.31,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 153.56,
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
      "id": "camera_9225E3E9_AA55_EB9A_41DD_9DC4E925129E"
    },
    {
      "fieldOfViewOverlayOutsideOpacity": 0,
      "label": "bigmap",
      "id": "map_3DDC1625_2A24_10E9_41BB_9517D7DADA17",
      "minimumZoomFactor": 0.5,
      "thumbnailUrl": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_t.png",
      "width": 1667,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17.png",
            "class": "ImageResourceLevel",
            "width": 1667,
            "height": 2000
          },
          {
            "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_lq.png",
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
      "height": 2000,
      "overlays": [
        "this.overlay_3D0AA09F_2A27_F1D8_41B1_4D440A082F95",
        "this.overlay_3D0AE09F_2A27_F1D8_4196_52C64E03E63B",
        "this.overlay_3D0AF09F_2A27_F1D8_4192_84852342FBF0",
        "this.overlay_3D0B20A0_2A27_F1E8_41B1_8AEF790943FE",
        "this.overlay_3D0B30A0_2A27_F1E8_41B1_AFF8760D72F5",
        "this.overlay_3D0B70A0_2A27_F1E8_41B5_E4AD7430FC2C",
        "this.overlay_3D0B90A0_2A27_F1E8_41B6_6CBC6BAF40CA",
        "this.overlay_3D0BA0A0_2A27_F1E8_41A6_B1F7FE65F80C",
        "this.overlay_3D0BC0A0_2A27_F1E8_41BD_731434AE7DC3",
        "this.overlay_3D0BD0A0_2A27_F1E8_41AD_AD7EE220DD52",
        "this.overlay_3D0BE0A0_2A27_F1E8_41BB_9C71CAC6D0B8",
        "this.overlay_3D0800A0_2A27_F1E8_41C3_DC4CE68A5443",
        "this.overlay_3D0B40A0_2A27_F1E8_41C0_066151552EB2",
        "this.overlay_91324AD2_8BFB_ED0E_41C7_2A775C61640E"
      ]
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
      "class": "ImageResource",
      "id": "ImageResource_E60784C1_A5CB_AD8A_41D1_3B05E7887F47",
      "levels": [
        {
          "url": "media/popup_E60794C1_A5CB_AD8A_41B1_0061B7A38CB6_0_0.png",
          "class": "ImageResourceLevel",
          "width": 2121,
          "height": 3000
        },
        {
          "url": "media/popup_E60794C1_A5CB_AD8A_41B1_0061B7A38CB6_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1447,
          "height": 2048
        },
        {
          "url": "media/popup_E60794C1_A5CB_AD8A_41B1_0061B7A38CB6_0_2.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_E60794C1_A5CB_AD8A_41B1_0061B7A38CB6_0_3.png",
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
      "hfov": 6.32,
      "id": "popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_1.png",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 883
          }
        ]
      },
      "pitch": 3.71,
      "yaw": 53.51,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -106.53,
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
      "id": "camera_929C74C8_AA55_ED9A_41E4_41FED720906A"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 12.26,
      "id": "popup_169B29D7_035A_6F32_4160_89030C356E9A",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_169B29D7_035A_6F32_4160_89030C356E9A_0_1.jpeg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 998
          }
        ]
      },
      "pitch": 4.92,
      "yaw": 155.3,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_EFCCC03C_A5D5_E4FA_41E0_CD798C4D61CC",
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
      "class": "ImageResource",
      "id": "ImageResource_1AF37B3B_0356_6372_4181_4F4AD783FE1C",
      "levels": [
        {
          "url": "media/popup_1550B851_03D6_6D0E_4186_1652BA1940D3_0_0.jpg",
          "class": "ImageResourceLevel",
          "width": 3840,
          "height": 2160
        },
        {
          "url": "media/popup_1550B851_03D6_6D0E_4186_1652BA1940D3_0_1.jpg",
          "class": "ImageResourceLevel",
          "width": 2048,
          "height": 1152
        },
        {
          "url": "media/popup_1550B851_03D6_6D0E_4186_1652BA1940D3_0_2.jpg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 576
        },
        {
          "url": "media/popup_1550B851_03D6_6D0E_4186_1652BA1940D3_0_3.jpg",
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
        "yaw": -120.13,
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
      "id": "camera_920F139C_AA55_EBBA_41B7_CD34DC5DB321"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 14.01,
      "id": "popup_17DA680E_0356_2D12_4172_1C397EC042BE",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_17DA680E_0356_2D12_4172_1C397EC042BE_0_1.jpeg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 998
          }
        ]
      },
      "pitch": 6.24,
      "yaw": -68.14,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 6.27,
      "id": "popup_1543AE85_037E_6516_415B_C3F001C9EB53",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_1543AE85_037E_6516_415B_C3F001C9EB53_0_2.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 8.97,
      "yaw": 25.86,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 26.06,
      "autoplay": true,
      "id": "popup_B2056AFE_A5B4_FBB1_4195_89B0D3BB02EA",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 1.42,
      "yaw": -97.84,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      }
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 6.97,
      "id": "popup_168CD1FF_037A_1EF1_4182_BBDFB953060B",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_168CD1FF_037A_1EF1_4182_BBDFB953060B_0_1.jpeg",
            "class": "ImageResourceLevel",
            "width": 781,
            "height": 1024
          }
        ]
      },
      "pitch": 6.04,
      "yaw": 12.21,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -170.56,
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
      "id": "camera_92EE854F_AA55_EC96_41E1_34240F9CE6F8"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 30.19,
      "autoplay": true,
      "id": "popup_B3A03CEC_A5BC_7FD1_41CF_3A36B6DB932C",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 2.55,
      "yaw": 31.54,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      }
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
      "id": "panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_camera"
    },
    {
      "class": "FadeOutEffect",
      "duration": 500,
      "id": "FadeOutEffect_EFCCB03C_A5D5_E4FA_4194_14D16AAD323C",
      "easing": "cubic_out"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 21.53,
      "autoplay": true,
      "id": "popup_B22EF102_A5B5_A651_41DA_CB10533BC85A",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 1.42,
      "yaw": 88.02,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      }
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_4630AA41_5E08_14EB_41CD_1287690973D0",
      "levels": [
        {
          "url": "media/popup_46308A41_5E08_14EB_41C2_995950235495_0_0.jpeg",
          "class": "ImageResourceLevel",
          "width": 1600,
          "height": 1560
        },
        {
          "url": "media/popup_46308A41_5E08_14EB_41C2_995950235495_0_1.jpeg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 998
        },
        {
          "url": "media/popup_46308A41_5E08_14EB_41C2_995950235495_0_2.jpeg",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 499
        }
      ]
    },
    {
      "label": "IMG_20260427_120854_00_019",
      "id": "panorama_0A38AE77_0189_C110_4171_BE63086A2049",
      "thumbnailUrl": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_t.jpg",
      "hfov": 360,
      "pitch": 0,
      "hfovMax": 130,
      "class": "Panorama",
      "partial": false,
      "frames": [
        {
          "class": "CubicPanoramaFrame",
          "front": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": 109.16,
          "y": 155.21,
          "x": 1476.33
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_E53184B1_A5FC_ED8B_41E0_8D9F24E6787F",
        "this.overlay_EF15E71C_A5DD_ECBA_41DC_9B81A85B3F2A",
        "this.overlay_E61A5D0E_A5DB_9C99_41E4_D6AE9B47D766"
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 5.28,
      "id": "popup_E4E4E809_A5D5_649D_41DE_2E543F4667AD",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E4E4E809_A5D5_649D_41DE_2E543F4667AD_0_1.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 7.24,
      "yaw": -167.66,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 92.93,
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
      "id": "camera_9275F490_AA55_ED8A_41CD_3B7B784D26AD"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_9105454A_AA5D_6C9E_41D2_DA70BDA0C51C",
      "levels": [
        {
          "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1350,
          "height": 1165
        },
        {
          "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 883
        },
        {
          "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_2.png",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 441
        }
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_15002013_035A_1D32_4175_BD6AB8067271",
      "levels": [
        {
          "url": "media/popup_1543AE85_037E_6516_415B_C3F001C9EB53_0_0.png",
          "class": "ImageResourceLevel",
          "width": 2121,
          "height": 3000
        },
        {
          "url": "media/popup_1543AE85_037E_6516_415B_C3F001C9EB53_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1447,
          "height": 2048
        },
        {
          "url": "media/popup_1543AE85_037E_6516_415B_C3F001C9EB53_0_2.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_1543AE85_037E_6516_415B_C3F001C9EB53_0_3.png",
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
        "yaw": 126.17,
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
      "id": "camera_92553450_AA55_EC8A_41DA_B61E5C61BA9E"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2A14285D_3F12_6DE3_41C2_4F3DFF819947",
      "levels": [
        {
          "url": "media/popup_2A14585D_3F12_6DE3_41B0_AFFCA1053256_0_0.jpg",
          "class": "ImageResourceLevel",
          "width": 3840,
          "height": 2160
        },
        {
          "url": "media/popup_2A14585D_3F12_6DE3_41B0_AFFCA1053256_0_1.jpg",
          "class": "ImageResourceLevel",
          "width": 2048,
          "height": 1152
        },
        {
          "url": "media/popup_2A14585D_3F12_6DE3_41B0_AFFCA1053256_0_2.jpg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 576
        },
        {
          "url": "media/popup_2A14585D_3F12_6DE3_41B0_AFFCA1053256_0_3.jpg",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 288
        }
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_E4DB7EB0_A5CC_9D8A_41E2_8E68D0225663",
      "levels": [
        {
          "url": "media/popup_E4D77983_A5D4_A78F_41CA_2557DA3DC454_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1055,
          "height": 1491
        },
        {
          "url": "media/popup_E4D77983_A5D4_A78F_41CA_2557DA3DC454_0_1.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_E4D77983_A5D4_A78F_41CA_2557DA3DC454_0_2.png",
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
      "hfov": 4.69,
      "id": "popup_160BBBD0_035E_230E_4188_83261CB51309",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_160BBBD0_035E_230E_4188_83261CB51309_0_1.jpeg",
            "class": "ImageResourceLevel",
            "width": 781,
            "height": 1024
          }
        ]
      },
      "pitch": -2.31,
      "yaw": -2.49,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window58471"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E568AEAF_A5DB_BD97_41C7_F70A71165964",
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
        "this.viewer_uid91CEA305_AA55_E48A_4199_70C2DEFC4DA6"
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
        "yaw": 137.95,
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
      "id": "camera_9222F3FC_AA55_EB79_41D2_8E9339A217DD"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 9.08,
      "id": "popup_2A17F85E_3F12_6DE1_41B3_1D8C132C7E0B",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2A17F85E_3F12_6DE1_41B3_1D8C132C7E0B_0_0.png",
            "class": "ImageResourceLevel",
            "width": 658,
            "height": 565
          },
          {
            "url": "media/popup_2A17F85E_3F12_6DE1_41B3_1D8C132C7E0B_0_1.png",
            "class": "ImageResourceLevel",
            "width": 512,
            "height": 439
          }
        ]
      },
      "pitch": 8.13,
      "yaw": 33.3,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid91CF8303_AA55_E48F_41B6_54BD2F4DCF44VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_E031A033_A5D5_E48F_41A0_A904D88E003E, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_E031A033_A5D5_E48F_41A0_A904D88E003E, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid91CF8303_AA55_E48F_41B6_54BD2F4DCF44VideoPlayer)",
          "media": "this.video_150CD3E8_0356_631E_4181_C938348D61F8",
          "player": "this.viewer_uid91CF8303_AA55_E48F_41B6_54BD2F4DCF44VideoPlayer"
        }
      ],
      "id": "PlayList_E031A033_A5D5_E48F_41A0_A904D88E003E"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 150.91,
          "backwardYaw": 89.34,
          "distance": 1,
          "panorama": "this.panorama_0A3B0957_0188_4310_4171_529BD4203CE0"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 59.87,
          "backwardYaw": 29.84,
          "distance": 1,
          "panorama": "this.panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -124.66,
          "backwardYaw": 6.99,
          "distance": 1,
          "panorama": "this.panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_115208_00_010",
      "id": "panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B",
      "thumbnailUrl": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_t.jpg",
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
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": -144.14,
          "y": 1902.65,
          "x": 428.04
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_B2E09E3D_A5AC_FAB3_41CD_02BE0E1A4D68",
        "this.overlay_B3BD91E6_A585_80E3_41E3_78E18A34FB4E",
        "this.popup_B3AED1C7_A585_8121_41E2_AD0909A618A5",
        "this.overlay_E635768E_A5FC_AD99_41E3_F993EE331C03",
        "this.overlay_E4E5F2C1_A5FC_E58F_41B9_DA40D149ADA5",
        "this.overlay_91B039DF_AA5B_A7B6_41E0_4F9D4363958E"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -100.67,
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
      "id": "camera_932355B8_AA55_EFFA_41B6_A8BC20FD4B93"
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
      "id": "panorama_0A310265_0189_C130_416B_AC54D2B2339F_camera"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.18,
      "id": "popup_90976D30_A5BF_BC8A_41DD_499AC20A1D2D",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_90976D30_A5BF_BC8A_41DD_499AC20A1D2D_0_0.png",
            "class": "ImageResourceLevel",
            "width": 658,
            "height": 565
          },
          {
            "url": "media/popup_90976D30_A5BF_BC8A_41DD_499AC20A1D2D_0_1.png",
            "class": "ImageResourceLevel",
            "width": 512,
            "height": 439
          }
        ]
      },
      "pitch": 5.66,
      "yaw": -118.99,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 8.72,
      "id": "popup_B3AED1C7_A585_8121_41E2_AD0909A618A5",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_B3AED1C7_A585_8121_41E2_AD0909A618A5_0_1.jpeg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 998
          }
        ]
      },
      "pitch": 3,
      "yaw": 108.56,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 2.18,
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
      "id": "camera_91FAF37E_AA55_EB79_41D6_BC7E23F5A742"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_91C6F30F_AA55_E497_41DB_DEB39F589524, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_91C6F30F_AA55_E497_41DB_DEB39F589524, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
          "media": "this.video_150CD3E8_0356_631E_4181_C938348D61F8",
          "player": "this.MainViewerVideoPlayer"
        }
      ],
      "id": "playList_91C6F30F_AA55_E497_41DB_DEB39F589524"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.3,
      "id": "popup_9105354A_AA5D_6C9E_41CD_A955AE2C7AD9",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_1.png",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 883
          }
        ]
      },
      "pitch": 4.91,
      "yaw": 125.5,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -90.66,
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
      "id": "camera_9305A587_AA55_EF96_41DC_2194AF0EF757"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_E4DD8EB8_A5CC_9DF9_41B5_8B277AB81858",
      "levels": [
        {
          "url": "media/popup_E4C58759_A5D5_6CBA_41CD_81091F771885_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1055,
          "height": 1491
        },
        {
          "url": "media/popup_E4C58759_A5D5_6CBA_41CD_81091F771885_0_1.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_E4C58759_A5D5_6CBA_41CD_81091F771885_0_2.png",
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
      "hfov": 5.99,
      "id": "popup_2AA8200F_3F12_9D60_41CB_49F8118C1EC4",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2AA8200F_3F12_9D60_41CB_49F8118C1EC4_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 576
          }
        ]
      },
      "pitch": 6.27,
      "yaw": -142.9,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -53.83,
          "backwardYaw": -107.75,
          "distance": 1,
          "panorama": "this.panorama_0A36831A_0188_4710_4175_617FCB27EF2E"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 29.84,
          "backwardYaw": 59.87,
          "distance": 1,
          "panorama": "this.panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_115254_00_011",
      "id": "panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6",
      "thumbnailUrl": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_t.jpg",
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": 88.35,
          "y": 1881.71,
          "x": 125.05
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_BF4AE824_A594_A651_41C0_79F2A72F81B4",
        "this.overlay_E57E8349_A5FC_A49B_41CC_E9F94DBDA45D",
        "this.overlay_E61BE49E_A5FD_6DB6_41D7_2BC615AA2F12",
        "this.overlay_9240DEDF_AA54_9DB6_41E1_70559133DC4B",
        "this.overlay_9143967C_AA5D_ED7A_41C8_73A5E6C0ADE2",
        "this.popup_9137B630_AA5D_EC8A_41CC_FD9D8ACE034E"
      ]
    },
    {
      "class": "Video",
      "label": "Virtual Reality (1)",
      "scaleMode": "fit_inside",
      "thumbnailUrl": "media/video_2AB4AE2D_3F12_65A3_41C8_01D74E6A9B0E_t.jpg",
      "width": 2240,
      "loop": false,
      "id": "video_2AB4AE2D_3F12_65A3_41C8_01D74E6A9B0E",
      "height": 2240,
      "video": {
        "width": 2240,
        "class": "VideoResource",
        "height": 2240,
        "mp4Url": "media/video_2AB4AE2D_3F12_65A3_41C8_01D74E6A9B0E.mp4"
      }
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_E4D10EAC_A5CC_9D99_41E2_646156BF72C9",
      "levels": [
        {
          "url": "media/popup_E4E4E809_A5D5_649D_41DE_2E543F4667AD_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1055,
          "height": 1491
        },
        {
          "url": "media/popup_E4E4E809_A5D5_649D_41DE_2E543F4667AD_0_1.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_E4E4E809_A5D5_649D_41DE_2E543F4667AD_0_2.png",
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
      "id": "panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_camera"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window58472"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E568DEAF_A5DB_BD97_41DA_09DC5158EB83",
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
        "this.viewer_uid91C81308_AA55_E499_41E0_B05489907723"
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
      "hfov": 8.13,
      "id": "popup_0C89C6FA_03B9_985E_4189_31509CC1BC9D",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_0C89C6FA_03B9_985E_4189_31509CC1BC9D_0_0.png",
            "class": "ImageResourceLevel",
            "width": 658,
            "height": 565
          },
          {
            "url": "media/popup_0C89C6FA_03B9_985E_4189_31509CC1BC9D_0_1.png",
            "class": "ImageResourceLevel",
            "width": 512,
            "height": 439
          }
        ]
      },
      "pitch": 3.64,
      "yaw": -125.9,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_29132B0D_3F13_E363_41CD_753B84771ACC",
      "levels": [
        {
          "url": "media/popup_29132B0D_3F13_E363_41C4_446D76E5985C_0_0.jpg",
          "class": "ImageResourceLevel",
          "width": 3840,
          "height": 2160
        },
        {
          "url": "media/popup_29132B0D_3F13_E363_41C4_446D76E5985C_0_1.jpg",
          "class": "ImageResourceLevel",
          "width": 2048,
          "height": 1152
        },
        {
          "url": "media/popup_29132B0D_3F13_E363_41C4_446D76E5985C_0_2.jpg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 576
        },
        {
          "url": "media/popup_29132B0D_3F13_E363_41C4_446D76E5985C_0_3.jpg",
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
        "yaw": -1.13,
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
      "id": "camera_91E00361_AA55_E48B_41AD_F0C89E885C30"
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
      "id": "panorama_0A36831A_0188_4710_4175_617FCB27EF2E_camera"
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
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 9.36,
      "id": "popup_2913EB0D_3F13_E363_4192_CFFA34EF2479",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2913EB0D_3F13_E363_4192_CFFA34EF2479_0_0.png",
            "class": "ImageResourceLevel",
            "width": 658,
            "height": 565
          },
          {
            "url": "media/popup_2913EB0D_3F13_E363_4192_CFFA34EF2479_0_1.png",
            "class": "ImageResourceLevel",
            "width": 512,
            "height": 439
          }
        ]
      },
      "pitch": 8.87,
      "yaw": -147.57,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid91B612F3_AA55_E58F_41D2_2043CDBE0CDDVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_E0316033_A5D5_E48F_41B5_F35B9ABD4D09, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_E0316033_A5D5_E48F_41B5_F35B9ABD4D09, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid91B612F3_AA55_E58F_41D2_2043CDBE0CDDVideoPlayer)",
          "media": "this.video_150CD3E8_0356_631E_4181_C938348D61F8",
          "player": "this.viewer_uid91B612F3_AA55_E58F_41D2_2043CDBE0CDDVideoPlayer"
        }
      ],
      "id": "PlayList_E0316033_A5D5_E48F_41B5_F35B9ABD4D09"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_1504B013_035A_1D32_4188_826C3C9C23FC",
      "levels": [
        {
          "url": "media/popup_16FFF462_035A_6512_4182_B5D0BFACB539_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1564,
          "height": 834
        },
        {
          "url": "media/popup_16FFF462_035A_6512_4182_B5D0BFACB539_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 546
        },
        {
          "url": "media/popup_16FFF462_035A_6512_4182_B5D0BFACB539_0_2.png",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 273
        }
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 66.59,
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
      "id": "camera_92C6D52D_AA55_EC9A_41DA_238E90AB20D6"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 96.71,
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
      "id": "camera_928754B5_AA55_ED8A_41B3_9E2086D7D44E"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -94.25,
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
      "id": "camera_91FF5370_AA55_E489_41D0_6F6B734E3F18"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -126.17,
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
      "id": "camera_9235C40F_AA55_EC97_41D5_07560A058DE1"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 11.39,
      "id": "popup_1550B851_03D6_6D0E_4186_1652BA1940D3",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_1550B851_03D6_6D0E_4186_1652BA1940D3_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 576
          }
        ]
      },
      "pitch": 20.93,
      "yaw": -42.52,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -92.17,
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
      "id": "camera_92BE4504_AA55_EC8A_41E2_D18D133A81D2"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -61.76,
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
      "id": "camera_9242A440_AA55_EC8A_41C7_357FA6B40746"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 8.82,
      "id": "popup_46308A41_5E08_14EB_41C2_995950235495",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_46308A41_5E08_14EB_41C2_995950235495_0_1.jpeg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 998
          }
        ]
      },
      "pitch": 4.15,
      "yaw": -152.54,
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
      "id": "panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_camera"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_2AA8300F_3F12_9D60_4188_FFD8EB9E584A",
      "levels": [
        {
          "url": "media/popup_2AA8200F_3F12_9D60_41CB_49F8118C1EC4_0_0.jpg",
          "class": "ImageResourceLevel",
          "width": 3840,
          "height": 2160
        },
        {
          "url": "media/popup_2AA8200F_3F12_9D60_41CB_49F8118C1EC4_0_1.jpg",
          "class": "ImageResourceLevel",
          "width": 2048,
          "height": 1152
        },
        {
          "url": "media/popup_2AA8200F_3F12_9D60_41CB_49F8118C1EC4_0_2.jpg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 576
        },
        {
          "url": "media/popup_2AA8200F_3F12_9D60_41CB_49F8118C1EC4_0_3.jpg",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 288
        }
      ]
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window58473"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E5694EB0_A5DB_BD8A_41B3_1D4DBAD77A16",
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
        "this.viewer_uid91CBB309_AA55_E49B_41D3_4EFA498124D9"
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
        "yaw": -89.53,
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
      "id": "camera_929614DB_AA55_EDBF_41E3_65FDEEF63FE2"
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
          "class": "MapPlayListItem",
          "media": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "player": "this.MapViewerMapPlayer"
        }
      ],
      "id": "playList_91C6E30F_AA55_E497_41E0_78E47BFA1772"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -177.82,
          "backwardYaw": 97.84,
          "distance": 1,
          "panorama": "this.panorama_0A301F8A_0189_BFF0_4158_8F11989100B6"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 118.24,
          "backwardYaw": 132.97,
          "distance": 1,
          "panorama": "this.panorama_0A36831A_0188_4710_4175_617FCB27EF2E"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -42.05,
          "backwardYaw": 137.12,
          "distance": 1,
          "panorama": "this.panorama_0A310265_0189_C130_416B_AC54D2B2339F"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -85.55,
          "backwardYaw": -87.07,
          "distance": 1,
          "panorama": "this.panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -113.41,
          "backwardYaw": 149.4,
          "distance": 1,
          "panorama": "this.panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 94.51,
          "backwardYaw": -83.29,
          "distance": 1,
          "panorama": "this.panorama_0A3B0957_0188_4310_4171_529BD4203CE0"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 79.33,
          "backwardYaw": 73.47,
          "distance": 1,
          "panorama": "this.panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_120548_00_018",
      "id": "panorama_0A38E874_0189_C110_4176_1AE8579BAF0C",
      "thumbnailUrl": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_t.jpg",
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
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": 92.22,
          "y": 963.05,
          "x": 426.19
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_16C66F11_0356_230E_417C_671770291BB2",
        "this.popup_16C77E39_034A_257E_4174_5F7A568F2A5E",
        "this.popup_0C88D6F8_03B9_985A_417D_6AF94A6DA452",
        "this.popup_0C8906FA_03B9_985E_4147_5BF3CBFA7926",
        "this.popup_0C89C6FA_03B9_985E_4189_31509CC1BC9D",
        "this.popup_0C8676FC_03B9_985A_416B_17D46C431A37",
        "this.overlay_2A12EF99_3F17_A363_41C5_7F41A704A5EB",
        "this.overlay_2BE733C9_3F17_A2E3_418F_B40F42DA9632",
        "this.overlay_2ABEB547_3F16_67EF_4198_00ECEB54F31F",
        "this.overlay_2A4299FB_3F16_EEA7_41B2_3A8FF9A54A2D",
        "this.overlay_2BFCA096_3F12_9D61_41C7_CEF63B2727C3",
        "this.popup_B0C5F6A7_A5BC_6A5F_41DA_CA4B55551188",
        "this.overlay_B1D9E7F5_A584_80E1_41C7_87142F4CCAEB",
        "this.overlay_B247671C_A585_8127_41BE_7164D22969B3",
        "this.popup_B1CA27B8_A584_8160_41D2_2C9D47988006",
        "this.overlay_B99F6117_A58C_8121_41E4_9655A2236E37",
        "this.overlay_BE63A248_A58D_832F_41C9_1A086583EA14",
        "this.overlay_BE2173DB_A58D_8121_41BF_02226197FAAD",
        "this.overlay_B9BEE577_A58D_81E1_41D7_A80FBFAB5286",
        "this.popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E",
        "this.popup_E3E83004_A5F7_6489_4192_9FA3E16760C4",
        "this.overlay_E8E72B57_AA4C_A4B6_41C6_1031C81D6B84",
        "this.overlay_9145342F_AA55_6C96_41C1_64C9E804AAA7",
        "this.overlay_E935ACBC_AA55_9DFA_41CA_3E5945B6C663"
      ]
    },
    {
      "class": "FadeInEffect",
      "duration": 500,
      "id": "FadeInEffect_EFCCE03C_A5D5_E4FA_41DA_C8F1BD718C88",
      "easing": "cubic_in"
    },
    {
      "class": "Video",
      "label": "Laboratorium komputer (2)",
      "scaleMode": "fit_inside",
      "thumbnailUrl": "media/video_150CD3E8_0356_631E_4181_C938348D61F8_t.jpg",
      "width": 2964,
      "loop": false,
      "id": "video_150CD3E8_0356_631E_4181_C938348D61F8",
      "height": 1694,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      }
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
          "class": "MapPlayListItem",
          "media": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "player": "this.MapViewerMapPlayer"
        }
      ],
      "id": "playList_91C6C30F_AA55_E497_41AB_478C9B726053"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_B3AEC1C7_A585_8121_41DF_C2E9B58E6B76",
      "levels": [
        {
          "url": "media/popup_B3AED1C7_A585_8121_41E2_AD0909A618A5_0_0.jpeg",
          "class": "ImageResourceLevel",
          "width": 1600,
          "height": 1560
        },
        {
          "url": "media/popup_B3AED1C7_A585_8121_41E2_AD0909A618A5_0_1.jpeg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 998
        },
        {
          "url": "media/popup_B3AED1C7_A585_8121_41E2_AD0909A618A5_0_2.jpeg",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 499
        }
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 6.85,
      "id": "popup_15306F7E_034A_E3F2_417F_DDC4DDED48A4",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_15306F7E_034A_E3F2_417F_DDC4DDED48A4_0_2.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 6.64,
      "yaw": -128.49,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 6.2,
      "id": "popup_2AAB8010_3F12_9D61_41C0_E5FC13FD1498",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2AAB8010_3F12_9D61_41C0_E5FC13FD1498_0_0.png",
            "class": "ImageResourceLevel",
            "width": 658,
            "height": 565
          },
          {
            "url": "media/popup_2AAB8010_3F12_9D61_41C0_E5FC13FD1498_0_1.png",
            "class": "ImageResourceLevel",
            "width": 512,
            "height": 439
          }
        ]
      },
      "pitch": 5.56,
      "yaw": -157.86,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 15.11,
      "autoplay": true,
      "id": "popup_BFD8C5B3_A593_E9B7_41DA_37B2A90C654F",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 1.04,
      "yaw": 91.98,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      }
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid91CEA305_AA55_E48A_4199_70C2DEFC4DA6VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_E0301033_A5D5_E48F_41DE_BE8721765421, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_E0301033_A5D5_E48F_41DE_BE8721765421, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid91CEA305_AA55_E48A_4199_70C2DEFC4DA6VideoPlayer)",
          "media": "this.video_150CD3E8_0356_631E_4181_C938348D61F8",
          "player": "this.viewer_uid91CEA305_AA55_E48A_4199_70C2DEFC4DA6VideoPlayer"
        }
      ],
      "id": "PlayList_E0301033_A5D5_E48F_41DE_BE8721765421"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 178.87,
          "backwardYaw": 10.2,
          "distance": 1,
          "panorama": "this.panorama_0A301F8A_0189_BFF0_4158_8F11989100B6"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 149.4,
          "backwardYaw": -113.41,
          "distance": 1,
          "panorama": "this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 90.47,
          "backwardYaw": -135.05,
          "distance": 1,
          "panorama": "this.panorama_0A3BBBDB_0189_C710_416D_B75CEF238602"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_120306_00_015",
      "id": "panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF",
      "thumbnailUrl": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_t.jpg",
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
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": 0,
          "y": 412.62,
          "x": 162.51
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_168BC68B_03D6_6512_416A_46A637755106",
        "this.popup_15501851_03D6_6D0E_4180_BFF2438BEA53",
        "this.popup_1550B851_03D6_6D0E_4186_1652BA1940D3",
        "this.popup_15508851_03D6_6D0E_4189_EF92784839A4",
        "this.popup_0CEC7634_03BB_BBEA_4166_F7777F6D757D",
        "this.overlay_295E781F_3F11_AD9F_41C6_73A703B35E9B",
        "this.overlay_2907EBE2_3F12_62A1_41C3_F7B1ED598FF7",
        "this.overlay_29914B95_3F12_A363_41AF_D228430E08F4",
        "this.popup_B3A03CEC_A5BC_7FD1_41CF_3A36B6DB932C",
        "this.overlay_E4B8F073_A5FF_E48F_41C0_B7B19F74D6B9",
        "this.overlay_E2833355_A5FF_A4B1_41E2_3CB5CFAA79AF",
        "this.overlay_EE8F6174_A5FC_A48A_41D9_33AFD3AE6A69",
        "this.popup_E543C5C9_A5D5_AF9B_41D9_80294CA85573"
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_E4FB8E90_A5CC_9D89_41D1_075BB4996959",
      "levels": [
        {
          "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1350,
          "height": 1165
        },
        {
          "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 883
        },
        {
          "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_2.png",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 441
        }
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -42.88,
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
      "id": "camera_927C047F_AA55_ED77_41D3_89FEF8E00F24"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window58470"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E5682EAF_A5DB_BD97_41C2_21022BA9DB3B",
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
        "this.viewer_uid91CF8303_AA55_E48F_41B6_54BD2F4DCF44"
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
      "id": "ImageResource_9EEB49A1_A5BC_E78B_41A1_08899E6CDB03",
      "levels": [
        {
          "url": "media/popup_9EEBA9A1_A5BC_E78B_41E1_FECA87A60F67_0_0.jpg",
          "class": "ImageResourceLevel",
          "width": 3840,
          "height": 2160
        },
        {
          "url": "media/popup_9EEBA9A1_A5BC_E78B_41E1_FECA87A60F67_0_1.jpg",
          "class": "ImageResourceLevel",
          "width": 2048,
          "height": 1152
        },
        {
          "url": "media/popup_9EEBA9A1_A5BC_E78B_41E1_FECA87A60F67_0_2.jpg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 576
        },
        {
          "url": "media/popup_9EEBA9A1_A5BC_E78B_41E1_FECA87A60F67_0_3.jpg",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 288
        }
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_B371B170_A584_81E0_41CF_6FD2CCD0C099",
      "levels": [
        {
          "url": "media/popup_B371A170_A584_81E0_41D5_9AE47427318B_0_0.jpeg",
          "class": "ImageResourceLevel",
          "width": 1600,
          "height": 1560
        },
        {
          "url": "media/popup_B371A170_A584_81E0_41D5_9AE47427318B_0_1.jpeg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 998
        },
        {
          "url": "media/popup_B371A170_A584_81E0_41D5_9AE47427318B_0_2.jpeg",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 499
        }
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 73.47,
          "backwardYaw": 79.33,
          "distance": 1,
          "panorama": "this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 6.99,
          "backwardYaw": -124.66,
          "distance": 1,
          "panorama": "this.panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_115112_00_009",
      "id": "panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482",
      "thumbnailUrl": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_t.jpg",
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
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": -81.67,
          "y": 1892.68,
          "x": 732.17
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_B288F190_A584_813F_41D9_381665B40A68",
        "this.popup_B371A170_A584_81E0_41D5_9AE47427318B",
        "this.overlay_E619F6CD_A5FB_AD9A_41CE_01A2C5F84D5B",
        "this.overlay_E4F2F3E5_A5FB_EB8A_41DC_60825C4A2AFB"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -150.16,
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
      "id": "camera_93190597_AA55_EFB6_41D5_64EE02F1E8B0"
    },
    {
      "fieldOfViewOverlayOutsideOpacity": 0,
      "label": "minimap",
      "id": "map_0FB80333_02DE_2372_4183_9B067342910B",
      "minimumZoomFactor": 0.5,
      "thumbnailUrl": "media/map_0FB80333_02DE_2372_4183_9B067342910B_t.png",
      "width": 1667,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B.png",
            "class": "ImageResourceLevel",
            "width": 1667,
            "height": 2000
          },
          {
            "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_lq.png",
            "class": "ImageResourceLevel",
            "width": 233,
            "height": 280,
            "tags": "preload"
          }
        ]
      },
      "fieldOfViewOverlayRadiusScale": 0.16,
      "fieldOfViewOverlayOutsideColor": "#000000",
      "maximumZoomFactor": 3,
      "class": "Map",
      "fieldOfViewOverlayInsideOpacity": 0.4,
      "scaleMode": "fit_inside",
      "initialZoomFactor": 2,
      "fieldOfViewOverlayInsideColor": "#FFFFFF",
      "height": 2000,
      "overlays": [
        "this.overlay_0F496EF8_02DE_62FF_417C_B578FF2A7005",
        "this.overlay_0F433EF8_02DE_62FF_4185_86A0BE4ADDDC",
        "this.overlay_0F432EF8_02DE_62FF_4181_BB844FEA0155",
        "this.overlay_0F437EF8_02DE_62FF_4179_71A8E15F0C2A",
        "this.overlay_0F435EF8_02DE_62FF_4183_35E398F723C8",
        "this.overlay_0F43BEF8_02DE_62FF_4178_6427F9FD0E60",
        "this.overlay_0F43AEF8_02DE_62FF_4186_06FBB7C7978D",
        "this.overlay_0F438EF8_02DE_62FF_4148_418D5089A658",
        "this.overlay_0F43FEF8_02DE_62FF_4170_53ED8D0B4E8E",
        "this.overlay_0F43EEF8_02DE_62FF_4184_76F99C65A046",
        "this.overlay_0F43DEF8_02DE_62FF_416F_111E878D0272",
        "this.overlay_116D7E97_02FE_2532_4167_F8292A6ED69E",
        "this.overlay_9034E0F8_8BFD_FEF9_41D4_4D851395BD2C",
        "this.overlay_9034D0F8_8BFD_FEF9_41A9_4E51557967A3"
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'free_drag_and_rotation')",
          "class": "MapPlayListItem",
          "media": "this.map_3DDC1625_2A24_10E9_41BB_9517D7DADA17",
          "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
        }
      ],
      "id": "playList_91C6830F_AA55_E497_41E3_785A6610334F"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.12,
      "id": "popup_E60794C1_A5CB_AD8A_41B1_0061B7A38CB6",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E60794C1_A5CB_AD8A_41B1_0061B7A38CB6_0_2.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 4.66,
      "yaw": 180,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 55.34,
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
      "id": "camera_9334E5C7_AA55_EF96_41C8_D3294097927A"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 9.44,
          "backwardYaw": -26.44,
          "distance": 1,
          "panorama": "this.panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 137.12,
          "backwardYaw": -42.05,
          "distance": 1,
          "panorama": "this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -145.44,
          "backwardYaw": 53.83,
          "distance": 1,
          "panorama": "this.panorama_0A3BBBDB_0189_C710_416D_B75CEF238602"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_120436_00_017",
      "id": "panorama_0A310265_0189_C130_416B_AC54D2B2339F",
      "thumbnailUrl": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_t.jpg",
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
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": 76.31,
          "y": 480,
          "x": 752.11
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_15FD06BC_03DA_E576_4165_3AAC1B8B6FCF",
        "this.popup_0C783E2A_03BB_8BFE_418B_066BA8E31E31",
        "this.overlay_2AA4B034_3F12_9DA1_41C6_8FA506CB93E1",
        "this.overlay_2AA4C034_3F12_9DA1_41C7_2AB882E261EA",
        "this.overlay_2AA4E034_3F12_9DA1_414B_B67E51975328",
        "this.popup_2AA9100D_3F12_9D63_41C1_179E7BA65D3D",
        "this.popup_2AA8200F_3F12_9D60_41CB_49F8118C1EC4",
        "this.popup_2AAB8010_3F12_9D61_41C0_E5FC13FD1498",
        "this.popup_2AABC011_3F12_9D63_4192_DFEDA19CBE08",
        "this.popup_B2056AFE_A5B4_FBB1_4195_89B0D3BB02EA",
        "this.overlay_B362A391_A5B5_AA73_41C9_098C7C0A84C9",
        "this.overlay_B362B391_A5B5_AA73_41D0_29167ADE793D",
        "this.overlay_E52D8691_A5FD_ED8A_41BB_C8C7918E9835",
        "this.overlay_E3715875_A5FD_A48B_4188_7F4712B0042D",
        "this.overlay_E58E1577_A5FD_6F77_41D5_C2DAA41ADC1A",
        "this.popup_E4D77983_A5D4_A78F_41CA_2557DA3DC454"
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_9137A631_AA5D_EC8B_41E0_16D87B12CEF2",
      "levels": [
        {
          "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1350,
          "height": 1165
        },
        {
          "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 883
        },
        {
          "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_2.png",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 441
        }
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -85.49,
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
      "id": "camera_921A13CC_AA55_EB99_41D9_65C0328D91F8"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_160BCBD0_035E_230E_4163_BF830F5181B8",
      "levels": [
        {
          "url": "media/popup_160BBBD0_035E_230E_4188_83261CB51309_0_0.jpeg",
          "class": "ImageResourceLevel",
          "width": 1221,
          "height": 1600
        },
        {
          "url": "media/popup_160BBBD0_035E_230E_4188_83261CB51309_0_1.jpeg",
          "class": "ImageResourceLevel",
          "width": 781,
          "height": 1024
        },
        {
          "url": "media/popup_160BBBD0_035E_230E_4188_83261CB51309_0_2.jpeg",
          "class": "ImageResourceLevel",
          "width": 390,
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
      "id": "panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -30.6,
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
      "id": "camera_928C34A3_AA55_ED8E_41DA_16507ED255B4"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 94.45,
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
      "id": "camera_920533AB_AA55_EB9F_41D3_A32D2A00295E"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 85.75,
          "backwardYaw": -177.92,
          "distance": 1,
          "panorama": "this.panorama_0A301F8A_0189_BFF0_4158_8F11989100B6"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 132.97,
          "backwardYaw": 118.24,
          "distance": 1,
          "panorama": "this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -107.75,
          "backwardYaw": -53.83,
          "distance": 1,
          "panorama": "this.panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_115407_00_012",
      "id": "panorama_0A36831A_0188_4710_4175_617FCB27EF2E",
      "thumbnailUrl": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_t.jpg",
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
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": -22.83,
          "y": 1239.69,
          "x": 111.8
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.popup_17DA680E_0356_2D12_4172_1C397EC042BE",
        "this.overlay_29802E00_3F12_A561_41AF_7C7D2F54AEF0",
        "this.overlay_278E3925_3F2F_AFA3_41C4_9E48B8B0F840",
        "this.popup_277A7905_3F2F_AF60_41C6_48C710204527",
        "this.popup_BFD8C5B3_A593_E9B7_41DA_37B2A90C654F",
        "this.overlay_E514485B_A5FD_E4BE_418E_816A8FE91EE5",
        "this.overlay_E6A6455E_A5FD_ACB9_41D6_40081C9F5C17",
        "this.overlay_E5F2C4FA_A5CB_AD7E_4190_D00685806767",
        "this.popup_E60794C1_A5CB_AD8A_41B1_0061B7A38CB6",
        "this.overlay_9C90D574_A5CB_6C8A_41BC_BCF2BA55C478"
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid91CF0302_AA55_E489_41DC_FB57D1CB1BDDVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_949FF533_AA4B_AC8E_41D2_B2130B408223, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_949FF533_AA4B_AC8E_41D2_B2130B408223, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid91CF0302_AA55_E489_41DC_FB57D1CB1BDDVideoPlayer)",
          "media": "this.video_150CD3E8_0356_631E_4181_C938348D61F8",
          "player": "this.viewer_uid91CF0302_AA55_E489_41DC_FB57D1CB1BDDVideoPlayer"
        }
      ],
      "id": "PlayList_949FF533_AA4B_AC8E_41D2_B2130B408223"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.1,
      "id": "popup_E4D77983_A5D4_A78F_41CA_2557DA3DC454",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E4D77983_A5D4_A78F_41CA_2557DA3DC454_0_1.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 5.07,
      "yaw": -171.89,
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
      "id": "panorama_1C1B63E6_0188_C730_416A_E102A28938A8_camera"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.5,
      "id": "popup_9137B630_AA5D_EC8A_41CC_FD9D8ACE034E",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E_0_1.png",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 883
          }
        ]
      },
      "pitch": 3.94,
      "yaw": -6.41,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -47.03,
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
      "id": "camera_9265E46F_AA55_EC96_41C5_620FE6312890"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -135.05,
          "backwardYaw": 90.47,
          "distance": 1,
          "panorama": "this.panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 53.83,
          "backwardYaw": -145.44,
          "distance": 1,
          "panorama": "this.panorama_0A310265_0189_C130_416B_AC54D2B2339F"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 128.25,
          "backwardYaw": 87.83,
          "distance": 1,
          "panorama": "this.panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_120404_00_016",
      "id": "panorama_0A3BBBDB_0189_C710_416D_B75CEF238602",
      "thumbnailUrl": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_t.jpg",
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
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": 45.8,
          "y": 416.61,
          "x": 437.01
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_169472B1_0356_3D0E_4188_EA2C84B32AE8",
        "this.popup_151A4A9D_03D6_2D31_4182_5B97AD7D2F02",
        "this.popup_151BCA9D_03D6_2D31_4140_A83DB21329C7",
        "this.popup_151B2A9D_03D6_2D31_4189_59DE99FA2400",
        "this.overlay_293A5B30_3F13_E3A1_41C0_E5F6E54E9B9A",
        "this.overlay_293ABB30_3F13_E3A1_41B1_E59081E1EAC1",
        "this.overlay_293A8B30_3F13_E3A1_41A2_AFCB8BEABD2C",
        "this.popup_29132B0D_3F13_E363_41C4_446D76E5985C",
        "this.popup_2913EB0D_3F13_E363_4192_CFFA34EF2479",
        "this.popup_29121B0E_3F13_E361_41C9_0D0AE550CBDB",
        "this.popup_BD60E926_A5B4_6650_41DE_0CDA107BEF0A",
        "this.overlay_E49FB99F_A5FC_E7B7_41DC_D8517916A34C",
        "this.overlay_E22F2911_A5FD_648A_41D8_E54CD8231BDE",
        "this.overlay_EF4E8C62_A5FD_BC8E_41D8_22F80FCC01B4",
        "this.popup_E4E4E809_A5D5_649D_41DE_2E543F4667AD"
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 11.99,
      "id": "popup_15508851_03D6_6D0E_4189_EF92784839A4",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_15508851_03D6_6D0E_4189_EF92784839A4_0_0.png",
            "class": "ImageResourceLevel",
            "width": 658,
            "height": 565
          },
          {
            "url": "media/popup_15508851_03D6_6D0E_4189_EF92784839A4_0_1.png",
            "class": "ImageResourceLevel",
            "width": 512,
            "height": 439
          }
        ]
      },
      "pitch": 38.13,
      "yaw": -99.32,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0A38AE77_0189_C110_4171_BE63086A2049"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 133.91,
          "backwardYaw": 134.79,
          "distance": 1,
          "panorama": "this.panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC"
        }
      ],
      "hfov": 360,
      "partial": false,
      "id": "panorama_1C1B63E6_0188_C730_416A_E102A28938A8",
      "thumbnailUrl": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_t.jpg",
      "label": "IMG_20260414_123911_00_094",
      "pitch": 0,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": -215.81,
          "y": 495.24,
          "x": 1476.33
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
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_E53DB9FB_A5F4_A77F_4193_0AE8C0B1743B",
        "this.overlay_E3C3F627_A5F4_EC96_41E2_8F4FFBBCF212",
        "this.overlay_E6756931_A5F5_A48B_41C8_67A5599F936D",
        "this.overlay_E61DEC70_A5CB_FC8A_418A_11228020A983",
        "this.overlay_E40B11EA_A5CF_679E_41D7_87AF42CDE964",
        "this.overlay_E4DD814C_A5D4_A49A_41A9_BFD04115A7EF",
        "this.overlay_E4956352_A5D4_A489_419B_AB5FDD95D09A",
        "this.overlay_E204920E_A5DC_E499_41D3_9987A1387686"
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
      "id": "panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_camera"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window58469"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E56F4EAE_A5DB_BD99_41E1_220188150050",
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
        "this.viewer_uid91B3E2FB_AA55_E57F_41D2_872175C314C5"
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
      "hfov": 5.39,
      "id": "popup_16FFF462_035A_6512_4182_B5D0BFACB539",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_16FFF462_035A_6512_4182_B5D0BFACB539_0_1.png",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 546
          }
        ]
      },
      "pitch": 5.4,
      "yaw": -2.18,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 5.99,
      "id": "popup_E543C5C9_A5D5_AF9B_41D9_80294CA85573",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E543C5C9_A5D5_AF9B_41D9_80294CA85573_0_1.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 11.01,
      "yaw": -150.83,
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
      "id": "panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_camera"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 6.45,
      "id": "popup_2A14585D_3F12_6DE3_41B0_AFFCA1053256",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2A14585D_3F12_6DE3_41B0_AFFCA1053256_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 576
          }
        ]
      },
      "pitch": 7.8,
      "yaw": 47.49,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -51.75,
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
      "id": "camera_921D63BA_AA55_EBF9_41E0_5A27BC5059F6"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -87.07,
          "backwardYaw": -85.55,
          "distance": 1,
          "panorama": "this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 87.83,
          "backwardYaw": 128.25,
          "distance": 1,
          "panorama": "this.panorama_0A3BBBDB_0189_C710_416D_B75CEF238602"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_121017_00_020",
      "id": "panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9",
      "thumbnailUrl": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_t.jpg",
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
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": -85.67,
          "y": 779.29,
          "x": 423.91
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_16BA2777_034A_E3F2_4156_90152416B2F9",
        "this.popup_15306F7E_034A_E3F2_417F_DDC4DDED48A4",
        "this.overlay_2A20B884_3F12_6D61_41A0_73D213C95FCC",
        "this.overlay_2A208884_3F12_6D61_41C9_7357BB190E78",
        "this.overlay_2A209884_3F12_6D61_41CC_B89F6A009D88",
        "this.overlay_2A920BEE_3F16_62A1_41BD_808A9EE5A9CC",
        "this.overlay_29659316_3F16_E361_41C7_BBE17360E474",
        "this.popup_2A15785D_3F12_6DE3_41C5_7A28CB9AEE92",
        "this.popup_2A14585D_3F12_6DE3_41B0_AFFCA1053256",
        "this.popup_2A17F85E_3F12_6DE1_41B3_1D8C132C7E0B",
        "this.popup_B22EF102_A5B5_A651_41DA_CB10533BC85A",
        "this.overlay_E4D875FC_A5FB_6F7A_41CB_60C6A196CAC2",
        "this.overlay_E31E3EE4_A5FB_9D8B_41B3_36F9DCE2B5EE",
        "this.popup_E4C58759_A5D5_6CBA_41CD_81091F771885"
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": 10.2,
          "backwardYaw": 178.87,
          "distance": 1,
          "panorama": "this.panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -177.92,
          "backwardYaw": 85.75,
          "distance": 1,
          "panorama": "this.panorama_0A36831A_0188_4710_4175_617FCB27EF2E"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 97.84,
          "backwardYaw": -177.82,
          "distance": 1,
          "panorama": "this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_120145_00_014",
      "id": "panorama_0A301F8A_0189_BFF0_4158_8F11989100B6",
      "thumbnailUrl": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_t.jpg",
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
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": 7.79,
          "y": 954.79,
          "x": 123.2
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.overlay_28818DC2_3F1F_A6E1_41AB_B69C0E19494C",
        "this.overlay_465E0A86_5E08_1476_4196_4D5D13356765",
        "this.popup_46308A41_5E08_14EB_41C2_995950235495",
        "this.overlay_B239FF9D_A584_8120_41D2_7127F4A7B206",
        "this.overlay_E546534E_A5FC_E496_41A5_BC3F0D81587F",
        "this.overlay_E3FC2D83_A5FC_BF8E_41D7_566062E00482",
        "this.overlay_E1A85BAA_A5FF_7B91_41C5_7FEFA1ABE58A",
        "this.overlay_E57778F8_A5D4_E57A_41D5_CF7530F6981B",
        "this.popup_E56398C9_A5D4_E59B_41D3_DD45F570B33B",
        "this.overlay_9E7703D9_A5B5_ABBB_41D1_6FC0F5AF0084",
        "this.popup_9E8573A1_A5B5_AB8B_41B1_95E3886F75B9",
        "this.overlay_9117257D_AA5D_6F7A_41D9_C9126FB0A318",
        "this.popup_9105354A_AA5D_6C9E_41CD_A955AE2C7AD9"
      ]
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "yaw": -26.44,
          "backwardYaw": 9.44,
          "distance": 1,
          "panorama": "this.panorama_0A310265_0189_C130_416B_AC54D2B2339F"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 134.79,
          "backwardYaw": 133.91,
          "distance": 1,
          "panorama": "this.panorama_1C1B63E6_0188_C730_416A_E102A28938A8"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 137.31,
          "backwardYaw": 133.91,
          "distance": 1,
          "panorama": "this.panorama_1C1B63E6_0188_C730_416A_E102A28938A8"
        }
      ],
      "hfov": 360,
      "partial": false,
      "id": "panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC",
      "thumbnailUrl": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_t.jpg",
      "label": "IMG_20260414_123850_00_093",
      "pitch": 0,
      "hfovMax": 130,
      "class": "Panorama",
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": -44.02,
          "y": 499.23,
          "x": 1109.38
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
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/f/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/f/3/{row}_{column}.jpg",
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
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/u/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/u/3/{row}_{column}.jpg",
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
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/r/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/r/3/{row}_{column}.jpg",
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
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/b/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/b/3/{row}_{column}.jpg",
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
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/d/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/d/3/{row}_{column}.jpg",
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
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 8,
                "tags": "ondemand",
                "colCount": 8,
                "width": 4096,
                "height": 4096
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/l/2/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0/l/3/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_t.jpg"
        }
      ],
      "overlays": [
        "this.overlay_156B8039_045F_97DA_4179_2205DB5CCE83",
        "this.overlay_155ED09C_045E_98DA_4167_2926F581ACA9",
        "this.overlay_2AB632C1_3F17_A2E3_41C7_0DCB8E31B802",
        "this.overlay_E567726C_A5FB_E49A_41E1_B7DB38BA0634",
        "this.overlay_E3FB7296_A5FB_A589_41E2_86A1FDAB8138"
      ]
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -45.21,
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
      "id": "camera_92329420_AA55_EC89_41D3_B20629B4AEEE"
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
      "id": "panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_camera"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -169.8,
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
      "id": "camera_92B3F519_AA55_ECBA_41D1_BA3609C69727"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 5.73,
      "id": "popup_E4C58759_A5D5_6CBA_41CD_81091F771885",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E4C58759_A5D5_6CBA_41CD_81091F771885_0_1.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 8.84,
      "yaw": 14.56,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 13.09,
      "id": "popup_E56398C9_A5D4_E59B_41D3_DD45F570B33B",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E56398C9_A5D4_E59B_41D3_DD45F570B33B_0_0.png",
            "class": "ImageResourceLevel"
          }
        ]
      },
      "pitch": 11.42,
      "yaw": -16.56,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_91C6930F_AA55_E497_41D7_D3189652AE9B, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_91C6930F_AA55_E497_41D7_D3189652AE9B, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
          "media": "this.video_2AB4AE2D_3F12_65A3_41C8_01D74E6A9B0E",
          "player": "this.MainViewerVideoPlayer"
        }
      ],
      "id": "playList_91C6930F_AA55_E497_41D7_D3189652AE9B"
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
      "id": "panorama_0A3B0957_0188_4310_4171_529BD4203CE0_camera"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 16.33,
      "autoplay": true,
      "id": "popup_9E8573A1_A5B5_AB8B_41B1_95E3886F75B9",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 0.5,
      "yaw": -87.86,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      }
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_15306F7E_034A_E3F2_4173_55B31D74DF91",
      "levels": [
        {
          "url": "media/popup_15306F7E_034A_E3F2_417F_DDC4DDED48A4_0_0.png",
          "class": "ImageResourceLevel",
          "width": 2121,
          "height": 3000
        },
        {
          "url": "media/popup_15306F7E_034A_E3F2_417F_DDC4DDED48A4_0_1.png",
          "class": "ImageResourceLevel",
          "width": 1447,
          "height": 2048
        },
        {
          "url": "media/popup_15306F7E_034A_E3F2_417F_DDC4DDED48A4_0_2.png",
          "class": "ImageResourceLevel",
          "width": 723,
          "height": 1024
        },
        {
          "url": "media/popup_15306F7E_034A_E3F2_417F_DDC4DDED48A4_0_3.png",
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
      "hfov": 8.29,
      "id": "popup_29132B0D_3F13_E363_41C4_446D76E5985C",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_29132B0D_3F13_E363_41C4_446D76E5985C_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 576
          }
        ]
      },
      "pitch": 10.97,
      "yaw": -122.16,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.73,
      "id": "popup_E3E83004_A5F7_6489_4192_9FA3E16760C4",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E3E83004_A5F7_6489_4192_9FA3E16760C4_0_1.png",
            "class": "ImageResourceLevel",
            "width": 724,
            "height": 1024
          }
        ]
      },
      "pitch": 3.27,
      "yaw": -137.47,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -46.09,
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
      "id": "camera_92F69576_AA55_EC89_41CF_560436342C93"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 41.9,
      "autoplay": true,
      "id": "popup_BD60E926_A5B4_6650_41DE_0CDA107BEF0A",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 2.33,
      "yaw": -47.22,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      }
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -46.09,
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
      "id": "camera_92FD8561_AA55_EC8B_41E1_F8CE079F71A8"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": 44.95,
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
      "id": "camera_92D52540_AA55_EC8A_41C8_10BD8A987222"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_0C8906FA_03B9_985E_4187_FD8475BEFE46",
      "levels": [
        {
          "url": "media/popup_0C8906FA_03B9_985E_4147_5BF3CBFA7926_0_0.jpg",
          "class": "ImageResourceLevel",
          "width": 3840,
          "height": 2160
        },
        {
          "url": "media/popup_0C8906FA_03B9_985E_4147_5BF3CBFA7926_0_1.jpg",
          "class": "ImageResourceLevel",
          "width": 2048,
          "height": 1152
        },
        {
          "url": "media/popup_0C8906FA_03B9_985E_4147_5BF3CBFA7926_0_2.jpg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 576
        },
        {
          "url": "media/popup_0C8906FA_03B9_985E_4147_5BF3CBFA7926_0_3.jpg",
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
        "yaw": 2.08,
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
      "id": "camera_92453430_AA55_EC8A_41D0_3705199CB687"
    },
    {
      "class": "PanoramaCamera",
      "automaticZoomSpeed": 10,
      "initialPosition": {
        "class": "PanoramaCameraPosition",
        "yaw": -173.01,
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
      "id": "camera_932C55A8_AA55_EF99_41D0_0537F35443A6"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_0F40409A_03B7_B8DE_4182_BF302FEE44EE",
      "levels": [
        {
          "url": "media/popup_17DA680E_0356_2D12_4172_1C397EC042BE_0_0.jpeg",
          "class": "ImageResourceLevel",
          "width": 1600,
          "height": 1560
        },
        {
          "url": "media/popup_17DA680E_0356_2D12_4172_1C397EC042BE_0_1.jpeg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 998
        },
        {
          "url": "media/popup_17DA680E_0356_2D12_4172_1C397EC042BE_0_2.jpeg",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 499
        }
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid91CC5300_AA55_E489_41DA_9FBD5BA002BDVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_949F4533_AA4B_AC8E_41E4_4F5E303D8501, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_949F4533_AA4B_AC8E_41E4_4F5E303D8501, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid91CC5300_AA55_E489_41DA_9FBD5BA002BDVideoPlayer)",
          "media": "this.video_150CD3E8_0356_631E_4181_C938348D61F8",
          "player": "this.viewer_uid91CC5300_AA55_E489_41DA_9FBD5BA002BDVideoPlayer"
        }
      ],
      "id": "PlayList_949F4533_AA4B_AC8E_41E4_4F5E303D8501"
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_B1CA37B8_A584_8160_41D9_B3B5FE455324",
      "levels": [
        {
          "url": "media/popup_B1CA27B8_A584_8160_41D2_2C9D47988006_0_0.jpeg",
          "class": "ImageResourceLevel",
          "width": 1600,
          "height": 1560
        },
        {
          "url": "media/popup_B1CA27B8_A584_8160_41D2_2C9D47988006_0_1.jpeg",
          "class": "ImageResourceLevel",
          "width": 1024,
          "height": 998
        },
        {
          "url": "media/popup_B1CA27B8_A584_8160_41D2_2C9D47988006_0_2.jpeg",
          "class": "ImageResourceLevel",
          "width": 512,
          "height": 499
        }
      ]
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window88208"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_9DF380FC_A5BB_E579_41CD_05ED098ACF52",
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
        "this.viewer_uid91CC5300_AA55_E489_41DA_9FBD5BA002BD"
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
        "name": "Window88344"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_9E6C83E5_A5B5_AB8A_419E_1A9B2C7426B5",
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
        "this.viewer_uid91CF0302_AA55_E489_41DC_FB57D1CB1BDD"
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
        "yaw": 34.56,
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
      "id": "camera_92AB34F0_AA55_ED89_41CC_31CB18CD057A"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 6.35,
      "id": "popup_0C8906FA_03B9_985E_4147_5BF3CBFA7926",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_0C8906FA_03B9_985E_4147_5BF3CBFA7926_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 576
          }
        ]
      },
      "pitch": 4.09,
      "yaw": -116.08,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 17.74,
      "autoplay": true,
      "id": "popup_B0C5F6A7_A5BC_6A5F_41DA_CA4B55551188",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": -1.42,
      "yaw": -83.3,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      }
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.73,
      "id": "popup_E51EA80B_A5D7_A49F_41B7_F65977B6F466",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_E51EA80B_A5D7_A49F_41B7_F65977B6F466_0_0.png",
            "class": "ImageResourceLevel"
          }
        ]
      },
      "pitch": 5.87,
      "yaw": -126.19,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid91CBB309_AA55_E49B_41D3_4EFA498124D9VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_E0335033_A5D5_E48F_41E2_9F20DEE75759, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_E0335033_A5D5_E48F_41E2_9F20DEE75759, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid91CBB309_AA55_E49B_41D3_4EFA498124D9VideoPlayer)",
          "media": "this.video_150CD3E8_0356_631E_4181_C938348D61F8",
          "player": "this.viewer_uid91CBB309_AA55_E49B_41D3_4EFA498124D9VideoPlayer"
        }
      ],
      "id": "PlayList_E0335033_A5D5_E48F_41E2_9F20DEE75759"
    },
    {
      "adjacentPanoramas": [
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0A36831A_0188_4710_4175_617FCB27EF2E"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": -83.29,
          "backwardYaw": 94.51,
          "distance": 1,
          "panorama": "this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C"
        },
        {
          "class": "AdjacentPanorama",
          "panorama": "this.panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482"
        },
        {
          "class": "AdjacentPanorama",
          "yaw": 89.34,
          "backwardYaw": 150.91,
          "distance": 1,
          "panorama": "this.panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B"
        }
      ],
      "hfov": 360,
      "label": "IMG_20260427_115712_00_013",
      "id": "panorama_0A3B0957_0188_4310_4171_529BD4203CE0",
      "thumbnailUrl": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_t.jpg",
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
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/f/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/f/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/f/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/u/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/u/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/u/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/r/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/r/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/r/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/b/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/b/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/b/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/d/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/d/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/d/2/{row}_{column}.jpg",
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
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/l/0/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 4,
                "tags": "ondemand",
                "colCount": 4,
                "width": 2048,
                "height": 2048
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/l/1/{row}_{column}.jpg",
                "class": "TiledImageResourceLevel",
                "rowCount": 2,
                "tags": "ondemand",
                "colCount": 2,
                "width": 1024,
                "height": 1024
              },
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0/l/2/{row}_{column}.jpg",
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
          "thumbnailUrl": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_t.jpg"
        }
      ],
      "vfov": 180,
      "mapLocations": [
        {
          "map": "this.map_0FB80333_02DE_2372_4183_9B067342910B",
          "class": "PanoramaMapLocation",
          "angle": 90.86,
          "y": 1132.71,
          "x": 418.35
        }
      ],
      "hfovMin": "150%",
      "overlays": [
        "this.popup_169B29D7_035A_6F32_4160_89030C356E9A",
        "this.popup_1543AE85_037E_6516_415B_C3F001C9EB53",
        "this.popup_168CD1FF_037A_1EF1_4182_BBDFB953060B",
        "this.popup_16FFF462_035A_6512_4182_B5D0BFACB539",
        "this.popup_160BBBD0_035E_230E_4188_83261CB51309",
        "this.overlay_29D96FAB_3F12_A2A7_41B9_03AF19D93CDD",
        "this.overlay_28137835_3F11_ADA2_41C1_553E676967A3",
        "this.overlay_2A7439D4_3F11_EEE1_4190_F877985C1A66",
        "this.overlay_29712258_3F1E_BDE1_416C_72D70B4B3964",
        "this.overlay_2A5806FB_3F1E_A2A7_41CD_953E0E63B7BE",
        "this.overlay_B2948298_A5AC_AA71_41C1_C58733D8CE62",
        "this.overlay_858AF291_A584_8320_41DC_A903C67DE69D",
        "this.overlay_E489D4F1_A5F5_6D8B_41E0_146A7E5F72D9",
        "this.overlay_E67632D3_A5F5_A58F_41C7_BDFF3AAE1B0F",
        "this.overlay_E5281C01_A5F5_FC8B_41D1_A982A56965E1",
        "this.overlay_E67BE795_A5F5_AB8B_4165_91083320CFB0",
        "this.overlay_E4EF8847_A5D7_A497_41E4_566BB93CF634",
        "this.popup_E51EA80B_A5D7_A49F_41B7_F65977B6F466",
        "this.overlay_9083DD85_A5BF_BF8A_41DF_3786D3709B5F",
        "this.overlay_9EDEB9D1_A5BC_E78A_41AA_E4A428852D4B",
        "this.overlay_9CBD51D7_A5BD_67B6_41C5_DF3E2429EFDB",
        "this.popup_9E704E92_A5BB_FD8E_41CE_73E7A0FC1F74",
        "this.popup_90976D30_A5BF_BC8A_41DD_499AC20A1D2D",
        "this.popup_9EEBA9A1_A5BC_E78B_41E1_FECA87A60F67"
      ]
    },
    {
      "class": "PlayList",
      "items": [
        {
          "class": "VideoPlayListItem",
          "start": "this.viewer_uid91B3E2FB_AA55_E57F_41D2_872175C314C5VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_E031D033_A5D5_E48F_41E3_9F8BB71298FF, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_E031D033_A5D5_E48F_41E3_9F8BB71298FF, 0)",
          "begin": "this.fixTogglePlayPauseButton(this.viewer_uid91B3E2FB_AA55_E57F_41D2_872175C314C5VideoPlayer)",
          "media": "this.video_150CD3E8_0356_631E_4181_C938348D61F8",
          "player": "this.viewer_uid91B3E2FB_AA55_E57F_41D2_872175C314C5VideoPlayer"
        }
      ],
      "id": "PlayList_E031D033_A5D5_E48F_41E3_9F8BB71298FF"
    },
    {
      "closeButtonPressedBackgroundColorDirection": "vertical",
      "closeButtonPressedIconColor": "#888888",
      "backgroundColorRatios": [],
      "data": {
        "name": "Window58468"
      },
      "closeButtonPressedBorderSize": 0,
      "bodyPaddingRight": 0,
      "id": "window_E56E9EAC_A5DB_BD9A_41E1_420A2B2CE768",
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
        "this.viewer_uid91B612F3_AA55_E58F_41D2_2043CDBE0CDD"
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
        "yaw": 72.25,
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
      "id": "camera_91F6E38E_AA55_EB96_41BE_05E7BF1158B9"
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 16.33,
      "autoplay": true,
      "id": "popup_9E704E92_A5BB_FD8E_41CE_73E7A0FC1F74",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "loop": false,
      "popupMaxHeight": "95%",
      "pitch": 0.5,
      "yaw": -87.86,
      "hideDuration": 500,
      "popupDistance": 100,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      }
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.MainViewer",
      "id": "MainViewerVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_E4FAEE8E_A5CC_9D96_41BE_0641638C6183",
      "levels": [
        {
          "url": "media/popup_E3E83004_A5F7_6489_4192_9FA3E16760C4_0_0.png",
          "class": "ImageResourceLevel",
          "width": 1055,
          "height": 1491
        },
        {
          "url": "media/popup_E3E83004_A5F7_6489_4192_9FA3E16760C4_0_1.png",
          "class": "ImageResourceLevel",
          "width": 724,
          "height": 1024
        },
        {
          "url": "media/popup_E3E83004_A5F7_6489_4192_9FA3E16760C4_0_2.png",
          "class": "ImageResourceLevel",
          "width": 362,
          "height": 512
        }
      ]
    },
    {
      "class": "ImageResource",
      "id": "ImageResource_1502D013_035A_1D32_4184_BBBCC865CAEA",
      "levels": [
        {
          "url": "media/popup_168CD1FF_037A_1EF1_4182_BBDFB953060B_0_0.jpeg",
          "class": "ImageResourceLevel",
          "width": 1221,
          "height": 1600
        },
        {
          "url": "media/popup_168CD1FF_037A_1EF1_4182_BBDFB953060B_0_1.jpeg",
          "class": "ImageResourceLevel",
          "width": 781,
          "height": 1024
        },
        {
          "url": "media/popup_168CD1FF_037A_1EF1_4182_BBDFB953060B_0_2.jpeg",
          "class": "ImageResourceLevel",
          "width": 390,
          "height": 512
        }
      ]
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
        "this.Image_B7FF91F6_A5AC_69B1_41DE_281431381DE9"
      ],
      "borderSize": 0,
      "paddingLeft": 15,
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
        "name": "UIComponent93506"
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
        "name": "ZoomImage93507"
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
        "name": "CloseButton93508"
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
      "maxHeight": 58,
      "toolTipFontFamily": "Arial",
      "propagateClick": true,
      "id": "IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081",
      "toolTipShadowSpread": 0,
      "paddingRight": 0,
      "toolTipBorderColor": "#767676",
      "paddingLeft": 0,
      "borderSize": 0,
      "width": 58,
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
      "height": 58,
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
      "maxWidth": 58,
      "data": {
        "name": "IconButton FULLSCREEN"
      },
      "toolTipTextShadowOpacity": 0
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid91C81308_AA55_E499_41E0_B05489907723",
      "id": "viewer_uid91C81308_AA55_E499_41E0_B05489907723VideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C13310_AA55_E48A_41D4_98614B3D47E6, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
      "media": "this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C13310_AA55_E48A_41D4_98614B3D47E6"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C1A311_AA55_E48B_41CC_F2875902C5C4, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
      "media": "this.panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C1A311_AA55_E48B_41CC_F2875902C5C4"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C07311_AA55_E48B_41DF_014FE8B64FBB, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
      "media": "this.panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C07311_AA55_E48B_41DF_014FE8B64FBB"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C0C312_AA55_E48E_41D9_71782736500C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
      "media": "this.panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C0C312_AA55_E48E_41D9_71782736500C"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A36831A_0188_4710_4175_617FCB27EF2E_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C08312_AA55_E48E_41DA_B78613314287, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
      "media": "this.panorama_0A36831A_0188_4710_4175_617FCB27EF2E",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C08312_AA55_E48E_41DA_B78613314287"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A3B0957_0188_4310_4171_529BD4203CE0_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C35312_AA55_E48E_41E1_2BD9632B89C6, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
      "media": "this.panorama_0A3B0957_0188_4310_4171_529BD4203CE0",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C35312_AA55_E48E_41E1_2BD9632B89C6"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C1A312_AA55_E48E_41DB_5AE0DCC63DA6, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
      "media": "this.panorama_0A301F8A_0189_BFF0_4158_8F11989100B6",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C1A312_AA55_E48E_41DB_5AE0DCC63DA6"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C07313_AA55_E48E_4190_DE5E9F0EECEA, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
      "media": "this.panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C07313_AA55_E48E_4190_DE5E9F0EECEA"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C0C313_AA55_E48E_41E1_FE718233C408, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
      "media": "this.panorama_0A3BBBDB_0189_C710_416D_B75CEF238602",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C0C313_AA55_E48E_41E1_FE718233C408"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A310265_0189_C130_416B_AC54D2B2339F_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C09313_AA55_E48E_41DF_828E80D22AB4, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
      "media": "this.panorama_0A310265_0189_C130_416B_AC54D2B2339F",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C09313_AA55_E48E_41DF_828E80D22AB4"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A38AE77_0189_C110_4171_BE63086A2049_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C36313_AA55_E48E_41E3_9303DADE6488, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
      "media": "this.panorama_0A38AE77_0189_C110_4171_BE63086A2049",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C36313_AA55_E48E_41E3_9303DADE6488"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C32314_AA55_E48A_41E4_5962C731B18C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
      "media": "this.panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C32314_AA55_E48A_41E4_5962C731B18C"
    },
    {
      "class": "PanoramaPlayListItem",
      "camera": "this.panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C3F314_AA55_E48A_41E4_2C4709E7B1F9, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 13)",
      "media": "this.panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C3F314_AA55_E48A_41E4_2C4709E7B1F9"
    },
    {
      "class": "PanoramaPlayListItem",
      "end": "this.trigger('tourEnded')",
      "camera": "this.panorama_1C1B63E6_0188_C730_416A_E102A28938A8_camera",
      "begin": "this.setMapLocation(this.PanoramaPlayListItem_91C24314_AA55_E48A_41A7_FB8C15BFBED1, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 13, 0)",
      "media": "this.panorama_1C1B63E6_0188_C730_416A_E102A28938A8",
      "player": "this.MainViewerPanoramaPlayer",
      "id": "PanoramaPlayListItem_91C24314_AA55_E48A_41A7_FB8C15BFBED1"
    },
    {
      "map": {
        "width": 80,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_0_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 929.34,
        "x": 397.29,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 929.34,
        "width": 80,
        "x": 397.15,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_0.png",
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
      "id": "overlay_3D0AA09F_2A27_F1D8_41B1_4D440A082F95",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_1_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1099,
        "x": 389.46,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1099,
        "width": 80,
        "x": 389.32,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_1.png",
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
      "id": "overlay_3D0AE09F_2A27_F1D8_4196_52C64E03E63B",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_2_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1858.97,
        "x": 703.28,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1858.97,
        "width": 80,
        "x": 703.13,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_2.png",
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
      "id": "overlay_3D0AF09F_2A27_F1D8_4192_84852342FBF0",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_3_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1868.95,
        "x": 399.15,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1868.95,
        "width": 80,
        "x": 399,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_3.png",
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
      "id": "overlay_3D0B20A0_2A27_F1E8_41B1_8AEF790943FE",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_4_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1848.01,
        "x": 96.15,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1848.01,
        "width": 80,
        "x": 95.87,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_4.png",
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
      "id": "overlay_3D0B30A0_2A27_F1E8_41B1_AFF8760D72F5",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_6_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 378.92,
        "x": 133.62,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 378.92,
        "width": 80,
        "x": 133.48,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_6.png",
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
      "id": "overlay_3D0B70A0_2A27_F1E8_41B5_E4AD7430FC2C",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_7_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 382.91,
        "x": 408.12,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 382.91,
        "width": 80,
        "x": 407.98,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_7.png",
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
      "id": "overlay_3D0B90A0_2A27_F1E8_41B6_6CBC6BAF40CA",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_8_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 446.3,
        "x": 723.22,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 446.3,
        "width": 80,
        "x": 723.08,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_8.png",
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
      "id": "overlay_3D0BA0A0_2A27_F1E8_41A6_B1F7FE65F80C",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_9_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 465.53,
        "x": 1080.48,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 465.53,
        "width": 80,
        "x": 1080.2,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_9.png",
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
      "id": "overlay_3D0BC0A0_2A27_F1E8_41BD_731434AE7DC3",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_10_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 461.54,
        "x": 1447.44,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 461.54,
        "width": 80,
        "x": 1447.29,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_10.png",
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
      "id": "overlay_3D0BD0A0_2A27_F1E8_41AD_AD7EE220DD52",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_11_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 121.51,
        "x": 1447.44,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 121.51,
        "width": 80,
        "x": 1447.29,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_11.png",
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
      "id": "overlay_3D0BE0A0_2A27_F1E8_41BB_9C71CAC6D0B8",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_12_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 745.58,
        "x": 395.01,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 745.58,
        "width": 80,
        "x": 394.87,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_12.png",
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
      "id": "overlay_3D0800A0_2A27_F1E8_41C3_DC4CE68A5443",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_5_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 921.08,
        "x": 94.3,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 921.08,
        "width": 80,
        "x": 94.02,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_5.png",
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
      "id": "overlay_3D0B40A0_2A27_F1E8_41C0_066151552EB2",
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
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_13_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 16
            }
          ]
        },
        "y": 1205.98,
        "x": 82.91,
        "offsetY": 0,
        "height": 80,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": false,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 80,
        "y": 1205.98,
        "width": 80,
        "x": 82.76,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_3DDC1625_2A24_10E9_41BB_9517D7DADA17_HS_13.png",
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
      "id": "overlay_91324AD2_8BFB_ED0E_41C7_2A775C61640E",
      "data": {
        "label": "Image"
      }
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
      "items": [
        {
          "hfov": 17.62,
          "image": "this.AnimatedImageResource_E51BBE6A_A5CC_9C99_41D1_17C2C00C91A4",
          "pitch": -32.01,
          "yaw": 75.74,
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
      "id": "overlay_E53184B1_A5FC_ED8B_41E0_8D9F24E6787F",
      "data": {
        "label": "Arrow 01c"
      },
      "maps": [
        {
          "hfov": 17.62,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 75.74,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0_HS_1_0_0_map.gif",
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
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 119.6,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0_HS_2_0.png",
                "class": "ImageResourceLevel",
                "width": 2048,
                "height": 1312
              }
            ]
          },
          "pitch": -17,
          "yaw": -7.93
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
      "id": "overlay_EF15E71C_A5DD_ECBA_41DC_9B81A85B3F2A",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 119.6,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -7.93,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0_HS_2_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 128
              }
            ]
          },
          "pitch": -17
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
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0_HS_3_00000.png",
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
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0_HS_3_00003.png",
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
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0_HS_3_00005.png",
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
          "toolTip": "Lemari Penyimpanan"
        }
      ],
      "id": "overlay_E61A5D0E_A5DB_9C99_41E4_D6AE9B47D766",
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
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0_HS_3_1_0_map.gif",
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
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0_HS_3_2_3_map.gif",
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
                "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0_HS_3_3_5_map.gif",
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
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid91CEA305_AA55_E48A_4199_70C2DEFC4DA6",
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
        "name": "ViewerArea93503"
      }
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid91CF8303_AA55_E48F_41B6_54BD2F4DCF44",
      "id": "viewer_uid91CF8303_AA55_E48F_41B6_54BD2F4DCF44VideoPlayer",
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
          "hfov": 27.33,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0_HS_7_0.png",
                "class": "ImageResourceLevel",
                "width": 455,
                "height": 854
              }
            ]
          },
          "pitch": -10.9,
          "yaw": 62.56
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
      "id": "overlay_B2E09E3D_A5AC_FAB3_41CD_02BE0E1A4D68",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 27.33,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 62.56,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0_HS_7_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 106,
                "height": 200
              }
            ]
          },
          "pitch": -10.9
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
          "toolTip": "Denah Ruangan",
          "click": "this.showPopupPanoramaOverlay(this.popup_B3AED1C7_A585_8121_41E2_AD0909A618A5, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_B3AEC1C7_A585_8121_41DF_C2E9B58E6B76, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 8.72,
          "image": "this.AnimatedImageResource_91B0C2F8_AA55_E57A_41D2_FA3D4C19445E",
          "pitch": 3,
          "yaw": 108.56,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_B3BD91E6_A585_80E3_41E3_78E18A34FB4E",
      "maps": [
        {
          "hfov": 8.72,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 108.56,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 3
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A3B0957_0188_4310_4171_529BD4203CE0, this.camera_9305A587_AA55_EF96_41DC_2194AF0EF757); this.mainPlayList.set('selectedIndex', 5)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.83,
          "image": "this.AnimatedImageResource_E52A3E57_A5CC_9CB6_418D_9FD50910EDC9",
          "pitch": -25.03,
          "yaw": 150.91,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E635768E_A5FC_AD99_41E3_F993EE331C03",
      "maps": [
        {
          "hfov": 18.83,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 150.91,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0_HS_10_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -25.03
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482, this.camera_932C55A8_AA55_EF99_41D0_0537F35443A6); this.mainPlayList.set('selectedIndex', 1)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.11,
          "image": "this.AnimatedImageResource_E52BCE57_A5CC_9CB6_41D9_65CBD952D22B",
          "pitch": -29.37,
          "yaw": -124.66,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E4E5F2C1_A5FC_E58F_41B9_DA40D149ADA5",
      "maps": [
        {
          "hfov": 18.11,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -124.66,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0_HS_11_0_0_map.gif",
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6, this.camera_93190597_AA55_EFB6_41D5_64EE02F1E8B0); this.mainPlayList.set('selectedIndex', 3)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 15.53,
          "image": "this.AnimatedImageResource_E8785131_AA5B_A48A_41CC_031114B4F983",
          "pitch": -41.65,
          "yaw": 59.87,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_91B039DF_AA5B_A7B6_41E0_4F9D4363958E",
      "maps": [
        {
          "hfov": 15.53,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 59.87,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0_HS_12_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -41.65
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_4_00002.png",
                "class": "ImageResourceLevel",
                "width": 936,
                "height": 936
              }
            ]
          },
          "pitch": 0,
          "yaw": -180
        },
        {
          "class": "HotspotPanoramaOverlayImage",
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_4_00003.png",
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_4_00004.png",
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_4_00005.png",
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
          "toolTip": "Lemari Barang"
        }
      ],
      "id": "overlay_BF4AE824_A594_A651_41C0_79F2A72F81B4",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 90,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -180,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_4_1_2_map.gif",
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_4_2_3_map.gif",
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_4_3_4_map.gif",
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
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_4_4_5_map.gif",
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B, this.camera_920F139C_AA55_EBBA_41B7_CD34DC5DB321); this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.87,
          "image": "this.AnimatedImageResource_E52B6E58_A5CC_9CBA_418C_D8BDCFBC867C",
          "pitch": -30.69,
          "yaw": 29.84,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E57E8349_A5FC_A49B_41CC_E9F94DBDA45D",
      "maps": [
        {
          "hfov": 17.87,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 29.84,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -30.69
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
          "click": "this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 15.9,
          "image": "this.AnimatedImageResource_9782E093_AA55_A58F_419E_6BB72B714219",
          "pitch": -18.44,
          "yaw": -31.48,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E61BE49E_A5FD_6DB6_41D7_2BC615AA2F12",
      "maps": [
        {
          "hfov": 15.9,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -31.48,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -18.44
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A36831A_0188_4710_4175_617FCB27EF2E, this.camera_91F6E38E_AA55_EB96_41BE_05E7BF1158B9); this.mainPlayList.set('selectedIndex', 4)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.58,
          "image": "this.AnimatedImageResource_9782D093_AA55_A58F_41B1_32B6963BB460",
          "pitch": -32.2,
          "yaw": -53.83,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9240DEDF_AA54_9DB6_41E1_70559133DC4B",
      "maps": [
        {
          "hfov": 17.58,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -53.83,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_8_0_0_map.gif",
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
          "toolTip": "Bahan Kimia yang Tidak Boleh Bercampur",
          "click": "this.showPopupPanoramaOverlay(this.popup_9137B630_AA5D_EC8A_41CC_FD9D8ACE034E, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9137A631_AA5D_EC8B_41E0_16D87B12CEF2, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 4.5,
          "image": "this.AnimatedImageResource_91B362FA_AA55_E579_41C2_D02DD0B6C772",
          "pitch": 3.94,
          "yaw": -6.41,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9143967C_AA5D_ED7A_41C8_73A5E6C0ADE2",
      "maps": [
        {
          "hfov": 4.5,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -6.41,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 3.94
        }
      ]
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid91C81308_AA55_E499_41E0_B05489907723",
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
        "name": "ViewerArea93504"
      }
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
      "maxHeight": 58,
      "toolTipFontFamily": "Arial",
      "propagateClick": true,
      "id": "IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781",
      "toolTipShadowSpread": 0,
      "paddingRight": 0,
      "toolTipBorderColor": "#767676",
      "paddingLeft": 0,
      "borderSize": 0,
      "width": 58,
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
      "iconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781.png",
      "pressedRollOverIconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_pressed_rollover.png",
      "minWidth": 1,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "mode": "toggle",
      "toolTipTextShadowBlurRadius": 3,
      "height": 58,
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
      "pressedIconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_pressed.png",
      "toolTipShadowHorizontalLength": 0,
      "toolTipPaddingRight": 6,
      "toolTipFontStyle": "normal",
      "cursor": "hand",
      "toolTipShadowVerticalLength": 0,
      "maxWidth": 58,
      "data": {
        "name": "IconButton HS "
      },
      "toolTipTextShadowOpacity": 0
    },
    {
      "transparencyActive": true,
      "maxHeight": 58,
      "toolTipFontFamily": "Arial",
      "toolTipShadowVerticalLength": 0,
      "propagateClick": true,
      "id": "IconButton_B156C269_BF46_B846_41B6_1BAAE2858250",
      "toolTipShadowSpread": 0,
      "paddingRight": 0,
      "toolTipBorderColor": "#767676",
      "paddingLeft": 0,
      "borderSize": 0,
      "width": 58,
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
      "iconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250.png",
      "pressedRollOverIconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_pressed_rollover.png",
      "minWidth": 1,
      "toolTipPaddingBottom": 4,
      "toolTipFontWeight": "normal",
      "mode": "toggle",
      "toolTipTextShadowBlurRadius": 3,
      "height": 58,
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
      "pressedIconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_pressed.png",
      "toolTipPaddingRight": 6,
      "toolTipFontStyle": "normal",
      "cursor": "hand",
      "toolTipShadowHorizontalLength": 0,
      "maxWidth": 58,
      "data": {
        "name": "IconButton GYRO"
      },
      "toolTipTextShadowOpacity": 0
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid91B612F3_AA55_E58F_41D2_2043CDBE0CDD",
      "id": "viewer_uid91B612F3_AA55_E58F_41D2_2043CDBE0CDDVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid91CBB309_AA55_E49B_41D3_4EFA498124D9",
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
        "name": "ViewerArea93505"
      }
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      },
      "hfov": 17.71,
      "autoplay": true,
      "id": "overlay_16C66F11_0356_230E_417C_671770291BB2",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_16C66F11_0356_230E_417C_671770291BB2_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": -1.4,
      "useHandCursor": true,
      "roll": -1.13,
      "yaw": -83.18,
      "rotationY": -2.44,
      "class": "VideoPanoramaOverlay",
      "rotationX": 5.56,
      "toolTip": "Klik untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_B0C5F6A7_A5BC_6A5F_41DA_CA4B55551188, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E56E9EAC_A5DB_BD9A_41E1_420A2B2CE768, this.video_150CD3E8_0356_631E_4181_C938348D61F8, this.PlayList_E0316033_A5D5_E48F_41B5_F35B9ABD4D09, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 9.83,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.51,
      "id": "popup_16C77E39_034A_257E_4174_5F7A568F2A5E",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_16C77E39_034A_257E_4174_5F7A568F2A5E_0_2.png",
            "class": "ImageResourceLevel",
            "width": 723,
            "height": 1024
          }
        ]
      },
      "pitch": 3.71,
      "yaw": 53.51,
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
      "id": "popup_0C88D6F8_03B9_985A_417D_6AF94A6DA452",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_0C88D6F8_03B9_985A_417D_6AF94A6DA452_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 576,
            "height": 1024
          }
        ]
      },
      "pitch": 3.44,
      "yaw": -138.64,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 3.96,
      "id": "popup_0C8676FC_03B9_985A_416B_17D46C431A37",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 5.82,
      "yaw": -83.53,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 16.83,
          "image": "this.AnimatedImageResource_27CD6F1A_3F13_E361_41BC_FD143A9D4D51",
          "pitch": -8.21,
          "yaw": 8.25,
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
          "click": "this.openLink('../index.htm?media-name=IMG_20260427_125005_00_041', '_self')"
        }
      ],
      "id": "overlay_2A12EF99_3F17_A363_41C5_7F41A704A5EB",
      "data": {
        "label": "Image"
      },
      "maps": [
        {
          "hfov": 16.83,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 8.25,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_15_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -8.21
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
          "toolTip": "Simbol-Simbol Bahan Bahan Kimia",
          "click": "this.showPopupPanoramaOverlay(this.popup_0C8906FA_03B9_985E_4147_5BF3CBFA7926, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_0C8906FA_03B9_985E_4187_FD8475BEFE46, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 6.35,
          "image": "this.AnimatedImageResource_27CDAF1B_3F13_E367_41A3_666BF831237F",
          "pitch": 4.09,
          "yaw": -116.08,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2BE733C9_3F17_A2E3_418F_B40F42DA9632",
      "maps": [
        {
          "hfov": 6.35,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -116.08,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_16_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 4.09
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
          "toolTip": "Bahan Kimia yang Tidak Boleh Disimpan Bersamaan",
          "click": "this.showPopupPanoramaOverlay(this.popup_0C89C6FA_03B9_985E_4189_31509CC1BC9D, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 8.13,
          "image": "this.AnimatedImageResource_27CDFF1B_3F13_E367_41C1_8045DA35D2D5",
          "pitch": 3.64,
          "yaw": -125.9,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2ABEB547_3F16_67EF_4198_00ECEB54F31F",
      "maps": [
        {
          "hfov": 8.13,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -125.9,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_17_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 3.64
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
          "toolTip": "Bahan Kimia Berbahaya",
          "click": "this.showPopupPanoramaOverlay(this.popup_E3E83004_A5F7_6489_4192_9FA3E16760C4, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_E4FAEE8E_A5CC_9D96_41BE_0641638C6183, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.94,
          "image": "this.AnimatedImageResource_92818080_AA4C_E58A_41D4_A93D9F7E936D",
          "pitch": 3.27,
          "yaw": -137.47,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2A4299FB_3F16_EEA7_41B2_3A8FF9A54A2D",
      "maps": [
        {
          "hfov": 7.94,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -137.47,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_18_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 3.27
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
          "toolTip": "Bahan Kimia yang Tidak Boleh Bercampur",
          "click": "this.showPopupPanoramaOverlay(this.popup_E0D10C23_A5F4_9C8F_41D2_2419D169479E, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_E4FB8E90_A5CC_9D89_41D1_075BB4996959, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 6.32,
          "image": "this.AnimatedImageResource_27CF1F1C_3F13_E361_41B6_8388D60CE97F",
          "pitch": 3.71,
          "yaw": 53.51,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2BFCA096_3F12_9D61_41C7_CEF63B2727C3",
      "maps": [
        {
          "hfov": 6.32,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 53.51,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_20_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 3.71
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
          "toolTip": "Denah Ruangan",
          "click": "this.showPopupPanoramaOverlay(this.popup_B1CA27B8_A584_8160_41D2_2C9D47988006, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_B1CA37B8_A584_8160_41D9_B3B5FE455324, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 8.34,
          "image": "this.AnimatedImageResource_846D3FE6_A583_80E0_41E2_810A495039A0",
          "pitch": 1.24,
          "yaw": 143.31,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_B1D9E7F5_A584_80E1_41C7_87142F4CCAEB",
      "maps": [
        {
          "hfov": 8.34,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 143.31,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_21_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 1.24
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 36.17,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_22_0.png",
                "class": "ImageResourceLevel",
                "width": 591,
                "height": 129
              }
            ]
          },
          "pitch": -0.62,
          "yaw": 18.18,
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
      "id": "overlay_B247671C_A585_8127_41BE_7164D22969B3",
      "data": {
        "label": "Pintu Keluar"
      },
      "maps": [
        {
          "hfov": 36.17,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 18.18,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_22_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 73,
                "height": 16
              }
            ]
          },
          "pitch": -0.62
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A36831A_0188_4710_4175_617FCB27EF2E, this.camera_9265E46F_AA55_EC96_41C5_620FE6312890); this.mainPlayList.set('selectedIndex', 4)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.22,
          "image": "this.AnimatedImageResource_846DBFE7_A583_80E0_41D4_19046F407C8A",
          "pitch": -13.32,
          "yaw": 118.24,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_B99F6117_A58C_8121_41E4_9655A2236E37",
      "maps": [
        {
          "hfov": 20.22,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 118.24,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_23_0_0_map.gif",
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
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482, this.camera_929C74C8_AA55_ED9A_41E4_41FED720906A); this.mainPlayList.set('selectedIndex', 1)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.12,
          "image": "this.AnimatedImageResource_846E0FE7_A583_80E0_41B4_134708166FF8",
          "pitch": -14.45,
          "yaw": 79.33,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_BE63A248_A58D_832F_41C9_1A086583EA14",
      "maps": [
        {
          "hfov": 20.12,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 79.33,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_25_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -14.45
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9, this.camera_9275F490_AA55_ED8A_41CD_3B7B784D26AD); this.mainPlayList.set('selectedIndex', 11)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.95,
          "image": "this.AnimatedImageResource_92860082_AA4C_E589_41E2_8017C1C0F5DE",
          "pitch": -16.91,
          "yaw": -85.55,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_BE2173DB_A58D_8121_41BF_02226197FAAD",
      "maps": [
        {
          "hfov": 18.95,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -85.55,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_27_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -16.91
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF, this.camera_928C34A3_AA55_ED8E_41DA_16507ED255B4); this.mainPlayList.set('selectedIndex', 7)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 15.43,
          "image": "this.AnimatedImageResource_9287F082_AA4C_E589_41D4_97E38EC7EE88",
          "pitch": -15.89,
          "yaw": -113.41,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_B9BEE577_A58D_81E1_41D7_A80FBFAB5286",
      "maps": [
        {
          "hfov": 15.43,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -113.41,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_28_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -15.89
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A310265_0189_C130_416B_AC54D2B2339F, this.camera_927C047F_AA55_ED77_41D3_89FEF8E00F24); this.mainPlayList.set('selectedIndex', 9)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.17,
          "image": "this.AnimatedImageResource_E8470E9B_AA4D_7DBF_41D3_304B52772278",
          "pitch": -23.51,
          "yaw": -42.05,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E8E72B57_AA4C_A4B6_41C6_1031C81D6B84",
      "maps": [
        {
          "hfov": 16.17,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -42.05,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_26_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -23.51
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A301F8A_0189_BFF0_4158_8F11989100B6, this.camera_926C1460_AA55_EC89_415C_A8559164EFF0); this.mainPlayList.set('selectedIndex', 6)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.18,
          "image": "this.AnimatedImageResource_97C5AC6C_AA54_BC9A_41E2_40E1180F09AC",
          "pitch": -40.27,
          "yaw": -177.82,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9145342F_AA55_6C96_41C1_64C9E804AAA7",
      "maps": [
        {
          "hfov": 20.18,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -177.82,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_30_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -40.27
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A3B0957_0188_4310_4171_529BD4203CE0, this.camera_928754B5_AA55_ED8A_41B3_9E2086D7D44E); this.mainPlayList.set('selectedIndex', 5)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.59,
          "image": "this.AnimatedImageResource_97C5DC6C_AA54_BC9A_41DE_79542612BEA9",
          "pitch": -37,
          "yaw": 94.51,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E935ACBC_AA55_9DFA_41CA_3E5945B6C663",
      "maps": [
        {
          "hfov": 16.59,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 94.51,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_31_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -37
        }
      ]
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid91CEA305_AA55_E48A_4199_70C2DEFC4DA6",
      "id": "viewer_uid91CEA305_AA55_E48A_4199_70C2DEFC4DA6VideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      },
      "hfov": 34.75,
      "autoplay": true,
      "id": "overlay_168BC68B_03D6_6512_416A_46A637755106",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_168BC68B_03D6_6512_416A_46A637755106_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 2.34,
      "useHandCursor": true,
      "roll": -1.99,
      "yaw": 34.08,
      "rotationY": 34,
      "class": "VideoPanoramaOverlay",
      "rotationX": -5.63,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_B3A03CEC_A5BC_7FD1_41CF_3A36B6DB932C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E5682EAF_A5DB_BD97_41C2_21022BA9DB3B, this.video_150CD3E8_0356_631E_4181_C938348D61F8, this.PlayList_E031A033_A5D5_E48F_41A0_A904D88E003E, '95%', '95%', true, true) }",
      "videoVisibleOnStop": false,
      "data": {
        "label": "Video"
      },
      "vfov": 19.69,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 4.81,
      "id": "popup_15501851_03D6_6D0E_4180_BFF2438BEA53",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_15501851_03D6_6D0E_4180_BFF2438BEA53_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 576,
            "height": 1024
          }
        ]
      },
      "pitch": 24.27,
      "yaw": -146.13,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 14.18,
      "id": "popup_0CEC7634_03BB_BBEA_4166_F7777F6D757D",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 16.34,
      "yaw": 31.95,
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
          "toolTip": "Simbol-Simbol Bahan Kimia",
          "click": "this.showPopupPanoramaOverlay(this.popup_1550B851_03D6_6D0E_4186_1652BA1940D3, {'iconLineWidth':10,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':10,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':10,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_1AF37B3B_0356_6372_4181_4F4AD783FE1C, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 11.39,
          "image": "this.AnimatedImageResource_94828512_AA4B_AC8E_41B5_50A37246F9B1",
          "pitch": 20.93,
          "yaw": -42.52,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_295E781F_3F11_AD9F_41C6_73A703B35E9B",
      "maps": [
        {
          "hfov": 11.39,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -42.52,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 20.93
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
          "toolTip": "Bahan Kimia yang Tidak Boleh Disimpan Bersamaan",
          "click": "this.showPopupPanoramaOverlay(this.popup_15508851_03D6_6D0E_4189_EF92784839A4, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 11.99,
          "image": "this.AnimatedImageResource_27C10F20_3F13_E3A1_41AB_7EDD4334A734",
          "pitch": 38.13,
          "yaw": -99.32,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2907EBE2_3F12_62A1_41C3_F7B1ED598FF7",
      "maps": [
        {
          "hfov": 11.99,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -99.32,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 38.13
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
          "toolTip": "Bahan Kimia Berbahaya",
          "click": "this.showPopupPanoramaOverlay(this.popup_E543C5C9_A5D5_AF9B_41D9_80294CA85573, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_E4ED1EA6_A5CC_9D89_41E2_EF8521DD1C96, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 8.63,
          "image": "this.AnimatedImageResource_9483F512_AA4B_AC8E_41CE_8A453DACC709",
          "pitch": 11.01,
          "yaw": -150.83,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_29914B95_3F12_A363_41AF_D228430E08F4",
      "maps": [
        {
          "hfov": 8.63,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -150.83,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_10_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 11.01
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A3BBBDB_0189_C710_416D_B75CEF238602, this.camera_92D52540_AA55_EC8A_41C8_10BD8A987222); this.mainPlayList.set('selectedIndex', 8)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.43,
          "image": "this.AnimatedImageResource_E5109E63_A5CC_9C8F_41CB_B41450B797E7",
          "pitch": -32.96,
          "yaw": 90.47,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E4B8F073_A5FF_E48F_41C0_B7B19F74D6B9",
      "maps": [
        {
          "hfov": 17.43,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 90.47,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_11_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -32.96
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C, this.camera_92C6D52D_AA55_EC9A_41DA_238E90AB20D6); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.19,
          "image": "this.AnimatedImageResource_E5104E63_A5CC_9C8F_41B1_4A2F34A22E5F",
          "pitch": -13.69,
          "yaw": 149.4,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E2833355_A5FF_A4B1_41E2_3CB5CFAA79AF",
      "maps": [
        {
          "hfov": 20.19,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 149.4,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_12_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -13.69
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A301F8A_0189_BFF0_4158_8F11989100B6, this.camera_92B3F519_AA55_ECBA_41D1_BA3609C69727); this.mainPlayList.set('selectedIndex', 6)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.6,
          "image": "this.AnimatedImageResource_E5102E63_A5CC_9C8F_41E3_F68B7F2B4DF3",
          "pitch": -19.36,
          "yaw": 178.87,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EE8F6174_A5FC_A48A_41D9_33AFD3AE6A69",
      "maps": [
        {
          "hfov": 19.6,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 178.87,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_13_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -19.36
        }
      ]
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid91CF8303_AA55_E48F_41B6_54BD2F4DCF44",
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
        "name": "ViewerArea93502"
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
          "toolTip": "Denah Ruangan",
          "click": "this.showPopupPanoramaOverlay(this.popup_B371A170_A584_81E0_41D5_9AE47427318B, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_B371B170_A584_81E0_41CF_6FD2CCD0C099, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.52,
          "image": "this.AnimatedImageResource_91B062F7_AA55_E577_41CD_A5B595B2508F",
          "pitch": 2.64,
          "yaw": 39.49,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_B288F190_A584_813F_41D9_381665B40A68",
      "maps": [
        {
          "hfov": 5.52,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 39.49,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0_HS_2_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 2.64
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C, this.camera_932355B8_AA55_EFFA_41B6_A8BC20FD4B93); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 20.59,
          "image": "this.AnimatedImageResource_E525AE55_A5CC_9C8A_41C8_9B9FBAD9E948",
          "pitch": -7.65,
          "yaw": 73.47,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E619F6CD_A5FB_AD9A_41CE_01A2C5F84D5B",
      "maps": [
        {
          "hfov": 20.59,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 73.47,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -7.65
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B, this.camera_9334E5C7_AA55_EF96_41C8_D3294097927A); this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.94,
          "image": "this.AnimatedImageResource_E5256E55_A5CC_9C8A_41C5_E10215877B02",
          "pitch": -30.31,
          "yaw": 6.99,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E4F2F3E5_A5FB_EB8A_41DC_60825C4A2AFB",
      "maps": [
        {
          "hfov": 17.94,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 6.99,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -30.31
        }
      ]
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_0_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 929.6,
        "x": 397.71,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 929.34,
        "width": 57.79,
        "x": 397.29,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_0.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_0F496EF8_02DE_62FF_417C_B578FF2A7005",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_1_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 1099.26,
        "x": 389.77,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 1099,
        "width": 57.79,
        "x": 389.46,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_1.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_0F433EF8_02DE_62FF_4185_86A0BE4ADDDC",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_2_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 1859.2,
        "x": 703.76,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 1858.97,
        "width": 57.79,
        "x": 703.28,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_2.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_0F432EF8_02DE_62FF_4181_BB844FEA0155",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_3_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 1869.18,
        "x": 399.56,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 1868.95,
        "width": 57.79,
        "x": 399.15,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_3.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_0F437EF8_02DE_62FF_4179_71A8E15F0C2A",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_4_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 1848.3,
        "x": 96.66,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 1848.01,
        "width": 57.79,
        "x": 96.15,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_4.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_0F435EF8_02DE_62FF_4183_35E398F723C8",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_6_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 379.23,
        "x": 133.99,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 378.92,
        "width": 57.79,
        "x": 133.62,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_6.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_0F43BEF8_02DE_62FF_4178_6427F9FD0E60",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_7_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 383.11,
        "x": 408.62,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 382.91,
        "width": 57.79,
        "x": 408.12,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_7.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_0F43AEF8_02DE_62FF_4186_06FBB7C7978D",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_8_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 446.5,
        "x": 723.72,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 446.3,
        "width": 57.79,
        "x": 723.22,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_8.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_0F438EF8_02DE_62FF_4148_418D5089A658",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_9_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 465.73,
        "x": 1080.96,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 465.53,
        "width": 57.79,
        "x": 1080.48,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_9.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_0F43FEF8_02DE_62FF_4170_53ED8D0B4E8E",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_10_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 461.84,
        "x": 1447.81,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 461.54,
        "width": 57.79,
        "x": 1447.44,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_10.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_0F43EEF8_02DE_62FF_4184_76F99C65A046",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_11_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 121.79,
        "x": 1447.81,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 121.51,
        "width": 57.79,
        "x": 1447.44,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_11.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_0F43DEF8_02DE_62FF_416F_111E878D0272",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_12_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 745.87,
        "x": 395.44,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 745.58,
        "width": 57.79,
        "x": 395.01,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_12.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_116D7E97_02FE_2532_4167_F8292A6ED69E",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_13_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 921.1,
        "x": 94.44,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 921.08,
        "width": 57.79,
        "x": 94.3,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_13.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_9034E0F8_8BFD_FEF9_41D4_4D851395BD2C",
      "data": {
        "label": "Image"
      }
    },
    {
      "map": {
        "width": 57.79,
        "class": "HotspotMapOverlayMap",
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_14_map.gif",
              "class": "ImageResourceLevel",
              "width": 16,
              "height": 18
            }
          ]
        },
        "y": 1206.08,
        "x": 82.98,
        "offsetY": 0,
        "height": 67.41,
        "offsetX": 0
      },
      "class": "AreaHotspotMapOverlay",
      "rollOverDisplay": true,
      "image": {
        "class": "HotspotMapOverlayImage",
        "height": 67.41,
        "y": 1205.98,
        "width": 57.79,
        "x": 82.91,
        "image": {
          "class": "ImageResource",
          "levels": [
            {
              "url": "media/map_0FB80333_02DE_2372_4183_9B067342910B_HS_14.png",
              "class": "ImageResourceLevel",
              "width": 57,
              "height": 134
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
      "id": "overlay_9034D0F8_8BFD_FEF9_41A9_4E51557967A3",
      "data": {
        "label": "Image"
      }
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      },
      "hfov": 29.54,
      "autoplay": false,
      "id": "overlay_15FD06BC_03DA_E576_4165_3AAC1B8B6FCF",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_15FD06BC_03DA_E576_4165_3AAC1B8B6FCF_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 1.57,
      "useHandCursor": true,
      "roll": -0.15,
      "yaw": -99.58,
      "rotationY": -30.69,
      "class": "VideoPanoramaOverlay",
      "rotationX": -2.15,
      "toolTip": "Klik untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_B2056AFE_A5B4_FBB1_4195_89B0D3BB02EA, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E568DEAF_A5DB_BD97_41DA_09DC5158EB83, this.video_150CD3E8_0356_631E_4181_C938348D61F8, this.PlayList_E030E033_A5D5_E48F_41E4_86F8E4C6D748, '95%', '95%', true, true) }; this.overlay_15FD06BC_03DA_E576_4165_3AAC1B8B6FCF.play()",
      "data": {
        "label": "Video"
      },
      "vfov": 16.75,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 18.96,
      "id": "popup_0C783E2A_03BB_8BFE_418B_066BA8E31E31",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 13.6,
      "yaw": -99.04,
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
          "toolTip": "Simbol-SImbol Bahan Kimia",
          "click": "this.showPopupPanoramaOverlay(this.popup_2AA8200F_3F12_9D60_41CB_49F8118C1EC4, {'iconLineWidth':10,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':10,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':10,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2AA8300F_3F12_9D60_4188_FFD8EB9E584A, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.99,
          "image": "this.AnimatedImageResource_94882519_AA4B_ACBA_41B2_74A7F9B8CE11",
          "pitch": 6.27,
          "yaw": -142.9,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2AA4B034_3F12_9DA1_41C6_8FA506CB93E1",
      "maps": [
        {
          "hfov": 5.99,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -142.9,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 6.27
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
          "toolTip": "Bahan Kimia yang Tidak Boleh Disimpan Bersamaan",
          "click": "this.showPopupPanoramaOverlay(this.popup_2AAB8010_3F12_9D61_41C0_E5FC13FD1498, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 6.2,
          "image": "this.AnimatedImageResource_9488D51A_AA4B_ACBE_41DB_F95D0C1F8411",
          "pitch": 5.56,
          "yaw": -157.86,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2AA4C034_3F12_9DA1_41C7_2AB882E261EA",
      "maps": [
        {
          "hfov": 6.2,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -157.86,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 5.56
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
          "toolTip": "Bahan Kimia Bebahaya",
          "click": "this.showPopupPanoramaOverlay(this.popup_E4D77983_A5D4_A78F_41CA_2557DA3DC454, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_E4DB7EB0_A5CC_9D8A_41E2_8E68D0225663, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.07,
          "image": "this.AnimatedImageResource_9488A51A_AA4B_ACBE_41A7_E1EA1EAE3789",
          "pitch": 5.07,
          "yaw": -171.89,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2AA4E034_3F12_9DA1_414B_B67E51975328",
      "maps": [
        {
          "hfov": 5.07,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -171.89,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 5.07
        }
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 11.96,
      "id": "popup_2AA9100D_3F12_9D63_41C1_179E7BA65D3D",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 14.08,
      "yaw": -98.29,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 5.14,
      "id": "popup_2AABC011_3F12_9D63_4192_DFEDA19CBE08",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_2AABC011_3F12_9D63_4192_DFEDA19CBE08_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 576,
            "height": 1024
          }
        ]
      },
      "pitch": 12.93,
      "yaw": -171.44,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 19.93,
          "image": "this.AnimatedImageResource_B51439B5_A57F_8161_41E1_4286865F5DB4",
          "pitch": -3.81,
          "yaw": -15.67,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Hanya Kepala Laboratorium (Kalab) dan Laboran yang diperkenankan masuk."
        }
      ],
      "id": "overlay_B362A391_A5B5_AA73_41C9_098C7C0A84C9",
      "data": {
        "label": "Info Red 07"
      },
      "maps": [
        {
          "hfov": 19.93,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -15.67,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -3.81
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "hfov": 14.08,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_9_0.png",
                "class": "ImageResourceLevel",
                "width": 230,
                "height": 235
              }
            ]
          },
          "pitch": -3.66,
          "yaw": -15.56
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Ruang Kepala Laboratorium"
        }
      ],
      "id": "overlay_B362B391_A5B5_AA73_41D0_29167ADE793D",
      "data": {
        "label": "Image"
      },
      "maps": [
        {
          "hfov": 14.08,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -15.56,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -3.66
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A3BBBDB_0189_C710_416D_B75CEF238602, this.camera_9235C40F_AA55_EC97_41D5_07560A058DE1); this.mainPlayList.set('selectedIndex', 8)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.34,
          "image": "this.AnimatedImageResource_E51A9E69_A5CC_9C9A_41E1_2D84B68A800A",
          "pitch": -28.05,
          "yaw": -145.44,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E52D8691_A5FD_ED8A_41BB_C8C7918E9835",
      "maps": [
        {
          "hfov": 18.34,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -145.44,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_10_0_0_map.gif",
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
          "click": "this.startPanoramaWithCamera(this.panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC, this.camera_9225E3E9_AA55_EB9A_41DD_9DC4E925129E); this.mainPlayList.set('selectedIndex', 12)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.4,
          "image": "this.AnimatedImageResource_E51A4E6A_A5CC_9C99_41D3_3FAECEDA24FD",
          "pitch": -27.67,
          "yaw": 9.44,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E3715875_A5FD_A48B_4188_7F4712B0042D",
      "maps": [
        {
          "hfov": 18.4,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 9.44,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_11_0_0_map.gif",
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
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "click": "this.startPanoramaWithCamera(this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C, this.camera_9222F3FC_AA55_EB79_41D2_8E9339A217DD); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.56,
          "image": "this.AnimatedImageResource_E51A2E6A_A5CC_9C99_41DB_668C7D7C7027",
          "pitch": -19.74,
          "yaw": 137.12,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E58E1577_A5FD_6F77_41D5_C2DAA41ADC1A",
      "maps": [
        {
          "hfov": 19.56,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 137.12,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_12_0_0_map.gif",
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
          "toolTip": "Denah Ruangan",
          "click": "this.showPopupPanoramaOverlay(this.popup_17DA680E_0356_2D12_4172_1C397EC042BE, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_0F40409A_03B7_B8DE_4182_BF302FEE44EE, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 14.01,
          "image": "this.AnimatedImageResource_91B312FA_AA55_E579_41E1_999880B07806",
          "pitch": 6.24,
          "yaw": -68.14,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_29802E00_3F12_A561_41AF_7C7D2F54AEF0",
      "maps": [
        {
          "hfov": 14.01,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -68.14,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 6.24
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      },
      "hfov": 15.09,
      "autoplay": true,
      "id": "overlay_278E3925_3F2F_AFA3_41C4_9E48B8B0F840",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_278E3925_3F2F_AFA3_41C4_9E48B8B0F840_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 0.97,
      "useHandCursor": true,
      "roll": -0.58,
      "yaw": 92.25,
      "rotationY": 11.86,
      "class": "VideoPanoramaOverlay",
      "rotationX": -9.74,
      "toolTip": "Klik untuk Menonton",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_BFD8C5B3_A593_E9B7_41DA_37B2A90C654F, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E56F4EAE_A5DB_BD99_41E1_220188150050, this.video_150CD3E8_0356_631E_4181_C938348D61F8, this.PlayList_E031D033_A5D5_E48F_41E3_9F8BB71298FF, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 8.05,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 3.95,
      "id": "popup_277A7905_3F2F_AF60_41C6_48C710204527",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 7.55,
      "yaw": 92.77,
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A301F8A_0189_BFF0_4158_8F11989100B6, this.camera_92453430_AA55_EC8A_41D0_3705199CB687); this.mainPlayList.set('selectedIndex', 6)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 15.39,
          "image": "this.AnimatedImageResource_E5296E5A_A5CC_9CBE_41D0_1AD81557E7B6",
          "pitch": -42.21,
          "yaw": 85.75,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E514485B_A5FD_E4BE_418E_816A8FE91EE5",
      "maps": [
        {
          "hfov": 15.39,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 85.75,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0_HS_6_0_0_map.gif",
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C, this.camera_9242A440_AA55_EC8A_41C7_357FA6B40746); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.8,
          "image": "this.AnimatedImageResource_E52EDE5A_A5CC_9CBE_41DA_F9B35892927B",
          "pitch": -17.66,
          "yaw": 132.97,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E6A6455E_A5FD_ACB9_41D6_40081C9F5C17",
      "maps": [
        {
          "hfov": 19.8,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 132.97,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0_HS_7_0_0_map.gif",
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
          "toolTip": "Bahan-Bahan Kimia yang Tidak Boleh Bercampur",
          "click": "this.showPopupPanoramaOverlay(this.popup_E60794C1_A5CB_AD8A_41B1_0061B7A38CB6, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_E60784C1_A5CB_AD8A_41D1_3B05E7887F47, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 4.89,
          "image": "this.AnimatedImageResource_E52E7E5C_A5CC_9CB9_41AE_549E8036A884",
          "pitch": 4.66,
          "yaw": 180,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E5F2C4FA_A5CB_AD7E_4190_D00685806767",
      "maps": [
        {
          "hfov": 4.89,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 180,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 4.66
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6, this.camera_92553450_AA55_EC8A_41DA_B61E5C61BA9E); this.mainPlayList.set('selectedIndex', 3)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 22.06,
          "image": "this.AnimatedImageResource_9AC7963D_A5CB_6CFA_41DD_2A342EA36059",
          "pitch": -37.4,
          "yaw": -107.75,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9C90D574_A5CB_6C8A_41BC_BCF2BA55C478",
      "maps": [
        {
          "hfov": 22.06,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -107.75,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0_HS_10_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -37.4
        }
      ]
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid91CF0302_AA55_E489_41DC_FB57D1CB1BDD",
      "id": "viewer_uid91CF0302_AA55_E489_41DC_FB57D1CB1BDDVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      },
      "hfov": 41.55,
      "autoplay": true,
      "id": "overlay_169472B1_0356_3D0E_4188_EA2C84B32AE8",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_169472B1_0356_3D0E_4188_EA2C84B32AE8_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 2.36,
      "useHandCursor": true,
      "roll": -0.55,
      "yaw": -47.13,
      "rotationY": 0.52,
      "class": "VideoPanoramaOverlay",
      "rotationX": -1.02,
      "toolTip": "Klik untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_BD60E926_A5B4_6650_41DE_0CDA107BEF0A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E568AEAF_A5DB_BD97_41C7_F70A71165964, this.video_150CD3E8_0356_631E_4181_C938348D61F8, this.PlayList_E0301033_A5D5_E48F_41DE_BE8721765421, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 23.29,
      "distance": 50
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 18.12,
      "id": "popup_151A4A9D_03D6_2D31_4182_5B97AD7D2F02",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_151A4A9D_03D6_2D31_4182_5B97AD7D2F02_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 576,
            "height": 1024
          }
        ]
      },
      "pitch": 7.08,
      "yaw": -167.85,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 38.97,
      "id": "popup_151BCA9D_03D6_2D31_4140_A83DB21329C7",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_151BCA9D_03D6_2D31_4140_A83DB21329C7_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 1024,
            "height": 576
          }
        ]
      },
      "pitch": 10.27,
      "yaw": -121.74,
      "hideDuration": 500,
      "popupDistance": 100
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 18.09,
      "id": "popup_151B2A9D_03D6_2D31_4189_59DE99FA2400",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_151B2A9D_03D6_2D31_4189_59DE99FA2400_0_0.png",
            "class": "ImageResourceLevel",
            "width": 658,
            "height": 565
          },
          {
            "url": "media/popup_151B2A9D_03D6_2D31_4189_59DE99FA2400_0_1.png",
            "class": "ImageResourceLevel",
            "width": 512,
            "height": 439
          }
        ]
      },
      "pitch": 7.91,
      "yaw": -147.28,
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
          "toolTip": "Simbol-Simbol Bahan Kimia",
          "click": "this.showPopupPanoramaOverlay(this.popup_29132B0D_3F13_E363_41C4_446D76E5985C, {'iconLineWidth':10,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':10,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':10,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_29132B0D_3F13_E363_41CD_753B84771ACC, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 8.29,
          "image": "this.AnimatedImageResource_9485D516_AA4B_ACB6_41E0_19A68AC3553D",
          "pitch": 10.97,
          "yaw": -122.16,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_293A5B30_3F13_E3A1_41C0_E5F6E54E9B9A",
      "maps": [
        {
          "hfov": 8.29,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -122.16,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 10.97
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
          "toolTip": "Bahan Kimia yang Tidak Boleh Disimpan Bersamaan",
          "click": "this.showPopupPanoramaOverlay(this.popup_2913EB0D_3F13_E363_4192_CFFA34EF2479, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 9.36,
          "image": "this.AnimatedImageResource_94859517_AA4B_ACB7_41C9_A0BEE60CFB42",
          "pitch": 8.87,
          "yaw": -147.57,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_293ABB30_3F13_E3A1_41B1_E59081E1EAC1",
      "maps": [
        {
          "hfov": 9.36,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -147.57,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 8.87
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
          "toolTip": "Bahan Kimia Berbahaya",
          "click": "this.showPopupPanoramaOverlay(this.popup_E4E4E809_A5D5_649D_41DE_2E543F4667AD, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_E4D10EAC_A5CC_9D99_41E2_646156BF72C9, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 7.79,
          "image": "this.AnimatedImageResource_94865517_AA4B_ACB7_41D3_07065DD3C5A0",
          "pitch": 7.24,
          "yaw": -167.66,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_293A8B30_3F13_E3A1_41A2_AFCB8BEABD2C",
      "maps": [
        {
          "hfov": 7.79,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -167.66,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_10_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 7.24
        }
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 5.01,
      "id": "popup_29121B0E_3F13_E361_41C9_0D0AE550CBDB",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/popup_29121B0E_3F13_E361_41C9_0D0AE550CBDB_0_2.jpg",
            "class": "ImageResourceLevel",
            "width": 576,
            "height": 1024
          }
        ]
      },
      "pitch": 18.22,
      "yaw": -166.9,
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A310265_0189_C130_416B_AC54D2B2339F, this.camera_92AB34F0_AA55_ED89_41CC_31CB18CD057A); this.mainPlayList.set('selectedIndex', 9)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.65,
          "image": "this.AnimatedImageResource_E517FE65_A5CC_9C8B_41AE_7D3F3885855F",
          "pitch": -31.83,
          "yaw": 53.83,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E49FB99F_A5FC_E7B7_41DC_D8517916A34C",
      "maps": [
        {
          "hfov": 17.65,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 53.83,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_11_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -31.83
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9, this.camera_92BE4504_AA55_EC8A_41E2_D18D133A81D2); this.mainPlayList.set('selectedIndex', 11)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.31,
          "image": "this.AnimatedImageResource_E517AE65_A5CC_9C8B_419D_9D5A9024B04E",
          "pitch": -21.63,
          "yaw": 128.25,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E22F2911_A5FD_648A_41D8_E54CD8231BDE",
      "maps": [
        {
          "hfov": 19.31,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 128.25,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_12_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -21.63
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF, this.camera_929614DB_AA55_EDBF_41E3_65FDEEF63FE2); this.mainPlayList.set('selectedIndex', 7)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 16.89,
          "image": "this.AnimatedImageResource_E5170E66_A5CC_9C96_41D3_EA01F5B791C5",
          "pitch": -35.6,
          "yaw": -135.05,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_EF4E8C62_A5FD_BC8E_41D8_22F80FCC01B4",
      "maps": [
        {
          "hfov": 16.89,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -135.05,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_13_0_0_map.gif",
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
          "click": "this.mainPlayList.set('selectedIndex', 10)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.32,
          "image": "this.AnimatedImageResource_E51CEE6E_A5CC_9C96_41D1_CD9520F1B98F",
          "pitch": -33.53,
          "yaw": -126.36,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E53DB9FB_A5F4_A77F_4193_0AE8C0B1743B",
      "maps": [
        {
          "hfov": 17.32,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -126.36,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_2_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -33.53
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
          "click": "this.startPanoramaWithCamera(this.panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC, this.camera_92329420_AA55_EC89_41D3_B20629B4AEEE); this.mainPlayList.set('selectedIndex', 12)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.49,
          "image": "this.AnimatedImageResource_E51C4E70_A5CC_9C89_41DA_DA2AAB456524",
          "pitch": -27.1,
          "yaw": 133.91,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E3C3F627_A5F4_EC96_41E2_8F4FFBBCF212",
      "maps": [
        {
          "hfov": 18.49,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 133.91,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_3_0_0_map.gif",
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
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 50.62,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_4_0.png",
                "class": "ImageResourceLevel",
                "width": 1067,
                "height": 2048
              }
            ]
          },
          "pitch": -14.69,
          "yaw": -62.52
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
      "id": "overlay_E6756931_A5F5_A48B_41C8_67A5599F936D",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 50.62,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -62.52,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_4_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 104,
                "height": 200
              }
            ]
          },
          "pitch": -14.69
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
          "hfov": 46.82,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_5_0.png",
                "class": "ImageResourceLevel",
                "width": 982,
                "height": 2048
              }
            ]
          },
          "pitch": -13.32,
          "yaw": -20.21
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
      "id": "overlay_E61DEC70_A5CB_FC8A_418A_11228020A983",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 46.82,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -20.21,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_5_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 95,
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
          "hfov": 70.43,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_6_0.png",
                "class": "ImageResourceLevel",
                "width": 2048,
                "height": 1655
              }
            ]
          },
          "pitch": -8.85,
          "yaw": 41.93
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
      "id": "overlay_E40B11EA_A5CF_679E_41D7_87AF42CDE964",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 70.43,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 41.93,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_6_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 200,
                "height": 161
              }
            ]
          },
          "pitch": -8.85
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
          "hfov": 32.92,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_7_0.png",
                "class": "ImageResourceLevel",
                "width": 709,
                "height": 2048
              }
            ]
          },
          "pitch": -6.89,
          "yaw": 90.47
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
      "id": "overlay_E4DD814C_A5D4_A49A_41A9_BFD04115A7EF",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 32.92,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 90.47,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_7_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 69,
                "height": 200
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
      "rollOverDisplay": true,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "roll": 0,
          "hfov": 33.62,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_8_0.png",
                "class": "ImageResourceLevel",
                "width": 1014,
                "height": 2048
              }
            ]
          },
          "pitch": -11.8,
          "yaw": -99.35
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
      "id": "overlay_E4956352_A5D4_A489_419B_AB5FDD95D09A",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 33.62,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -99.35,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_8_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 99,
                "height": 200
              }
            ]
          },
          "pitch": -11.8
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
          "hfov": 33.02,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_9_0.png",
                "class": "ImageResourceLevel",
                "width": 748,
                "height": 2048
              }
            ]
          },
          "pitch": -7.08,
          "yaw": -158.47
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
      "id": "overlay_E204920E_A5DC_E499_41D3_9987A1387686",
      "data": {
        "label": "Polygon"
      },
      "maps": [
        {
          "hfov": 33.02,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -158.47,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_9_1_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 73,
                "height": 200
              }
            ]
          },
          "pitch": -7.08
        }
      ]
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid91B3E2FB_AA55_E57F_41D2_872175C314C5",
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
        "name": "ViewerArea93499"
      }
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      },
      "hfov": 21.53,
      "autoplay": false,
      "id": "overlay_16BA2777_034A_E3F2_4156_90152416B2F9",
      "enabledInCardboard": true,
      "loop": false,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_16BA2777_034A_E3F2_4156_90152416B2F9_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 1.4,
      "useHandCursor": true,
      "roll": -0.2,
      "yaw": 88,
      "rotationY": 0.99,
      "class": "VideoPanoramaOverlay",
      "rotationX": 2.06,
      "toolTip": "Klik untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_B22EF102_A5B5_A651_41DA_CB10533BC85A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_E5694EB0_A5DB_BD8A_41B3_1D4DBAD77A16, this.video_150CD3E8_0356_631E_4181_C938348D61F8, this.PlayList_E0335033_A5D5_E48F_41E2_9F20DEE75759, '95%', '95%', true, true) }; this.overlay_16BA2777_034A_E3F2_4156_90152416B2F9.play()",
      "data": {
        "label": "Video"
      },
      "vfov": 11.91,
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
          "click": "this.showPopupPanoramaOverlay(this.popup_2A14585D_3F12_6DE3_41B0_AFFCA1053256, {'iconLineWidth':10,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':10,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':10,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_2A14285D_3F12_6DE3_41C2_4F3DFF819947, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 6.45,
          "image": "this.AnimatedImageResource_948C651D_AA4B_ACBB_41C1_AAB441E1A7F7",
          "pitch": 7.8,
          "yaw": 47.49,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2A20B884_3F12_6D61_41A0_73D213C95FCC",
      "maps": [
        {
          "hfov": 6.45,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 47.49,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_8_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 7.8
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
          "click": "this.showPopupPanoramaOverlay(this.popup_2A17F85E_3F12_6DE1_41B3_1D8C132C7E0B, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 9.08,
          "image": "this.AnimatedImageResource_948C151D_AA4B_ACBB_41D9_D8DA8000170A",
          "pitch": 8.13,
          "yaw": 33.3,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2A208884_3F12_6D61_41C9_7357BB190E78",
      "maps": [
        {
          "hfov": 9.08,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 33.3,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_9_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 8.13
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
          "toolTip": "Bahan Kimia Berbahaya",
          "click": "this.showPopupPanoramaOverlay(this.popup_E4C58759_A5D5_6CBA_41CD_81091F771885, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_E4DD8EB8_A5CC_9DF9_41B5_8B277AB81858, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 9.32,
          "image": "this.AnimatedImageResource_948CC51E_AA4B_ACB9_41DD_02654B044D41",
          "pitch": 8.84,
          "yaw": 14.56,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2A209884_3F12_6D61_41CC_B89F6A009D88",
      "maps": [
        {
          "hfov": 9.32,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 14.56,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_10_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 8.84
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
          "toolTip": "Bahan-Bahan Kimia yang Tidak Boleh Bercampur",
          "click": "this.showPopupPanoramaOverlay(this.popup_15306F7E_034A_E3F2_417F_DDC4DDED48A4, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_15306F7E_034A_E3F2_4173_55B31D74DF91, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 12.14,
          "image": "this.AnimatedImageResource_27DFEF23_3F13_E3A7_41CD_C9B93A416CEC",
          "pitch": 6.64,
          "yaw": -128.49,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2A920BEE_3F16_62A1_41BD_808A9EE5A9CC",
      "maps": [
        {
          "hfov": 12.14,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -128.49,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_11_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 6.64
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 20.21,
          "image": "this.AnimatedImageResource_27DE3F24_3F13_E3A1_41B5_1CAC591875AB",
          "pitch": -1.78,
          "yaw": -158.63,
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
          "click": "this.openLink('../index.htm?media-name=IMG_20260427_125005_00_041', '_self')"
        }
      ],
      "id": "overlay_29659316_3F16_E361_41C7_BBE17360E474",
      "data": {
        "label": "Image"
      },
      "maps": [
        {
          "hfov": 20.21,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -158.63,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_12_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -1.78
        }
      ]
    },
    {
      "rotationY": 0,
      "class": "PopupPanoramaOverlay",
      "popupMaxWidth": "95%",
      "showDuration": 500,
      "showEasing": "cubic_in",
      "hfov": 14.38,
      "id": "popup_2A15785D_3F12_6DE3_41C5_7A28CB9AEE92",
      "rotationX": 0,
      "rotationZ": 0,
      "hideEasing": "cubic_out",
      "popupMaxHeight": "95%",
      "pitch": 13.32,
      "yaw": 88.23,
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C, this.camera_920533AB_AA55_EB9F_41D3_A32D2A00295E); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.88,
          "image": "this.AnimatedImageResource_E51EEE6C_A5CC_9C9A_41DB_F2566C9A76BD",
          "pitch": -24.65,
          "yaw": -87.07,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E4D875FC_A5FB_6F7A_41CB_60C6A196CAC2",
      "maps": [
        {
          "hfov": 18.88,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -87.07,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_13_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -24.65
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A3BBBDB_0189_C710_416D_B75CEF238602, this.camera_921D63BA_AA55_EBF9_41E0_5A27BC5059F6); this.mainPlayList.set('selectedIndex', 8)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.41,
          "image": "this.AnimatedImageResource_E51EAE6D_A5CC_9C9A_41CA_247865F4174B",
          "pitch": -20.87,
          "yaw": 87.83,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E31E3EE4_A5FB_9D8B_41B3_36F9DCE2B5EE",
      "maps": [
        {
          "hfov": 19.41,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 87.83,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_14_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -20.87
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 9.9,
          "image": "this.AnimatedImageResource_BC549789_A58D_8121_41A3_A548B2F97030",
          "pitch": 0.4,
          "yaw": 96.84,
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
          "click": "this.openLink('../index.htm?media-name=IMG_20260427_125005_00_041', '_self')"
        }
      ],
      "id": "overlay_28818DC2_3F1F_A6E1_41AB_B69C0E19494C",
      "data": {
        "label": "Image"
      },
      "maps": [
        {
          "hfov": 9.9,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 96.84,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 0.4
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
          "click": "this.showPopupPanoramaOverlay(this.popup_46308A41_5E08_14EB_41C2_995950235495, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_4630AA41_5E08_14EB_41CD_1287690973D0, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 8.82,
          "image": "this.AnimatedImageResource_49B03F36_5E08_0C96_41B6_45337EE972F3",
          "pitch": 4.15,
          "yaw": -152.54,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_465E0A86_5E08_1476_4196_4D5D13356765",
      "maps": [
        {
          "hfov": 8.82,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -152.54,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 4.15
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 35.97,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_6_0.png",
                "class": "ImageResourceLevel",
                "width": 592,
                "height": 129
              }
            ]
          },
          "pitch": 6.53,
          "yaw": 106.22,
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
      "id": "overlay_B239FF9D_A584_8120_41D2_7127F4A7B206",
      "data": {
        "label": "Pintu Keluar"
      },
      "maps": [
        {
          "hfov": 35.97,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 106.22,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_6_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 73,
                "height": 16
              }
            ]
          },
          "pitch": 6.53
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF, this.camera_91E00361_AA55_E48B_41AD_F0C89E885C30); this.mainPlayList.set('selectedIndex', 7)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.02,
          "image": "this.AnimatedImageResource_E5120E5F_A5CC_9CB6_41B6_D2FA84B13A03",
          "pitch": -23.7,
          "yaw": 10.2,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E546534E_A5FC_E496_41A5_BC3F0D81587F",
      "maps": [
        {
          "hfov": 19.02,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 10.2,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_7_0_0_map.gif",
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C, this.camera_91FAF37E_AA55_EB79_41D6_BC7E23F5A742); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01c"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.74,
          "image": "this.AnimatedImageResource_E5139E5F_A5CC_9CB6_41D0_0095878007A4",
          "pitch": -25.59,
          "yaw": 97.84,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E3FC2D83_A5FC_BF8E_41D7_566062E00482",
      "maps": [
        {
          "hfov": 18.74,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 97.84,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_8_0_0_map.gif",
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A36831A_0188_4710_4175_617FCB27EF2E, this.camera_91FF5370_AA55_E489_41D0_6F6B734E3F18); this.mainPlayList.set('selectedIndex', 4)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 14.53,
          "image": "this.AnimatedImageResource_E5135E5F_A5CC_9CB6_41AD_2AA3B4EF17E3",
          "pitch": -45.61,
          "yaw": -177.92,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E1A85BAA_A5FF_7B91_41C5_7FEFA1ABE58A",
      "maps": [
        {
          "hfov": 14.53,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -177.92,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_9_0_0_map.gif",
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
      "rollOverDisplay": false,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Bahan Kimia Berbahaya",
          "click": "this.showPopupPanoramaOverlay(this.popup_E56398C9_A5D4_E59B_41D3_DD45F570B33B, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 13.09,
          "image": "this.AnimatedImageResource_E5130E61_A5CC_9C8B_41D4_2DC098F5AA79",
          "pitch": 11.42,
          "yaw": -16.56,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E57778F8_A5D4_E57A_41D5_CF7530F6981B",
      "maps": [
        {
          "hfov": 13.09,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -16.56,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_10_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 11.42
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      },
      "hfov": 16.79,
      "autoplay": true,
      "id": "overlay_9E7703D9_A5B5_ABBB_41D1_6FC0F5AF0084",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_9E7703D9_A5B5_ABBB_41D1_6FC0F5AF0084_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 1.07,
      "useHandCursor": true,
      "roll": -0.43,
      "yaw": 24.27,
      "rotationY": 7.15,
      "class": "VideoPanoramaOverlay",
      "rotationX": 1.32,
      "toolTip": "Klik untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_9E8573A1_A5B5_AB8B_41B1_95E3886F75B9, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_9E6C83E5_A5B5_AB8A_419E_1A9B2C7426B5, this.video_150CD3E8_0356_631E_4181_C938348D61F8, this.PlayList_949FF533_AA4B_AC8E_41D2_B2130B408223, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 9.29,
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
          "toolTip": "Bahan Kimia yang Tidak Boleh Bercampur",
          "click": "this.showPopupPanoramaOverlay(this.popup_9105354A_AA5D_6C9E_41CD_A955AE2C7AD9, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9105454A_AA5D_6C9E_41D2_DA70BDA0C51C, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 4.3,
          "image": "this.AnimatedImageResource_91CF2302_AA55_E489_418E_74C79A374D7A",
          "pitch": 4.91,
          "yaw": 125.5,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9117257D_AA5D_6F7A_41D9_C9126FB0A318",
      "maps": [
        {
          "hfov": 4.3,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 125.5,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_11_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 4.91
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 19.97,
          "image": "this.AnimatedImageResource_324B1850_2A5C_70A7_41BE_9F94059FC9D4",
          "pitch": 1.55,
          "yaw": 9.67,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Hanya Kepala Laboratorium (Kalab) dan Laboran yang diperkenankan masuk."
        }
      ],
      "id": "overlay_156B8039_045F_97DA_4179_2205DB5CCE83",
      "data": {
        "label": "Info Red 07"
      },
      "maps": [
        {
          "hfov": 19.97,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 9.67,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0_HS_3_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 1.55
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "class": "HotspotPanoramaOverlayImage",
          "hfov": 18.52,
          "distance": 50,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0_HS_4_0.png",
                "class": "ImageResourceLevel",
                "width": 612,
                "height": 584
              }
            ]
          },
          "pitch": 1.62,
          "yaw": 9.97
        }
      ],
      "useHandCursor": true,
      "areas": [
        {
          "class": "HotspotPanoramaOverlayArea",
          "mapColor": "#FF0000",
          "toolTip": "Ruang Kepala Laboratorium"
        }
      ],
      "id": "overlay_155ED09C_045E_98DA_4167_2926F581ACA9",
      "data": {
        "label": "Image"
      },
      "maps": [
        {
          "hfov": 18.52,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 9.97,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0_HS_4_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 1.62
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
          "toolTip": "Ruang Penyimpanan",
          "click": "this.startPanoramaWithCamera(this.panorama_1C1B63E6_0188_C730_416A_E102A28938A8, this.camera_92FD8561_AA55_EC8B_41E1_F8CE079F71A8); this.mainPlayList.set('selectedIndex', 13)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.14,
          "image": "this.AnimatedImageResource_B51079B6_A57F_8163_41DA_8F9062D23CDD",
          "pitch": 0.96,
          "yaw": 134.79,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2AB632C1_3F17_A2E3_41C7_0DCB8E31B802",
      "maps": [
        {
          "hfov": 18.14,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 134.79,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0_HS_5_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 0.96
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
          "click": "this.startPanoramaWithCamera(this.panorama_1C1B63E6_0188_C730_416A_E102A28938A8, this.camera_92F69576_AA55_EC89_41CF_560436342C93); this.mainPlayList.set('selectedIndex', 13)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.46,
          "image": "this.AnimatedImageResource_E51F5E6E_A5CC_9C96_41C7_D8447DB9C956",
          "pitch": -27.29,
          "yaw": 137.31,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E567726C_A5FB_E49A_41E1_B7DB38BA0634",
      "maps": [
        {
          "hfov": 18.46,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 137.31,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0_HS_6_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -27.29
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A310265_0189_C130_416B_AC54D2B2339F, this.camera_92EE854F_AA55_EC96_41E1_34240F9CE6F8); this.mainPlayList.set('selectedIndex', 9)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 17.53,
          "image": "this.AnimatedImageResource_E51F3E6E_A5CC_9C96_41C6_616D52148D0D",
          "pitch": -32.49,
          "yaw": -26.44,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E3FB7296_A5FB_A589_41E2_86A1FDAB8138",
      "maps": [
        {
          "hfov": 17.53,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -26.44,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0_HS_7_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -32.49
        }
      ]
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid91CC5300_AA55_E489_41DA_9FBD5BA002BD",
      "id": "viewer_uid91CC5300_AA55_E489_41DA_9FBD5BA002BDVideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid91CC5300_AA55_E489_41DA_9FBD5BA002BD",
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
        "name": "ViewerArea93500"
      }
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid91CF0302_AA55_E489_41DC_FB57D1CB1BDD",
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
        "name": "ViewerArea93501"
      }
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid91CBB309_AA55_E49B_41D3_4EFA498124D9",
      "id": "viewer_uid91CBB309_AA55_E49B_41D3_4EFA498124D9VideoPlayer",
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
          "toolTip": "Perhatian",
          "click": "this.showPopupPanoramaOverlay(this.popup_16FFF462_035A_6512_4182_B5D0BFACB539, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_1504B013_035A_1D32_4188_826C3C9C23FC, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.39,
          "image": "this.AnimatedImageResource_8464FFE9_A583_80E0_41D3_DFD31911BF81",
          "pitch": 5.4,
          "yaw": -2.18,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_29D96FAB_3F12_A2A7_41B9_03AF19D93CDD",
      "maps": [
        {
          "hfov": 5.39,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -2.18,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_11_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 5.4
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
          "click": "this.showPopupPanoramaOverlay(this.popup_168CD1FF_037A_1EF1_4182_BBDFB953060B, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.10196078431372549,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.10196078431372549,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.10196078431372549,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_1502D013_035A_1D32_4184_BBBCC865CAEA, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 14.59,
          "image": "this.AnimatedImageResource_27CACF1D_3F13_E363_41B6_F729638216DB",
          "pitch": 6.04,
          "yaw": 12.21,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_28137835_3F11_ADA2_41C1_553E676967A3",
      "maps": [
        {
          "hfov": 14.59,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 12.21,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_12_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 6.04
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
          "toolTip": "Bahan-Bahan Kimia yang Tidak Boleh Bercampur",
          "click": "this.showPopupPanoramaOverlay(this.popup_1543AE85_037E_6516_415B_C3F001C9EB53, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_15002013_035A_1D32_4175_BD6AB8067271, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 8.82,
          "image": "this.AnimatedImageResource_B51C29AB_A57F_8161_41D4_1E41C39CA07C",
          "pitch": 8.97,
          "yaw": 25.86,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_2A7439D4_3F11_EEE1_4190_F877985C1A66",
      "maps": [
        {
          "hfov": 8.82,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 25.86,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_13_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 8.97
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
          "toolTip": "Denah Ruangan",
          "click": "this.showPopupPanoramaOverlay(this.popup_169B29D7_035A_6F32_4160_89030C356E9A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_1503A013_035A_1D32_4174_75F4FD0346D9, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 12.26,
          "image": "this.AnimatedImageResource_B51C69AB_A57F_8161_41E4_33E051C0E6D6",
          "pitch": 4.92,
          "yaw": 155.3,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_29712258_3F1E_BDE1_416C_72D70B4B3964",
      "maps": [
        {
          "hfov": 12.26,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 155.3,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_14_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 4.92
        }
      ]
    },
    {
      "enabledInCardboard": true,
      "class": "HotspotPanoramaOverlay",
      "rollOverDisplay": false,
      "items": [
        {
          "hfov": 9.55,
          "image": "this.AnimatedImageResource_84658FEB_A583_80E1_41C5_E59DFFAD16E3",
          "pitch": -2.18,
          "yaw": -25.05,
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
          "click": "this.openLink('../index.htm?media-name=IMG_20260427_125005_00_041', '_self')"
        }
      ],
      "id": "overlay_2A5806FB_3F1E_A2A7_41CD_953E0E63B7BE",
      "data": {
        "label": "Image"
      },
      "maps": [
        {
          "hfov": 9.55,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -25.05,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_15_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": -2.18
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
          "click": "this.showPopupPanoramaOverlay(this.popup_160BBBD0_035E_230E_4188_83261CB51309, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.10196078431372549,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.10196078431372549,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.10196078431372549,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_160BCBD0_035E_230E_4163_BF830F5181B8, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 5.55,
          "image": "this.AnimatedImageResource_B51CF9AC_A57F_8167_41CD_0A82D12217A3",
          "pitch": -2.31,
          "yaw": -2.49,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_B2948298_A5AC_AA71_41C1_C58733D8CE62",
      "maps": [
        {
          "hfov": 5.55,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -2.49,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_16_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
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
      "items": [
        {
          "hfov": 36.04,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_17_0.png",
                "class": "ImageResourceLevel",
                "width": 591,
                "height": 86
              }
            ]
          },
          "pitch": 4.82,
          "yaw": -17.28,
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
      "id": "overlay_858AF291_A584_8320_41DC_A903C67DE69D",
      "data": {
        "label": "Pintu Keluar"
      },
      "maps": [
        {
          "hfov": 36.04,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -17.28,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_17_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 109,
                "height": 16
              }
            ]
          },
          "pitch": 4.82
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A38E874_0189_C110_4176_1AE8579BAF0C, this.camera_921A13CC_AA55_EB99_41D9_65C0328D91F8); this.mainPlayList.set('selectedIndex', 0)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 18.83,
          "image": "this.AnimatedImageResource_E52C0E5E_A5CC_9CB9_41E0_A59AFA39E755",
          "pitch": -25.03,
          "yaw": -83.29,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E489D4F1_A5F5_6D8B_41E0_146A7E5F72D9",
      "maps": [
        {
          "hfov": 18.83,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -83.29,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_18_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -25.03
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
          "click": "this.mainPlayList.set('selectedIndex', 1)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.82,
          "image": "this.AnimatedImageResource_E52DCE5E_A5CC_9CB9_41A7_C4416D3276D1",
          "pitch": -17.47,
          "yaw": 64.03,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E67632D3_A5F5_A58F_41C7_BDFF3AAE1B0F",
      "maps": [
        {
          "hfov": 19.82,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 64.03,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_19_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
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
          "click": "this.startPanoramaWithCamera(this.panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B, this.camera_9212B3D9_AA55_EBBA_41C3_548AEAB4F2EF); this.mainPlayList.set('selectedIndex', 2)"
        }
      ],
      "data": {
        "label": "Arrow 01b"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 19.78,
          "image": "this.AnimatedImageResource_E52D8E5E_A5CC_9CB9_41D4_2DB9A3C0A184",
          "pitch": -17.85,
          "yaw": 89.34,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E5281C01_A5F5_FC8B_41D1_A982A56965E1",
      "maps": [
        {
          "hfov": 19.78,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": 89.34,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_20_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -17.85
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
          "hfov": 14.97,
          "image": "this.AnimatedImageResource_E52D7E5E_A5CC_9CB9_419F_042460764EF1",
          "pitch": -43.91,
          "yaw": -179.62,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E67BE795_A5F5_AB8B_4165_91083320CFB0",
      "maps": [
        {
          "hfov": 14.97,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -179.62,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_21_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 26,
                "height": 16
              }
            ]
          },
          "pitch": -43.91
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
          "toolTip": "Bahan Kimia Berbahaya",
          "click": "this.showPopupPanoramaOverlay(this.popup_E51EA80B_A5D7_A49F_41B7_F65977B6F466, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 4.73,
          "image": "this.AnimatedImageResource_947E050E_AA4B_AC99_41DE_05E798A0EBE9",
          "pitch": 5.87,
          "yaw": -126.19,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_E4EF8847_A5D7_A497_41E4_566BB93CF634",
      "maps": [
        {
          "hfov": 4.73,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -126.19,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_22_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 5.87
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
          "toolTip": "Bahan Kimia yang Tidak Boleh Disimpan Bersamaan",
          "click": "this.showPopupPanoramaOverlay(this.popup_90976D30_A5BF_BC8A_41DD_499AC20A1D2D, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 4.18,
          "image": "this.AnimatedImageResource_947E950E_AA4B_AC99_41C4_1C1F7B30077D",
          "pitch": 5.66,
          "yaw": -118.99,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9083DD85_A5BF_BF8A_41DF_3786D3709B5F",
      "maps": [
        {
          "hfov": 4.18,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -118.99,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_23_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 5.66
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
          "toolTip": "Simbol-Simbol Bahan Kimia",
          "click": "this.showPopupPanoramaOverlay(this.popup_9EEBA9A1_A5BC_E78B_41E1_FECA87A60F67, {'iconLineWidth':10,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':10,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':10,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9EEB49A1_A5BC_E78B_41A1_08899E6CDB03, null, null, null, null, false)"
        }
      ],
      "data": {
        "label": "Image"
      },
      "useHandCursor": true,
      "items": [
        {
          "hfov": 3.44,
          "image": "this.AnimatedImageResource_947F450E_AA4B_AC99_4195_6EED367F7821",
          "pitch": 4.53,
          "yaw": -112.59,
          "class": "HotspotPanoramaOverlayImage",
          "distance": 100
        }
      ],
      "id": "overlay_9EDEB9D1_A5BC_E78A_41AA_E4A428852D4B",
      "maps": [
        {
          "hfov": 3.44,
          "class": "HotspotPanoramaOverlayMap",
          "yaw": -112.59,
          "image": {
            "class": "ImageResource",
            "levels": [
              {
                "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_24_0_0_map.gif",
                "class": "ImageResourceLevel",
                "width": 16,
                "height": 16
              }
            ]
          },
          "pitch": 4.53
        }
      ]
    },
    {
      "blending": 0,
      "video": {
        "width": 1270,
        "class": "VideoResource",
        "height": 726,
        "mp4Url": "media/video_150CD3E8_0356_631E_4181_C938348D61F8.mp4"
      },
      "hfov": 16.34,
      "autoplay": true,
      "id": "overlay_9CBD51D7_A5BD_67B6_41C5_DF3E2429EFDB",
      "enabledInCardboard": true,
      "loop": true,
      "image": {
        "class": "ImageResource",
        "levels": [
          {
            "url": "media/overlay_9CBD51D7_A5BD_67B6_41C5_DF3E2429EFDB_t.jpg",
            "class": "ImageResourceLevel",
            "width": 2964,
            "height": 1694
          }
        ]
      },
      "pitch": 0.36,
      "useHandCursor": true,
      "roll": -1.05,
      "yaw": -87.83,
      "rotationY": 3.7,
      "class": "VideoPanoramaOverlay",
      "rotationX": -2.65,
      "toolTip": "Klik untuk Memutar Video",
      "videoVisibleOnStop": false,
      "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_9E704E92_A5BB_FD8E_41CE_73E7A0FC1F74, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_9DF380FC_A5BB_E579_41CD_05ED098ACF52, this.video_150CD3E8_0356_631E_4181_C938348D61F8, this.PlayList_949F4533_AA4B_AC8E_41E4_4F5E303D8501, '95%', '95%', true, true) }",
      "data": {
        "label": "Video"
      },
      "vfov": 8.41,
      "distance": 50
    },
    {
      "class": "VideoPlayer",
      "viewerArea": "this.viewer_uid91B3E2FB_AA55_E57F_41D2_872175C314C5",
      "id": "viewer_uid91B3E2FB_AA55_E57F_41D2_872175C314C5VideoPlayer",
      "displayPlaybackBar": true
    },
    {
      "progressBarBorderColor": "#000000",
      "progressBackgroundColorDirection": "vertical",
      "id": "viewer_uid91B612F3_AA55_E58F_41D2_2043CDBE0CDD",
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
        "name": "ViewerArea93498"
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
      "id": "Image_B7FF91F6_A5AC_69B1_41DE_281431381DE9",
      "left": "0%",
      "paddingRight": 0,
      "paddingLeft": 0,
      "borderSize": 0,
      "url": "skin/Image_B7FF91F6_A5AC_69B1_41DE_281431381DE9.png",
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
        "name": "tittlelabkim"
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
      "id": "AnimatedImageResource_E51BBE6A_A5CC_9C99_41D1_17C2C00C91A4",
      "levels": [
        {
          "url": "media/panorama_0A38AE77_0189_C110_4171_BE63086A2049_0_HS_1_0.png",
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
      "id": "AnimatedImageResource_91B0C2F8_AA55_E57A_41D2_FA3D4C19445E",
      "levels": [
        {
          "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_E52A3E57_A5CC_9CB6_418D_9FD50910EDC9",
      "levels": [
        {
          "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0_HS_10_0.png",
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
      "id": "AnimatedImageResource_E52BCE57_A5CC_9CB6_41D9_65CBD952D22B",
      "levels": [
        {
          "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0_HS_11_0.png",
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
      "id": "AnimatedImageResource_E8785131_AA5B_A48A_41CC_031114B4F983",
      "levels": [
        {
          "url": "media/panorama_0A3A76F5_0188_4111_4170_D6A3F67FF72B_0_HS_12_0.png",
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
      "id": "AnimatedImageResource_E52B6E58_A5CC_9CBA_418C_D8BDCFBC867C",
      "levels": [
        {
          "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_9782E093_AA55_A58F_419E_6BB72B714219",
      "levels": [
        {
          "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_9782D093_AA55_A58F_41B1_32B6963BB460",
      "levels": [
        {
          "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_91B362FA_AA55_E579_41C2_D02DD0B6C772",
      "levels": [
        {
          "url": "media/panorama_0A371D07_0188_40F0_4168_5E0CB757ABE6_0_HS_9_0.png",
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
      "id": "AnimatedImageResource_27CD6F1A_3F13_E361_41BC_FD143A9D4D51",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_15_0.png",
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
      "id": "AnimatedImageResource_27CDAF1B_3F13_E367_41A3_666BF831237F",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_16_0.png",
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
      "id": "AnimatedImageResource_27CDFF1B_3F13_E367_41C1_8045DA35D2D5",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_17_0.png",
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
      "id": "AnimatedImageResource_92818080_AA4C_E58A_41D4_A93D9F7E936D",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_18_0.png",
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
      "id": "AnimatedImageResource_27CF1F1C_3F13_E361_41B6_8388D60CE97F",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_20_0.png",
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
      "id": "AnimatedImageResource_846D3FE6_A583_80E0_41E2_810A495039A0",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_21_0.png",
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
      "id": "AnimatedImageResource_846DBFE7_A583_80E0_41D4_19046F407C8A",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_23_0.png",
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
      "id": "AnimatedImageResource_846E0FE7_A583_80E0_41B4_134708166FF8",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_25_0.png",
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
      "id": "AnimatedImageResource_92860082_AA4C_E589_41E2_8017C1C0F5DE",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_27_0.png",
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
      "id": "AnimatedImageResource_9287F082_AA4C_E589_41D4_97E38EC7EE88",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_28_0.png",
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
      "id": "AnimatedImageResource_E8470E9B_AA4D_7DBF_41D3_304B52772278",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_26_0.png",
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
      "id": "AnimatedImageResource_97C5AC6C_AA54_BC9A_41E2_40E1180F09AC",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_30_0.png",
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
      "id": "AnimatedImageResource_97C5DC6C_AA54_BC9A_41DE_79542612BEA9",
      "levels": [
        {
          "url": "media/panorama_0A38E874_0189_C110_4176_1AE8579BAF0C_0_HS_31_0.png",
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
      "id": "AnimatedImageResource_94828512_AA4B_AC8E_41B5_50A37246F9B1",
      "levels": [
        {
          "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_27C10F20_3F13_E3A1_41AB_7EDD4334A734",
      "levels": [
        {
          "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_9_0.png",
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
      "id": "AnimatedImageResource_9483F512_AA4B_AC8E_41CE_8A453DACC709",
      "levels": [
        {
          "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_10_0.png",
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
      "id": "AnimatedImageResource_E5109E63_A5CC_9C8F_41CB_B41450B797E7",
      "levels": [
        {
          "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_11_0.png",
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
      "id": "AnimatedImageResource_E5104E63_A5CC_9C8F_41B1_4A2F34A22E5F",
      "levels": [
        {
          "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_12_0.png",
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
      "id": "AnimatedImageResource_E5102E63_A5CC_9C8F_41E3_F68B7F2B4DF3",
      "levels": [
        {
          "url": "media/panorama_0A36558D_0189_C3F0_4142_45B9D90E61FF_0_HS_13_0.png",
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
      "id": "AnimatedImageResource_91B062F7_AA55_E577_41CD_A5B595B2508F",
      "levels": [
        {
          "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0_HS_2_0.png",
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
      "id": "AnimatedImageResource_E525AE55_A5CC_9C8A_41C8_9B9FBAD9E948",
      "levels": [
        {
          "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0_HS_3_0.png",
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
      "id": "AnimatedImageResource_E5256E55_A5CC_9C8A_41C5_E10215877B02",
      "levels": [
        {
          "url": "media/panorama_0A3850B4_0188_4110_4177_1AE0DDA5D482_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_94882519_AA4B_ACBA_41B2_74A7F9B8CE11",
      "levels": [
        {
          "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_9488D51A_AA4B_ACBE_41DB_F95D0C1F8411",
      "levels": [
        {
          "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_9488A51A_AA4B_ACBE_41A7_E1EA1EAE3789",
      "levels": [
        {
          "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_B51439B5_A57F_8161_41E1_4286865F5DB4",
      "levels": [
        {
          "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_E51A9E69_A5CC_9C9A_41E1_2D84B68A800A",
      "levels": [
        {
          "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_10_0.png",
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
      "id": "AnimatedImageResource_E51A4E6A_A5CC_9C99_41D3_3FAECEDA24FD",
      "levels": [
        {
          "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_11_0.png",
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
      "id": "AnimatedImageResource_E51A2E6A_A5CC_9C99_41DB_668C7D7C7027",
      "levels": [
        {
          "url": "media/panorama_0A310265_0189_C130_416B_AC54D2B2339F_0_HS_12_0.png",
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
      "id": "AnimatedImageResource_91B312FA_AA55_E579_41E1_999880B07806",
      "levels": [
        {
          "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_E5296E5A_A5CC_9CBE_41D0_1AD81557E7B6",
      "levels": [
        {
          "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_E52EDE5A_A5CC_9CBE_41DA_F9B35892927B",
      "levels": [
        {
          "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_E52E7E5C_A5CC_9CB9_41AE_549E8036A884",
      "levels": [
        {
          "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0_HS_9_0.png",
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
      "id": "AnimatedImageResource_9AC7963D_A5CB_6CFA_41DD_2A342EA36059",
      "levels": [
        {
          "url": "media/panorama_0A36831A_0188_4710_4175_617FCB27EF2E_0_HS_10_0.png",
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
      "id": "AnimatedImageResource_9485D516_AA4B_ACB6_41E0_19A68AC3553D",
      "levels": [
        {
          "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_94859517_AA4B_ACB7_41C9_A0BEE60CFB42",
      "levels": [
        {
          "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_9_0.png",
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
      "id": "AnimatedImageResource_94865517_AA4B_ACB7_41D3_07065DD3C5A0",
      "levels": [
        {
          "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_10_0.png",
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
      "id": "AnimatedImageResource_E517FE65_A5CC_9C8B_41AE_7D3F3885855F",
      "levels": [
        {
          "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_11_0.png",
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
      "id": "AnimatedImageResource_E517AE65_A5CC_9C8B_419D_9D5A9024B04E",
      "levels": [
        {
          "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_12_0.png",
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
      "id": "AnimatedImageResource_E5170E66_A5CC_9C96_41D3_EA01F5B791C5",
      "levels": [
        {
          "url": "media/panorama_0A3BBBDB_0189_C710_416D_B75CEF238602_0_HS_13_0.png",
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
      "id": "AnimatedImageResource_E51CEE6E_A5CC_9C96_41D1_CD9520F1B98F",
      "levels": [
        {
          "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_2_0.png",
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
      "id": "AnimatedImageResource_E51C4E70_A5CC_9C89_41DA_DA2AAB456524",
      "levels": [
        {
          "url": "media/panorama_1C1B63E6_0188_C730_416A_E102A28938A8_0_HS_3_0.png",
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
      "id": "AnimatedImageResource_948C651D_AA4B_ACBB_41C1_AAB441E1A7F7",
      "levels": [
        {
          "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_948C151D_AA4B_ACBB_41D9_D8DA8000170A",
      "levels": [
        {
          "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_9_0.png",
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
      "id": "AnimatedImageResource_948CC51E_AA4B_ACB9_41DD_02654B044D41",
      "levels": [
        {
          "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_10_0.png",
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
      "id": "AnimatedImageResource_27DFEF23_3F13_E3A7_41CD_C9B93A416CEC",
      "levels": [
        {
          "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_11_0.png",
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
      "id": "AnimatedImageResource_27DE3F24_3F13_E3A1_41B5_1CAC591875AB",
      "levels": [
        {
          "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_12_0.png",
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
      "id": "AnimatedImageResource_E51EEE6C_A5CC_9C9A_41DB_F2566C9A76BD",
      "levels": [
        {
          "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_13_0.png",
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
      "id": "AnimatedImageResource_E51EAE6D_A5CC_9C9A_41CA_247865F4174B",
      "levels": [
        {
          "url": "media/panorama_0A4AE4A5_0189_C130_4177_3A00019A36E9_0_HS_14_0.png",
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
      "id": "AnimatedImageResource_BC549789_A58D_8121_41A3_A548B2F97030",
      "levels": [
        {
          "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_4_0.png",
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
      "id": "AnimatedImageResource_49B03F36_5E08_0C96_41B6_45337EE972F3",
      "levels": [
        {
          "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_E5120E5F_A5CC_9CB6_41B6_D2FA84B13A03",
      "levels": [
        {
          "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_E5139E5F_A5CC_9CB6_41D0_0095878007A4",
      "levels": [
        {
          "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_8_0.png",
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
      "id": "AnimatedImageResource_E5135E5F_A5CC_9CB6_41AD_2AA3B4EF17E3",
      "levels": [
        {
          "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_9_0.png",
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
      "id": "AnimatedImageResource_E5130E61_A5CC_9C8B_41D4_2DC098F5AA79",
      "levels": [
        {
          "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_10_0.png",
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
      "id": "AnimatedImageResource_91CF2302_AA55_E489_418E_74C79A374D7A",
      "levels": [
        {
          "url": "media/panorama_0A301F8A_0189_BFF0_4158_8F11989100B6_0_HS_11_0.png",
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
      "id": "AnimatedImageResource_324B1850_2A5C_70A7_41BE_9F94059FC9D4",
      "levels": [
        {
          "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0_HS_3_0.png",
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
      "id": "AnimatedImageResource_B51079B6_A57F_8163_41DA_8F9062D23CDD",
      "levels": [
        {
          "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0_HS_5_0.png",
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
      "id": "AnimatedImageResource_E51F5E6E_A5CC_9C96_41C7_D8447DB9C956",
      "levels": [
        {
          "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0_HS_6_0.png",
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
      "id": "AnimatedImageResource_E51F3E6E_A5CC_9C96_41C6_616D52148D0D",
      "levels": [
        {
          "url": "media/panorama_1B8936A4_0187_C137_4157_CDA7B5BA22EC_0_HS_7_0.png",
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
      "id": "AnimatedImageResource_8464FFE9_A583_80E0_41D3_DFD31911BF81",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_11_0.png",
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
      "id": "AnimatedImageResource_27CACF1D_3F13_E363_41B6_F729638216DB",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_12_0.png",
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
      "id": "AnimatedImageResource_B51C29AB_A57F_8161_41D4_1E41C39CA07C",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_13_0.png",
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
      "id": "AnimatedImageResource_B51C69AB_A57F_8161_41E4_33E051C0E6D6",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_14_0.png",
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
      "id": "AnimatedImageResource_84658FEB_A583_80E1_41C5_E59DFFAD16E3",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_15_0.png",
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
      "id": "AnimatedImageResource_B51CF9AC_A57F_8167_41CD_0A82D12217A3",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_16_0.png",
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
      "id": "AnimatedImageResource_E52C0E5E_A5CC_9CB9_41E0_A59AFA39E755",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_18_0.png",
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
      "id": "AnimatedImageResource_E52DCE5E_A5CC_9CB9_41A7_C4416D3276D1",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_19_0.png",
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
      "id": "AnimatedImageResource_E52D8E5E_A5CC_9CB9_41D4_2DB9A3C0A184",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_20_0.png",
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
      "id": "AnimatedImageResource_E52D7E5E_A5CC_9CB9_419F_042460764EF1",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_21_0.png",
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
      "id": "AnimatedImageResource_947E050E_AA4B_AC99_41DE_05E798A0EBE9",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_22_0.png",
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
      "id": "AnimatedImageResource_947E950E_AA4B_AC99_41C4_1C1F7B30077D",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_23_0.png",
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
      "id": "AnimatedImageResource_947F450E_AA4B_AC99_4195_6EED367F7821",
      "levels": [
        {
          "url": "media/panorama_0A3B0957_0188_4310_4171_529BD4203CE0_0_HS_24_0.png",
          "class": "ImageResourceLevel",
          "width": 460,
          "height": 690
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
      "width": 44,
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
      "click": "this.showPopupImage(this.ImageResource_EFCCC03C_A5D5_E4FA_41E0_CD798C4D61CC, null, '90%', '90%', this.FadeInEffect_EFCCE03C_A5D5_E4FA_41DA_C8F1BD718C88, this.FadeOutEffect_EFCCB03C_A5D5_E4FA_4194_14D16AAD323C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
      "height": 50,
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

