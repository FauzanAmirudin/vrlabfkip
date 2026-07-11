(function () {
    var script = {
        "mouseWheelEnabled": true,
        "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7,this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250], 'cardboardAvailable'); this.playList_96400F4B_AABC_9C9F_41E2_2670F2097EB9.set('selectedIndex', 0); this.playList_9640CF4B_AABC_9C9F_41E0_E35C71D4767E.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081].forEach(function(component) { component.set('visible', false); }) }",
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
                    "yaw": 72.53,
                    "backwardYaw": 178.02,
                    "distance": 1,
                    "panorama": "this.panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3"
                },
                {
                    "class": "AdjacentPanorama",
                    "yaw": 161.68,
                    "backwardYaw": 104.45,
                    "distance": 1,
                    "panorama": "this.panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD"
                }
            ],
            "hfov": 360,
            "partial": false,
            "id": "panorama_D8127ED5_C15A_6849_41E5_80572F3565FA",
            "thumbnailUrl": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_t.jpg",
            "label": "IMG_20260414_122436_00_084",
            "pitch": 0,
            "hfovMax": 130,
            "class": "Panorama",
            "mapLocations": [
                {
                    "map": "this.map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24",
                    "class": "PanoramaMapLocation",
                    "angle": 294.16,
                    "y": 731.25,
                    "x": 449.91
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
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/f/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/f/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/f/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/f/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/u/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/u/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/u/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/u/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/r/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/r/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/r/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/r/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/b/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/b/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/b/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/b/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/d/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/d/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/d/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/d/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/l/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/l/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/l/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0/l/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "thumbnailUrl": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_t.jpg"
                }
            ],
            "overlays": [
                "this.overlay_DCE9BCDB_C1CA_A87A_41D9_C851122E7702",
                "this.overlay_4E769905_5E7E_B846_41C5_4CFBB54C2AB0",
                "this.overlay_4C033812_5E08_146E_41C6_F20553B7B3E6",
                "this.popup_4C0FA7F5_5E08_1BAA_41D5_36E2D02B212C",
                "this.popup_B33C6E63_A5A4_2316_41C5_913AA1B5D0C0",
                "this.overlay_E9972C07_AA55_7C97_41D8_902AD932159A",
                "this.overlay_EA6585A5_AA57_AF8A_4153_8B60CD787F19",
                "this.overlay_94C18353_AA55_A48E_41D3_50633404EB1D",
                "this.overlay_94E6DE86_AA5B_BD96_41C5_4761DDBBA750"
            ]
        },
        {
            "adjacentPanoramas": [
                {
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_D8107270_C15B_B847_4171_49B519CD887A"
                },
                {
                    "class": "AdjacentPanorama",
                    "yaw": 178.02,
                    "backwardYaw": 72.53,
                    "distance": 1,
                    "panorama": "this.panorama_D8127ED5_C15A_6849_41E5_80572F3565FA"
                },
                {
                    "class": "AdjacentPanorama",
                    "panorama": "this.panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD"
                }
            ],
            "hfov": 360,
            "partial": false,
            "id": "panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3",
            "thumbnailUrl": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_t.jpg",
            "label": "IMG_20260414_122544_00_086",
            "pitch": 0,
            "hfovMax": 130,
            "class": "Panorama",
            "mapLocations": [
                {
                    "map": "this.map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24",
                    "class": "PanoramaMapLocation",
                    "angle": 2.76,
                    "y": 400.76,
                    "x": 484.1
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
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/f/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/f/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/f/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/f/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/u/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/u/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/u/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/u/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/r/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/r/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/r/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/r/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/b/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/b/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/b/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/b/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/d/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/d/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/d/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/d/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/l/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/l/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/l/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0/l/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "thumbnailUrl": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_t.jpg"
                }
            ],
            "overlays": [
                "this.popup_E8AE7E21_FCD8_E6A6_41B8_5D096AB27B20",
                "this.overlay_5100FA67_5E7E_98C2_41D1_25DADAB1B623",
                "this.overlay_4D80BBF5_5E08_0BAA_41A1_153D6E2136D9",
                "this.popup_B3674806_A5A4_6F1E_41E0_4C15228DB822",
                "this.overlay_95B50EF9_AA5D_9D7A_41B5_D36C6611C978",
                "this.overlay_97174C60_AA5D_9C8A_41E4_C808B02E0C00",
                "this.overlay_950ED242_AA5C_A489_41B0_F62042AACC14",
                "this.overlay_948ECAF6_AA5C_E576_41E1_0838B0602EBB",
                "this.overlay_95244297_AA54_A5B7_41AB_AA353472BAF2",
                "this.overlay_97DA643A_AA54_ACFE_41DC_051533F71C46"
            ]
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 18.88,
            "autoplay": true,
            "id": "popup_B3F44DC0_A5A4_2112_41C8_28BBC1BA88A5",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "loop": false,
            "popupMaxHeight": "95%",
            "pitch": 1.98,
            "yaw": -160.73,
            "hideDuration": 500,
            "popupDistance": 100,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_E5C23223_FCC8_5EAA_41D6_781D022A0A87.mp4"
            }
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_B4FBF5A0_A5A5_AE2D_41B0_E4939D3E94DA",
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
            "id": "panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_camera"
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "class": "VideoPlayListItem",
                    "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_96406F4C_AABC_9C99_41D4_CBEE9703EFC1, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_96406F4C_AABC_9C99_41D4_CBEE9703EFC1, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
                    "media": "this.video_53CDDBAF_5EB4_5DE5_41D3_C4C5F5105A9E",
                    "player": "this.MainViewerVideoPlayer"
                }
            ],
            "id": "playList_96406F4C_AABC_9C99_41D4_CBEE9703EFC1"
        },
        {
            "closeButtonPressedBackgroundColorDirection": "vertical",
            "closeButtonPressedIconColor": "#888888",
            "backgroundColorRatios": [],
            "data": {
                "name": "Window94949"
            },
            "closeButtonPressedBorderSize": 0,
            "bodyPaddingRight": 0,
            "id": "window_974B2891_AA7B_658A_41DB_E940F6529976",
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
                "this.viewer_uid964A5F43_AABC_9C8E_41DE_3CB3A92E174B"
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
                    "start": "this.viewer_uid964CDF44_AABC_9C8A_41B4_AF9B897B2C5DVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EE35276D_AAB5_AC9A_41DB_8DF346EE9A24, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EE35276D_AAB5_AC9A_41DB_8DF346EE9A24, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.viewer_uid964CDF44_AABC_9C8A_41B4_AF9B897B2C5DVideoPlayer)",
                    "media": "this.video_E5C23223_FCC8_5EAA_41D6_781D022A0A87",
                    "player": "this.viewer_uid964CDF44_AABC_9C8A_41B4_AF9B897B2C5DVideoPlayer"
                }
            ],
            "id": "PlayList_EE35276D_AAB5_AC9A_41DB_8DF346EE9A24"
        },
        {
            "class": "PlayList",
            "items": [
                "this.PanoramaPlayListItem_96437F4D_AABC_9C9B_41E1_DC9F6C9F256F",
                "this.PanoramaPlayListItem_96420F4F_AABC_9C97_41DF_CCFB77917023",
                "this.PanoramaPlayListItem_9645BF4F_AABC_9C97_41E1_0007BD14926F",
                "this.PanoramaPlayListItem_96452F4F_AABC_9C97_41C7_5A2CE00F5A41"
            ],
            "id": "mainPlayList"
        },
        {
            "closeButtonPressedBackgroundColorDirection": "vertical",
            "closeButtonPressedIconColor": "#888888",
            "backgroundColorRatios": [],
            "data": {
                "name": "Window94951"
            },
            "closeButtonPressedBorderSize": 0,
            "bodyPaddingRight": 0,
            "id": "window_9745F892_AA7B_658E_41E1_EA78CD5E0436",
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
                "this.viewer_uid964F0F47_AABC_9C96_41C9_52B518EB2C01"
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
            "id": "panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_camera"
        },
        {
            "closeButtonPressedBackgroundColorDirection": "vertical",
            "closeButtonPressedIconColor": "#888888",
            "backgroundColorRatios": [],
            "data": {
                "name": "Window94948"
            },
            "closeButtonPressedBorderSize": 0,
            "bodyPaddingRight": 0,
            "id": "window_974A6890_AA7B_6589_41DB_29C317F10CD6",
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
                "this.viewer_uid9648CF3E_AABC_9CF6_41E1_6B5959987907"
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
            "id": "ImageResource_EA860901_FCD8_2A66_41E2_1605661E2E6C",
            "levels": [
                {
                    "url": "media/popup_E45FC5EF_FCDB_E5B9_41E4_4A4F7BBAC68C_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 1414,
                    "height": 2000
                },
                {
                    "url": "media/popup_E45FC5EF_FCDB_E5B9_41E4_4A4F7BBAC68C_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 723,
                    "height": 1024
                },
                {
                    "url": "media/popup_E45FC5EF_FCDB_E5B9_41E4_4A4F7BBAC68C_0_2.png",
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
            "hfov": 5.12,
            "id": "popup_4C0FA7F5_5E08_1BAA_41D5_36E2D02B212C",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_4C0FA7F5_5E08_1BAA_41D5_36E2D02B212C_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 8.43,
            "yaw": 73.15,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_4C0F57F5_5E08_1BAA_41C5_DADDB64DEE7B",
            "levels": [
                {
                    "url": "media/popup_4C0FA7F5_5E08_1BAA_41D5_36E2D02B212C_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 1414,
                    "height": 2000
                },
                {
                    "url": "media/popup_4C0FA7F5_5E08_1BAA_41D5_36E2D02B212C_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 723,
                    "height": 1024
                },
                {
                    "url": "media/popup_4C0FA7F5_5E08_1BAA_41D5_36E2D02B212C_0_2.png",
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
                    "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
                    "class": "MapPlayListItem",
                    "media": "this.map_34F5FEA4_2848_EE43_41AB_27B812B345D6",
                    "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
                }
            ],
            "id": "playList_96404F4C_AABC_9C99_41C0_6EE87CA787BE"
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_EA886901_FCD8_2A66_41D0_B358AFFC60F3",
            "levels": [
                {
                    "url": "media/popup_E9C4624E_FCD8_5EFA_41E3_565A087CFF1E_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 1414,
                    "height": 2000
                },
                {
                    "url": "media/popup_E9C4624E_FCD8_5EFA_41E3_565A087CFF1E_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 723,
                    "height": 1024
                },
                {
                    "url": "media/popup_E9C4624E_FCD8_5EFA_41E3_565A087CFF1E_0_2.png",
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
                "yaw": -1.98,
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
            "id": "camera_96A7CFAF_AABC_9B97_41B4_732DF59D5FA0"
        },
        {
            "fieldOfViewOverlayOutsideOpacity": 0,
            "label": "MiniMap",
            "id": "map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24",
            "minimumZoomFactor": 0.5,
            "thumbnailUrl": "media/map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24_t.png",
            "width": 1143,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24.png",
                        "class": "ImageResourceLevel",
                        "width": 1143,
                        "height": 2000
                    },
                    {
                        "url": "media/map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24_lq.png",
                        "class": "ImageResourceLevel",
                        "width": 193,
                        "height": 338,
                        "tags": "preload"
                    }
                ]
            },
            "fieldOfViewOverlayRadiusScale": 0.17,
            "fieldOfViewOverlayOutsideColor": "#00FFFF",
            "maximumZoomFactor": 2,
            "class": "Map",
            "fieldOfViewOverlayInsideOpacity": 0.32,
            "scaleMode": "fit_inside",
            "initialZoomFactor": 2,
            "fieldOfViewOverlayInsideColor": "#FFFFFF",
            "height": 2000,
            "overlays": [
                "this.overlay_F00DD8DA_FCC8_2B9A_41D6_53B6C371DF20",
                "this.overlay_F0739086_FCC8_5A6B_41E5_3C74A671FE71",
                "this.overlay_F73DB9EC_FCC8_2DBF_41C7_8D19C187DFA3",
                "this.overlay_F0064500_FCC8_FA66_41E8_4C5DBC08E456"
            ]
        },
        {
            "adjacentPanoramas": [
                {
                    "class": "AdjacentPanorama",
                    "yaw": 104.45,
                    "backwardYaw": 161.68,
                    "distance": 1,
                    "panorama": "this.panorama_D8127ED5_C15A_6849_41E5_80572F3565FA"
                }
            ],
            "hfov": 360,
            "partial": false,
            "id": "panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD",
            "thumbnailUrl": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_t.jpg",
            "label": "IMG_20260414_122203_00_083",
            "pitch": 0,
            "hfovMax": 130,
            "class": "Panorama",
            "mapLocations": [
                {
                    "map": "this.map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24",
                    "class": "PanoramaMapLocation",
                    "angle": -43.38,
                    "y": 1500.48,
                    "x": 427.12
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
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/f/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/f/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/f/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/f/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/u/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/u/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/u/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/u/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/r/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/r/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/r/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/r/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/b/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/b/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/b/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/b/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/d/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/d/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/d/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/d/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/l/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/l/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/l/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0/l/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "thumbnailUrl": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_t.jpg"
                }
            ],
            "overlays": [
                "this.overlay_D9D19970_C146_6847_41E0_858CFFF511DD",
                "this.popup_E45FC5EF_FCDB_E5B9_41E4_4A4F7BBAC68C",
                "this.overlay_E5039074_FCCB_DAAF_41CA_4C1B0764B321",
                "this.overlay_501C7108_5D9E_A84E_41AC_37230FB92812",
                "this.overlay_51774B61_5E7D_78FE_41CE_21A15B110B74",
                "this.overlay_4C636CB9_5E08_0D9A_41BC_FB7AD936C42C",
                "this.overlay_B1ADE75E_A5A4_212E_41E2_3D099A3FF34F",
                "this.popup_B145BB0E_A5A4_212E_41D0_0BF2D52053DA",
                "this.overlay_975E5E0A_AA74_9C9E_41D5_C691A2DD1975",
                "this.overlay_939A8795_AA74_AB8A_41E1_D8CA7B16CB50",
                "this.overlay_94440426_AA4D_6C96_41E2_0E28CBB8A1F4",
                "this.overlay_95BA7254_AA4C_A48A_419B_A6EB3527E67A",
                "this.overlay_9418961C_AA4C_ECBA_41DF_4D5E518EDFED",
                "this.overlay_964FEFEE_AA4B_7B99_41D0_33F2BFAE0686"
            ]
        },
        {
            "fieldOfViewOverlayOutsideOpacity": 0,
            "label": "BigMap",
            "id": "map_34F5FEA4_2848_EE43_41AB_27B812B345D6",
            "minimumZoomFactor": 0.5,
            "thumbnailUrl": "media/map_34F5FEA4_2848_EE43_41AB_27B812B345D6_t.png",
            "width": 1143,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/map_34F5FEA4_2848_EE43_41AB_27B812B345D6.png",
                        "class": "ImageResourceLevel",
                        "width": 1143,
                        "height": 2000
                    },
                    {
                        "url": "media/map_34F5FEA4_2848_EE43_41AB_27B812B345D6_lq.png",
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
                "this.overlay_35414E30_284B_AE43_41AD_848791A2790D",
                "this.overlay_35415E30_284B_AE43_4195_4443DBED2A11",
                "this.overlay_35412E30_284B_AE43_41B3_EF75821AD950",
                "this.overlay_35413E30_284B_AE43_4199_22C892F36BE6"
            ]
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 20.65,
            "autoplay": true,
            "id": "popup_B145BB0E_A5A4_212E_41D0_0BF2D52053DA",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "loop": false,
            "popupMaxHeight": "95%",
            "pitch": 6.33,
            "yaw": 157.52,
            "hideDuration": 500,
            "popupDistance": 100,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_E5C23223_FCC8_5EAA_41D6_781D022A0A87.mp4"
            }
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 6.67,
            "id": "popup_E8AE7E21_FCD8_E6A6_41B8_5D096AB27B20",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_E8AE7E21_FCD8_E6A6_41B8_5D096AB27B20_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 17.22,
            "yaw": -22.75,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "class": "VideoPlayListItem",
                    "start": "this.viewer_uid964A5F43_AABC_9C8E_41DE_3CB3A92E174BVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EDCA876D_AAB5_AC9A_41E1_73BB8ED4D14B, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EDCA876D_AAB5_AC9A_41E1_73BB8ED4D14B, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.viewer_uid964A5F43_AABC_9C8E_41DE_3CB3A92E174BVideoPlayer)",
                    "media": "this.video_E5C23223_FCC8_5EAA_41D6_781D022A0A87",
                    "player": "this.viewer_uid964A5F43_AABC_9C8E_41DE_3CB3A92E174BVideoPlayer"
                }
            ],
            "id": "PlayList_EDCA876D_AAB5_AC9A_41E1_73BB8ED4D14B"
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_347F9616_2848_DE4F_419C_A3C2CB7CBA9C",
            "levels": [
                {
                    "url": "media/popup_E8AE7E21_FCD8_E6A6_41B8_5D096AB27B20_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 1414,
                    "height": 2000
                },
                {
                    "url": "media/popup_E8AE7E21_FCD8_E6A6_41B8_5D096AB27B20_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 723,
                    "height": 1024
                },
                {
                    "url": "media/popup_E8AE7E21_FCD8_E6A6_41B8_5D096AB27B20_0_2.png",
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
                    "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
                    "class": "MapPlayListItem",
                    "media": "this.map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24",
                    "player": "this.MapViewerMapPlayer"
                }
            ],
            "id": "playList_9640BF4B_AABC_9C9F_41E4_6447E586A17C"
        },
        {
            "hfovMax": 130,
            "class": "Panorama",
            "mapLocations": [
                {
                    "map": "this.map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24",
                    "class": "PanoramaMapLocation",
                    "angle": 19.05,
                    "y": 95.92,
                    "x": 484.1
                }
            ],
            "vfov": 180,
            "hfov": 360,
            "label": "IMG_20260414_122519_00_085",
            "id": "panorama_D8107270_C15B_B847_4171_49B519CD887A",
            "thumbnailUrl": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_t.jpg",
            "frames": [
                {
                    "class": "CubicPanoramaFrame",
                    "front": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/f/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/f/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/f/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/f/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/u/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/u/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/u/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/u/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/r/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/r/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/r/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/r/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/b/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/b/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/b/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/b/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/d/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/d/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/d/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/d/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
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
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/l/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/l/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/l/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0/l/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "thumbnailUrl": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_t.jpg"
                }
            ],
            "partial": false,
            "pitch": 0,
            "overlays": [
                "this.popup_E9C4624E_FCD8_5EFA_41E3_565A087CFF1E",
                "this.overlay_510E5742_5E7F_E8C2_41C4_B807BC97989E",
                "this.overlay_4FCC1A93_5E08_746E_41B1_F5E8CC01DE35",
                "this.popup_B3F44DC0_A5A4_2112_41C8_28BBC1BA88A5",
                "this.overlay_949C3090_AA5B_658A_41D4_08DDC23D0989",
                "this.overlay_944C1A19_AA55_E4BA_41C7_064554D614A0",
                "this.overlay_9556A452_AA54_AC89_41BA_ED940A5078B7"
            ]
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "class": "VideoPlayListItem",
                    "start": "this.viewer_uid964F0F47_AABC_9C96_41C9_52B518EB2C01VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EE35A76E_AAB5_AC96_41B8_692447081C78, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EE35A76E_AAB5_AC96_41B8_692447081C78, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.viewer_uid964F0F47_AABC_9C96_41C9_52B518EB2C01VideoPlayer)",
                    "media": "this.video_E5C23223_FCC8_5EAA_41D6_781D022A0A87",
                    "player": "this.viewer_uid964F0F47_AABC_9C96_41C9_52B518EB2C01VideoPlayer"
                }
            ],
            "id": "PlayList_EE35A76E_AAB5_AC96_41B8_692447081C78"
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
            "id": "panorama_D8107270_C15B_B847_4171_49B519CD887A_camera"
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 7.6,
            "id": "popup_E9C4624E_FCD8_5EFA_41E3_565A087CFF1E",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_E9C4624E_FCD8_5EFA_41E3_565A087CFF1E_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 38.07,
            "yaw": -27.38,
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
            "closeButtonPressedBackgroundColorDirection": "vertical",
            "closeButtonPressedIconColor": "#888888",
            "backgroundColorRatios": [],
            "data": {
                "name": "Window94950"
            },
            "closeButtonPressedBorderSize": 0,
            "bodyPaddingRight": 0,
            "id": "window_97441891_AA7B_658A_41C2_3A362ACA7517",
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
                "this.viewer_uid964CDF44_AABC_9C8A_41B4_AF9B897B2C5D"
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
            "id": "panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_camera"
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": -75.55,
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
            "id": "camera_969C4FBF_AABC_9BF7_41BE_E80988BAB263"
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "class": "VideoPlayListItem",
                    "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_96403F4B_AABC_9C9F_41D4_1A06594C9F1B, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_96403F4B_AABC_9C9F_41D4_1A06594C9F1B, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
                    "media": "this.video_E5C23223_FCC8_5EAA_41D6_781D022A0A87",
                    "player": "this.MainViewerVideoPlayer"
                }
            ],
            "id": "playList_96403F4B_AABC_9C9F_41D4_1A06594C9F1B"
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
            "class": "Video",
            "label": "Virtual Reality (1)",
            "scaleMode": "fit_inside",
            "thumbnailUrl": "media/video_53CDDBAF_5EB4_5DE5_41D3_C4C5F5105A9E_t.jpg",
            "width": 2240,
            "loop": false,
            "id": "video_53CDDBAF_5EB4_5DE5_41D3_C4C5F5105A9E",
            "height": 2240,
            "video": {
                "width": 2240,
                "class": "VideoResource",
                "height": 2240,
                "mp4Url": "media/video_53CDDBAF_5EB4_5DE5_41D3_C4C5F5105A9E.mp4"
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
                "yaw": -18.32,
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
            "id": "camera_96963FD2_AABC_9B89_41CF_90F1B8D4C477"
        },
        {
            "class": "Video",
            "label": "Laboratorium komputer (1)",
            "scaleMode": "fit_inside",
            "thumbnailUrl": "media/video_E5C23223_FCC8_5EAA_41D6_781D022A0A87_t.jpg",
            "width": 2964,
            "loop": false,
            "id": "video_E5C23223_FCC8_5EAA_41D6_781D022A0A87",
            "height": 1694,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_E5C23223_FCC8_5EAA_41D6_781D022A0A87.mp4"
            }
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
                    "class": "MapPlayListItem",
                    "media": "this.map_34F5FEA4_2848_EE43_41AB_27B812B345D6",
                    "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
                }
            ],
            "id": "playList_9640CF4B_AABC_9C9F_41E0_E35C71D4767E"
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 27.93,
            "autoplay": true,
            "id": "popup_B3674806_A5A4_6F1E_41E0_4C15228DB822",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "loop": false,
            "popupMaxHeight": "95%",
            "pitch": 2.55,
            "yaw": -153.56,
            "hideDuration": 500,
            "popupDistance": 100,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_E5C23223_FCC8_5EAA_41D6_781D022A0A87.mp4"
            }
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": -107.47,
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
            "id": "camera_96AF4F9D_AABC_9BBB_41C1_CF0BA4123F0F"
        },
        {
            "class": "FadeOutEffect",
            "duration": 500,
            "id": "FadeOutEffect_B4FA05A0_A5A5_AE2D_41D8_CDD4ABD07666",
            "easing": "cubic_out"
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.23,
            "id": "popup_E45FC5EF_FCDB_E5B9_41E4_4A4F7BBAC68C",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_E45FC5EF_FCDB_E5B9_41E4_4A4F7BBAC68C_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 18.47,
            "yaw": 139.32,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "FadeInEffect",
            "duration": 500,
            "id": "FadeInEffect_B4FBE5A0_A5A5_AE2D_41C1_E0606B4B633A",
            "easing": "cubic_in"
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
                    "class": "MapPlayListItem",
                    "media": "this.map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24",
                    "player": "this.MapViewerMapPlayer"
                }
            ],
            "id": "playList_96400F4B_AABC_9C9F_41E2_2670F2097EB9"
        },
        {
            "class": "VideoPlayer",
            "viewerArea": "this.MainViewer",
            "id": "MainViewerVideoPlayer",
            "displayPlaybackBar": true
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "class": "VideoPlayListItem",
                    "start": "this.viewer_uid9648CF3E_AABC_9CF6_41E1_6B5959987907VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_EDCA176C_AAB5_AC9A_41D7_10CE39AC5569, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_EDCA176C_AAB5_AC9A_41D7_10CE39AC5569, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.viewer_uid9648CF3E_AABC_9CF6_41E1_6B5959987907VideoPlayer)",
                    "media": "this.video_E5C23223_FCC8_5EAA_41D6_781D022A0A87",
                    "player": "this.viewer_uid9648CF3E_AABC_9CF6_41E1_6B5959987907VideoPlayer"
                }
            ],
            "id": "PlayList_EDCA176C_AAB5_AC9A_41D7_10CE39AC5569"
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 44.85,
            "autoplay": true,
            "id": "popup_B33C6E63_A5A4_2316_41C5_913AA1B5D0C0",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "loop": false,
            "popupMaxHeight": "95%",
            "pitch": 3.78,
            "yaw": -52.13,
            "hideDuration": 500,
            "popupDistance": 100,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_E5C23223_FCC8_5EAA_41D6_781D022A0A87.mp4"
            }
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
                "this.Image_B3131327_A5A4_E11D_41D0_10D5CAF14405"
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
                "name": "UIComponent100600"
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
                "name": "ZoomImage100601"
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
                "name": "CloseButton100602"
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
                    "click": "this.startPanoramaWithCamera(this.panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD, this.camera_969C4FBF_AABC_9BF7_41BE_E80988BAB263); this.mainPlayList.set('selectedIndex', 0)"
                }
            ],
            "data": {
                "label": "Arrow 02b Right"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 15.96,
                    "image": "this.AnimatedImageResource_DDBCA749_C1CB_9859_41CE_FAA8D6F8CDEE",
                    "pitch": -26.01,
                    "yaw": 161.68,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "id": "overlay_DCE9BCDB_C1CA_A87A_41D9_C851122E7702",
            "maps": [
                {
                    "hfov": 15.96,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 161.68,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_3_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -26.01
                }
            ]
        },
        {
            "blending": 0,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_E5C23223_FCC8_5EAA_41D6_781D022A0A87.mp4"
            },
            "hfov": 44.41,
            "autoplay": false,
            "id": "overlay_4E769905_5E7E_B846_41C5_4CFBB54C2AB0",
            "enabledInCardboard": true,
            "loop": false,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/overlay_4E769905_5E7E_B846_41C5_4CFBB54C2AB0_t.jpg",
                        "class": "ImageResourceLevel",
                        "width": 2964,
                        "height": 1694
                    }
                ]
            },
            "pitch": 3.81,
            "useHandCursor": true,
            "roll": -0.98,
            "yaw": -51.42,
            "rotationY": 4.78,
            "class": "VideoPanoramaOverlay",
            "rotationX": -0.7,
            "toolTip": "Klik untuk Memutar Video",
            "videoVisibleOnStop": false,
            "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_B33C6E63_A5A4_2316_41C5_913AA1B5D0C0, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_974B2891_AA7B_658A_41DB_E940F6529976, this.video_E5C23223_FCC8_5EAA_41D6_781D022A0A87, this.PlayList_EDCA876D_AAB5_AC9A_41E1_73BB8ED4D14B, '95%', '95%', true, true) }; this.overlay_4E769905_5E7E_B846_41C5_4CFBB54C2AB0.play()",
            "data": {
                "label": "Video"
            },
            "vfov": 31.46,
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
                    "toolTip": "Visi Misi",
                    "click": "this.showPopupPanoramaOverlay(this.popup_4C0FA7F5_5E08_1BAA_41D5_36E2D02B212C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_4C0F57F5_5E08_1BAA_41C5_DADDB64DEE7B, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Image"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 6.15,
                    "image": "this.AnimatedImageResource_4D48E094_5E78_346A_41D0_288996CF363D",
                    "pitch": 8.43,
                    "yaw": 73.15,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_4C033812_5E08_146E_41C6_F20553B7B3E6",
            "maps": [
                {
                    "hfov": 6.15,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 73.15,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_4_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 8.43
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
                    "hfov": 65,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_5_0.png",
                                "class": "ImageResourceLevel",
                                "width": 2048,
                                "height": 1105
                            }
                        ]
                    },
                    "pitch": -2.33,
                    "yaw": -117.1
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Papan Tulis"
                }
            ],
            "id": "overlay_E9972C07_AA55_7C97_41D8_902AD932159A",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 65,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -117.1,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_5_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 200,
                                "height": 107
                            }
                        ]
                    },
                    "pitch": -2.33
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
                    "hfov": 10.91,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_6_0.png",
                                "class": "ImageResourceLevel",
                                "width": 361,
                                "height": 156
                            }
                        ]
                    },
                    "pitch": 19.17,
                    "yaw": 74.98
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Air Conditioner (AC)"
                }
            ],
            "id": "overlay_EA6585A5_AA57_AF8A_4153_8B60CD787F19",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 10.91,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 74.98,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_6_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 180,
                                "height": 78
                            }
                        ]
                    },
                    "pitch": 19.17
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
                    "hfov": 14,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_7_0.png",
                                "class": "ImageResourceLevel",
                                "width": 465,
                                "height": 220
                            }
                        ]
                    },
                    "pitch": 24.84,
                    "yaw": 163.57
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Air Conditioner (AC)"
                }
            ],
            "id": "overlay_94C18353_AA55_A48E_41D3_50633404EB1D",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 14,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 163.57,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_7_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 200,
                                "height": 94
                            }
                        ]
                    },
                    "pitch": 24.84
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
                    "click": "this.startPanoramaWithCamera(this.panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3, this.camera_96A7CFAF_AABC_9B97_41B4_732DF59D5FA0); this.mainPlayList.set('selectedIndex', 3)"
                }
            ],
            "data": {
                "label": "Arrow 01b"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 12.09,
                    "image": "this.AnimatedImageResource_EDC05760_AAB5_AC8A_419D_A75BE218744B",
                    "pitch": -43.35,
                    "yaw": 72.53,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_94E6DE86_AA5B_BD96_41C5_4761DDBBA750",
            "maps": [
                {
                    "hfov": 12.09,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 72.53,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_8_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -43.35
                }
            ]
        },
        {
            "blending": 0,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_E5C23223_FCC8_5EAA_41D6_781D022A0A87.mp4"
            },
            "hfov": 28.9,
            "autoplay": false,
            "id": "overlay_5100FA67_5E7E_98C2_41D1_25DADAB1B623",
            "enabledInCardboard": true,
            "loop": false,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/overlay_5100FA67_5E7E_98C2_41D1_25DADAB1B623_t.jpg",
                        "class": "ImageResourceLevel",
                        "width": 2964,
                        "height": 1694
                    }
                ]
            },
            "pitch": 2.58,
            "useHandCursor": true,
            "roll": -0.45,
            "yaw": -154.6,
            "rotationY": -18.28,
            "class": "VideoPanoramaOverlay",
            "rotationX": 3.74,
            "toolTip": "Klik untuk Memutar Video",
            "videoVisibleOnStop": false,
            "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_B3674806_A5A4_6F1E_41E0_4C15228DB822, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_9745F892_AA7B_658E_41E1_EA78CD5E0436, this.video_E5C23223_FCC8_5EAA_41D6_781D022A0A87, this.PlayList_EE35A76E_AAB5_AC96_41B8_692447081C78, '95%', '95%', true, true) }; this.overlay_5100FA67_5E7E_98C2_41D1_25DADAB1B623.play()",
            "data": {
                "label": "Video"
            },
            "vfov": 20.08,
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
                    "toolTip": "Visi Misi",
                    "click": "this.showPopupPanoramaOverlay(this.popup_E8AE7E21_FCD8_E6A6_41B8_5D096AB27B20, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_347F9616_2848_DE4F_419C_A3C2CB7CBA9C, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Image"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 7.91,
                    "image": "this.AnimatedImageResource_4D4A4095_5E78_346A_41D7_742718D873F9",
                    "pitch": 17.22,
                    "yaw": -22.75,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_4D80BBF5_5E08_0BAA_41A1_153D6E2136D9",
            "maps": [
                {
                    "hfov": 7.91,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -22.75,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_4_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 17.22
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
                "label": "Arrow 01b"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 18.65,
                    "image": "this.AnimatedImageResource_EDCD3765_AAB5_AC8B_41AC_5DC72DB0723A",
                    "pitch": -26.16,
                    "yaw": 129.19,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_95B50EF9_AA5D_9D7A_41B5_D36C6611C978",
            "maps": [
                {
                    "hfov": 18.65,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 129.19,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_5_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -26.16
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
                    "hfov": 13.99,
                    "image": "this.AnimatedImageResource_EDCDA765_AAB5_AC8B_41C2_422979FBFBBA",
                    "pitch": -47.69,
                    "yaw": -20.78,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_97174C60_AA5D_9C8A_41E4_C808B02E0C00",
            "maps": [
                {
                    "hfov": 13.99,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -20.78,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_6_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -47.69
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
                    "click": "this.startPanoramaWithCamera(this.panorama_D8127ED5_C15A_6849_41E5_80572F3565FA, this.camera_96AF4F9D_AABC_9BBB_41C1_CF0BA4123F0F); this.mainPlayList.set('selectedIndex', 1)"
                }
            ],
            "data": {
                "label": "Arrow 01b"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 10.72,
                    "image": "this.AnimatedImageResource_EDCDE765_AAB5_AC8B_41D2_4A42C5BA300E",
                    "pitch": -42.53,
                    "yaw": 178.02,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_950ED242_AA5C_A489_41B0_F62042AACC14",
            "maps": [
                {
                    "hfov": 10.72,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 178.02,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_7_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -42.53
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
                    "hfov": 38.02,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_8_0.png",
                                "class": "ImageResourceLevel",
                                "width": 1305,
                                "height": 674
                            }
                        ]
                    },
                    "pitch": -0.98,
                    "yaw": 167.15
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Papan Tulis"
                }
            ],
            "id": "overlay_948ECAF6_AA5C_E576_41E1_0838B0602EBB",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 38.02,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 167.15,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_8_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 200,
                                "height": 103
                            }
                        ]
                    },
                    "pitch": -0.98
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
                    "hfov": 16.83,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_9_0.png",
                                "class": "ImageResourceLevel",
                                "width": 560,
                                "height": 259
                            }
                        ]
                    },
                    "pitch": 28.99,
                    "yaw": -7.93
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Air Conditioner (AC)"
                }
            ],
            "id": "overlay_95244297_AA54_A5B7_41AB_AA353472BAF2",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 16.83,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -7.93,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_9_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 200,
                                "height": 92
                            }
                        ]
                    },
                    "pitch": 28.99
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
                    "hfov": 12.18,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_10_0.png",
                                "class": "ImageResourceLevel",
                                "width": 404,
                                "height": 245
                            }
                        ]
                    },
                    "pitch": 23.23,
                    "yaw": 107.25
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Air Conditioner (AC)"
                }
            ],
            "id": "overlay_97DA643A_AA54_ACFE_41DC_051533F71C46",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 12.18,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 107.25,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_10_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 200,
                                "height": 120
                            }
                        ]
                    },
                    "pitch": 23.23
                }
            ]
        },
        {
            "progressBarBorderColor": "#000000",
            "progressBackgroundColorDirection": "vertical",
            "id": "viewer_uid964A5F43_AABC_9C8E_41DE_3CB3A92E174B",
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
                "name": "ViewerArea100597"
            }
        },
        {
            "class": "VideoPlayer",
            "viewerArea": "this.viewer_uid964CDF44_AABC_9C8A_41B4_AF9B897B2C5D",
            "id": "viewer_uid964CDF44_AABC_9C8A_41B4_AF9B897B2C5DVideoPlayer",
            "displayPlaybackBar": true
        },
        {
            "class": "PanoramaPlayListItem",
            "camera": "this.panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_camera",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_96437F4D_AABC_9C9B_41E1_DC9F6C9F256F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
            "media": "this.panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_96437F4D_AABC_9C9B_41E1_DC9F6C9F256F"
        },
        {
            "class": "PanoramaPlayListItem",
            "camera": "this.panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_camera",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_96420F4F_AABC_9C97_41DF_CCFB77917023, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
            "media": "this.panorama_D8127ED5_C15A_6849_41E5_80572F3565FA",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_96420F4F_AABC_9C97_41DF_CCFB77917023"
        },
        {
            "class": "PanoramaPlayListItem",
            "camera": "this.panorama_D8107270_C15B_B847_4171_49B519CD887A_camera",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_9645BF4F_AABC_9C97_41E1_0007BD14926F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
            "media": "this.panorama_D8107270_C15B_B847_4171_49B519CD887A",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_9645BF4F_AABC_9C97_41E1_0007BD14926F"
        },
        {
            "class": "PanoramaPlayListItem",
            "end": "this.trigger('tourEnded')",
            "camera": "this.panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_camera",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_96452F4F_AABC_9C97_41C7_5A2CE00F5A41, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 0)",
            "media": "this.panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_96452F4F_AABC_9C97_41C7_5A2CE00F5A41"
        },
        {
            "progressBarBorderColor": "#000000",
            "progressBackgroundColorDirection": "vertical",
            "id": "viewer_uid964F0F47_AABC_9C96_41C9_52B518EB2C01",
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
                "name": "ViewerArea100599"
            }
        },
        {
            "progressBarBorderColor": "#000000",
            "progressBackgroundColorDirection": "vertical",
            "id": "viewer_uid9648CF3E_AABC_9CF6_41E1_6B5959987907",
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
                "name": "ViewerArea100596"
            }
        },
        {
            "map": {
                "width": 104.95,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24_HS_0_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 20,
                            "height": 16
                        }
                    ]
                },
                "y": 1460.11,
                "x": 374.64,
                "offsetY": 0,
                "height": 80.73,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": true,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 80.73,
                "y": 1460.11,
                "width": 104.95,
                "x": 374.64,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24_HS_0.png",
                            "class": "ImageResourceLevel",
                            "width": 104,
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
            "id": "overlay_F00DD8DA_FCC8_2B9A_41D6_53B6C371DF20",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 104.95,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24_HS_1_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 20,
                            "height": 16
                        }
                    ]
                },
                "y": 690.88,
                "x": 397.44,
                "offsetY": 0,
                "height": 80.73,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": true,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 80.73,
                "y": 690.88,
                "width": 104.95,
                "x": 397.44,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24_HS_1.png",
                            "class": "ImageResourceLevel",
                            "width": 104,
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
            "id": "overlay_F0739086_FCC8_5A6B_41E5_3C74A671FE71",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 104.95,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24_HS_2_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 20,
                            "height": 16
                        }
                    ]
                },
                "y": 360.4,
                "x": 431.62,
                "offsetY": 0,
                "height": 80.73,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": true,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 80.73,
                "y": 360.4,
                "width": 104.95,
                "x": 431.62,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24_HS_2.png",
                            "class": "ImageResourceLevel",
                            "width": 104,
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
            "id": "overlay_F73DB9EC_FCC8_2DBF_41C7_8D19C187DFA3",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 104.95,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24_HS_3_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 20,
                            "height": 16
                        }
                    ]
                },
                "y": 55.56,
                "x": 431.62,
                "offsetY": 0,
                "height": 80.73,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": true,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 80.73,
                "y": 55.56,
                "width": 104.95,
                "x": 431.62,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_F04EBE45_FCC8_E6E9_41EC_B6A21C0EDE24_HS_3.png",
                            "class": "ImageResourceLevel",
                            "width": 104,
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
            "id": "overlay_F0064500_FCC8_FA66_41E8_4C5DBC08E456",
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
                    "click": "this.startPanoramaWithCamera(this.panorama_D8127ED5_C15A_6849_41E5_80572F3565FA, this.camera_96963FD2_AABC_9B89_41CF_90F1B8D4C477); this.mainPlayList.set('selectedIndex', 1)"
                }
            ],
            "data": {
                "label": "Arrow 01b"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 17.13,
                    "image": "this.AnimatedImageResource_D9FF77AE_C17E_B8DA_41D7_EAAF1380C1C5",
                    "pitch": -34.47,
                    "yaw": 104.45,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_D9D19970_C146_6847_41E0_858CFFF511DD",
            "maps": [
                {
                    "hfov": 17.13,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 104.45,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_1_HS_0_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 29,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -34.47
                }
            ]
        },
        {
            "blending": 0,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_E5C23223_FCC8_5EAA_41D6_781D022A0A87.mp4"
            },
            "hfov": 20.32,
            "autoplay": false,
            "id": "overlay_E5039074_FCCB_DAAF_41CA_4C1B0764B321",
            "enabledInCardboard": true,
            "loop": false,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/overlay_E5039074_FCCB_DAAF_41CA_4C1B0764B321_t.jpg",
                        "class": "ImageResourceLevel",
                        "width": 2964,
                        "height": 1694
                    }
                ]
            },
            "pitch": 6.49,
            "useHandCursor": true,
            "roll": 0.33,
            "yaw": 157.53,
            "rotationY": 2.05,
            "class": "VideoPanoramaOverlay",
            "rotationX": -9.39,
            "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_B145BB0E_A5A4_212E_41D0_0BF2D52053DA, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_974A6890_AA7B_6589_41DB_29C317F10CD6, this.video_E5C23223_FCC8_5EAA_41D6_781D022A0A87, this.PlayList_EDCA176C_AAB5_AC9A_41D7_10CE39AC5569, '95%', '95%', true, true) }; this.overlay_E5039074_FCCB_DAAF_41CA_4C1B0764B321.play()",
            "videoVisibleOnStop": false,
            "data": {
                "label": "Video"
            },
            "vfov": 11.85,
            "distance": 50
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 15.1,
                    "image": "this.AnimatedImageResource_4DAA81CB_5D9D_ABC2_41D7_382FC9015A99",
                    "pitch": -2.46,
                    "yaw": -112.95,
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
                    "click": "this.openLink('../index.htm?media-name=IMG_20260427_113743_00_003', '_self')"
                }
            ],
            "id": "overlay_501C7108_5D9E_A84E_41AC_37230FB92812",
            "data": {
                "label": "Circle Door 02"
            },
            "maps": [
                {
                    "hfov": 15.1,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -112.95,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_3_0_0_map.gif",
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
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "hfov": 13.93,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_4_0.png",
                                "class": "ImageResourceLevel",
                                "width": 460,
                                "height": 542
                            }
                        ]
                    },
                    "pitch": -0.47,
                    "yaw": 104.18
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_51774B61_5E7D_78FE_41CE_21A15B110B74",
            "data": {
                "label": "Image"
            },
            "maps": [
                {
                    "hfov": 13.93,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 104.18,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_4_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 18
                            }
                        ]
                    },
                    "pitch": -0.47
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
                    "click": "this.showPopupPanoramaOverlay(this.popup_E45FC5EF_FCDB_E5B9_41E4_4A4F7BBAC68C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_EA860901_FCD8_2A66_41E2_1605661E2E6C, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Image"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.9,
                    "image": "this.AnimatedImageResource_4D47C094_5E78_346A_4124_E1F544ED1530",
                    "pitch": 18.47,
                    "yaw": 139.32,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_4C636CB9_5E08_0D9A_41BC_FB7AD936C42C",
            "maps": [
                {
                    "hfov": 3.9,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 139.32,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_6_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 18.47
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 21.73,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_7_0.png",
                                "class": "ImageResourceLevel",
                                "width": 733,
                                "height": 194
                            }
                        ]
                    },
                    "pitch": -12.02,
                    "yaw": -111.65,
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
            "id": "overlay_B1ADE75E_A5A4_212E_41E2_3D099A3FF34F",
            "data": {
                "label": "Pintu Keluar"
            },
            "maps": [
                {
                    "hfov": 21.73,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -111.65,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_7_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 60,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -12.02
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
                    "hfov": 37.64,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_8_0.png",
                                "class": "ImageResourceLevel",
                                "width": 1232,
                                "height": 2048
                            }
                        ]
                    },
                    "pitch": -9.72,
                    "yaw": 81.41
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
            "id": "overlay_975E5E0A_AA74_9C9E_41D5_C691A2DD1975",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 37.64,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 81.41,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_8_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 120,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -9.72
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
                    "hfov": 36.97,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_9_0.png",
                                "class": "ImageResourceLevel",
                                "width": 1266,
                                "height": 1979
                            }
                        ]
                    },
                    "pitch": -11.05,
                    "yaw": 44.58
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
            "id": "overlay_939A8795_AA74_AB8A_41E1_D8CA7B16CB50",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 36.97,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 44.58,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_9_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 128,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -11.05
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
                    "hfov": 28.72,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_10_0.png",
                                "class": "ImageResourceLevel",
                                "width": 969,
                                "height": 1333
                            }
                        ]
                    },
                    "pitch": -7.08,
                    "yaw": -79.33
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
            "id": "overlay_94440426_AA4D_6C96_41E2_0E28CBB8A1F4",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 28.72,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -79.33,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_10_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 145,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -7.08
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
                    "hfov": 15.83,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_11_0.png",
                                "class": "ImageResourceLevel",
                                "width": 526,
                                "height": 1212
                            }
                        ]
                    },
                    "pitch": -7.65,
                    "yaw": -149.59
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
            "id": "overlay_95BA7254_AA4C_A48A_419B_A6EB3527E67A",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 15.83,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -149.59,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_11_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 86,
                                "height": 200
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
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 19.05,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_12_0.png",
                                "class": "ImageResourceLevel",
                                "width": 635,
                                "height": 1227
                            }
                        ]
                    },
                    "pitch": -8.83,
                    "yaw": -28.14
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
            "id": "overlay_9418961C_AA4C_ECBA_41DF_4D5E518EDFED",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 19.05,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -28.14,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_12_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 103,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -8.83
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
                    "hfov": 43.34,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_13_0.png",
                                "class": "ImageResourceLevel",
                                "width": 1505,
                                "height": 795
                            }
                        ]
                    },
                    "pitch": 3.31,
                    "yaw": -28.71
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Papan Tulis"
                }
            ],
            "id": "overlay_964FEFEE_AA4B_7B99_41D0_33F2BFAE0686",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 43.34,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -28.71,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_13_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 200,
                                "height": 105
                            }
                        ]
                    },
                    "pitch": 3.31
                }
            ]
        },
        {
            "map": {
                "width": 80,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_34F5FEA4_2848_EE43_41AB_27B812B345D6_HS_0_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 1460.11,
                "x": 374.5,
                "offsetY": 0,
                "height": 80,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": false,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 80,
                "y": 1460.11,
                "width": 80,
                "x": 374.5,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_34F5FEA4_2848_EE43_41AB_27B812B345D6_HS_0.png",
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
            "id": "overlay_35414E30_284B_AE43_41AD_848791A2790D",
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
                            "url": "media/map_34F5FEA4_2848_EE43_41AB_27B812B345D6_HS_1_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 705.13,
                "x": 424.36,
                "offsetY": 0,
                "height": 80,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": false,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 80,
                "y": 705.13,
                "width": 80,
                "x": 424.36,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_34F5FEA4_2848_EE43_41AB_27B812B345D6_HS_1.png",
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
            "id": "overlay_35415E30_284B_AE43_4195_4443DBED2A11",
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
                            "url": "media/map_34F5FEA4_2848_EE43_41AB_27B812B345D6_HS_2_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 370.37,
                "x": 440.03,
                "offsetY": 0,
                "height": 80,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": false,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 80,
                "y": 370.37,
                "width": 80,
                "x": 440.03,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_34F5FEA4_2848_EE43_41AB_27B812B345D6_HS_2.png",
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
            "id": "overlay_35412E30_284B_AE43_41B3_EF75821AD950",
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
                            "url": "media/map_34F5FEA4_2848_EE43_41AB_27B812B345D6_HS_3_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 55.56,
                "x": 431.48,
                "offsetY": 0,
                "height": 80,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": false,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 80,
                "y": 55.56,
                "width": 80,
                "x": 431.48,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_34F5FEA4_2848_EE43_41AB_27B812B345D6_HS_3.png",
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
            "id": "overlay_35413E30_284B_AE43_4199_22C892F36BE6",
            "data": {
                "label": "Image"
            }
        },
        {
            "class": "VideoPlayer",
            "viewerArea": "this.viewer_uid964A5F43_AABC_9C8E_41DE_3CB3A92E174B",
            "id": "viewer_uid964A5F43_AABC_9C8E_41DE_3CB3A92E174BVideoPlayer",
            "displayPlaybackBar": true
        },
        {
            "blending": 0,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_E5C23223_FCC8_5EAA_41D6_781D022A0A87.mp4"
            },
            "hfov": 21.07,
            "autoplay": false,
            "id": "overlay_510E5742_5E7F_E8C2_41C4_B807BC97989E",
            "enabledInCardboard": true,
            "loop": false,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/overlay_510E5742_5E7F_E8C2_41C4_B807BC97989E_t.jpg",
                        "class": "ImageResourceLevel",
                        "width": 2964,
                        "height": 1694
                    }
                ]
            },
            "pitch": 1.99,
            "useHandCursor": true,
            "roll": -0.02,
            "yaw": -161.5,
            "rotationY": -28.2,
            "class": "VideoPanoramaOverlay",
            "rotationX": 4.92,
            "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_B3F44DC0_A5A4_2112_41C8_28BBC1BA88A5, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_97441891_AA7B_658A_41C2_3A362ACA7517, this.video_E5C23223_FCC8_5EAA_41D6_781D022A0A87, this.PlayList_EE35276D_AAB5_AC9A_41DB_8DF346EE9A24, '95%', '95%', true, true) }; this.overlay_510E5742_5E7F_E8C2_41C4_B807BC97989E.play()",
            "videoVisibleOnStop": false,
            "data": {
                "label": "Video"
            },
            "vfov": 14.62,
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
                    "toolTip": "Visi Misi",
                    "click": "this.showPopupPanoramaOverlay(this.popup_E9C4624E_FCD8_5EFA_41E3_565A087CFF1E, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_EA886901_FCD8_2A66_41D0_B358AFFC60F3, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Image"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 7.5,
                    "image": "this.AnimatedImageResource_4D496094_5E78_346A_41C1_AA942E5D2506",
                    "pitch": 38.07,
                    "yaw": -27.38,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_4FCC1A93_5E08_746E_41B1_F5E8CC01DE35",
            "maps": [
                {
                    "hfov": 7.5,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -27.38,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0_HS_2_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 38.07
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
                    "hfov": 27.68,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0_HS_3_0.png",
                                "class": "ImageResourceLevel",
                                "width": 933,
                                "height": 484
                            }
                        ]
                    },
                    "pitch": -0.62,
                    "yaw": 171.81
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Papan Tulis"
                }
            ],
            "id": "overlay_949C3090_AA5B_658A_41D4_08DDC23D0989",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 27.68,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 171.81,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0_HS_3_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 200,
                                "height": 103
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
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 27.5,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0_HS_4_0.png",
                                "class": "ImageResourceLevel",
                                "width": 927,
                                "height": 569
                            }
                        ]
                    },
                    "pitch": 53.01,
                    "yaw": 0.38
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Air Conditioner (AC)"
                }
            ],
            "id": "overlay_944C1A19_AA55_E4BA_41C7_064554D614A0",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 27.5,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 0.38,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0_HS_4_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 200,
                                "height": 122
                            }
                        ]
                    },
                    "pitch": 53.01
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
                    "hfov": 8.87,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0_HS_5_0.png",
                                "class": "ImageResourceLevel",
                                "width": 294,
                                "height": 216
                            }
                        ]
                    },
                    "pitch": 19.74,
                    "yaw": 127.49
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Air Conditioner (AC)"
                }
            ],
            "id": "overlay_9556A452_AA54_AC89_41BA_ED940A5078B7",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 8.87,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 127.49,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0_HS_5_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 147,
                                "height": 108
                            }
                        ]
                    },
                    "pitch": 19.74
                }
            ]
        },
        {
            "class": "VideoPlayer",
            "viewerArea": "this.viewer_uid964F0F47_AABC_9C96_41C9_52B518EB2C01",
            "id": "viewer_uid964F0F47_AABC_9C96_41C9_52B518EB2C01VideoPlayer",
            "displayPlaybackBar": true
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
            "id": "viewer_uid964CDF44_AABC_9C8A_41B4_AF9B897B2C5D",
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
                "name": "ViewerArea100598"
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
            "toolTipShadowBlurRadius": 3,
            "playbackBarHeight": 10,
            "playbackBarBackgroundColorDirection": "vertical",
            "toolTipTextShadowColor": "#000000",
            "playbackBarBackgroundColor": [
                "#FFFFFF"
            ],
            "playbackBarHeadWidth": 6,
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
            "height": "80%",
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
            "playbackBarProgressBackgroundColor": [
                "#3399FF"
            ],
            "playbackBarOpacity": 1,
            "bottom": "8.86%",
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
            "class": "VideoPlayer",
            "viewerArea": "this.viewer_uid9648CF3E_AABC_9CF6_41E1_6B5959987907",
            "id": "viewer_uid9648CF3E_AABC_9CF6_41E1_6B5959987907VideoPlayer",
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
            "id": "Image_B3131327_A5A4_E11D_41D0_10D5CAF14405",
            "left": "0%",
            "paddingRight": 0,
            "paddingLeft": 0,
            "borderSize": 0,
            "url": "skin/Image_B3131327_A5A4_E11D_41D0_10D5CAF14405.png",
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
                "name": "tittlemath"
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
            "id": "AnimatedImageResource_DDBCA749_C1CB_9859_41CE_FAA8D6F8CDEE",
            "levels": [
                {
                    "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_3_0.png",
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
            "id": "AnimatedImageResource_4D48E094_5E78_346A_41D0_288996CF363D",
            "levels": [
                {
                    "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_4_0.png",
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
            "id": "AnimatedImageResource_EDC05760_AAB5_AC8A_419D_A75BE218744B",
            "levels": [
                {
                    "url": "media/panorama_D8127ED5_C15A_6849_41E5_80572F3565FA_0_HS_8_0.png",
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
            "id": "AnimatedImageResource_4D4A4095_5E78_346A_41D7_742718D873F9",
            "levels": [
                {
                    "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_4_0.png",
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
            "id": "AnimatedImageResource_EDCD3765_AAB5_AC8B_41AC_5DC72DB0723A",
            "levels": [
                {
                    "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_5_0.png",
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
            "id": "AnimatedImageResource_EDCDA765_AAB5_AC8B_41C2_422979FBFBBA",
            "levels": [
                {
                    "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_6_0.png",
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
            "id": "AnimatedImageResource_EDCDE765_AAB5_AC8B_41D2_4A42C5BA300E",
            "levels": [
                {
                    "url": "media/panorama_D8137628_C15B_9BC6_41BF_3A3386997DE3_0_HS_7_0.png",
                    "class": "ImageResourceLevel",
                    "width": 400,
                    "height": 360
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 3,
            "frameCount": 9,
            "frameDuration": 62,
            "colCount": 3,
            "id": "AnimatedImageResource_D9FF77AE_C17E_B8DA_41D7_EAAF1380C1C5",
            "levels": [
                {
                    "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_1_HS_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 330,
                    "height": 180
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 6,
            "frameCount": 24,
            "frameDuration": 41,
            "colCount": 4,
            "id": "AnimatedImageResource_4DAA81CB_5D9D_ABC2_41D7_382FC9015A99",
            "levels": [
                {
                    "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_3_0.png",
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
            "id": "AnimatedImageResource_4D47C094_5E78_346A_4124_E1F544ED1530",
            "levels": [
                {
                    "url": "media/panorama_D9F62AAB_C15A_68D9_41D4_2AE0607B38BD_0_HS_6_0.png",
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
            "id": "AnimatedImageResource_4D496094_5E78_346A_41C1_AA942E5D2506",
            "levels": [
                {
                    "url": "media/panorama_D8107270_C15B_B847_4171_49B519CD887A_0_HS_2_0.png",
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
            "click": "this.showPopupImage(this.ImageResource_B4FBF5A0_A5A5_AE2D_41B0_E4939D3E94DA, null, '90%', '90%', this.FadeInEffect_B4FBE5A0_A5A5_AE2D_41C1_E0606B4B633A, this.FadeOutEffect_B4FA05A0_A5A5_AE2D_41D8_CDD4ABD07666, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
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

