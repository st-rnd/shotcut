/*
 * Copyright (c) 2017-2019 Meltytech, LLC
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function trackHeight(isCurves) {
    return isCurves? (multitrack.trackHeight * 2) : (multitrack.trackHeight < 30)? 20 : 36
}

function scrollIfNeeded() {
    var x = producer.position * timeScale;
    if (!scrollView) return;
    if (settings.timelineCenterPlayhead) {
        if (x > scrollView.flickableItem.contentX + scrollView.width * 0.5)
            scrollView.flickableItem.contentX = x - scrollView.width * 0.5;
        else if (x < scrollView.width * 0.5)
            scrollView.flickableItem.contentX = 0;
        else if (x < scrollView.flickableItem.contentX + scrollView.width * 0.5)
            scrollView.flickableItem.contentX = x - scrollView.width * 0.5;
    } else {
        if (x > scrollView.flickableItem.contentX + scrollView.width - 50)
            scrollView.flickableItem.contentX = x - scrollView.width + 50;
        else if (x < 50)
            scrollView.flickableItem.contentX = 0;
        else if (x < scrollView.flickableItem.contentX + 50)
            scrollView.flickableItem.contentX = x - 50;
    }
}

function seekPreviousSimple() {
    var position = producer.position + producer.in
    if (position > filter.out)
        position = filter.out
    else if (position > filter.out - filter.animateOut + 1)
        position = filter.out - filter.animateOut + 1
    else if (position > filter.in + filter.animateIn - 1)
        position = filter.in + filter.animateIn - 1
    else if (position > filter.in)
        position = filter.in
    else
        position = 0
    producer.position = position - producer.in
}

function seekNextSimple() {
    var position = producer.position + producer.in
    if (position < filter.in)
        position = filter.in
    else if (position < filter.in + filter.animateIn - 1)
        position = filter.in + filter.animateIn - 1
    else if (position < filter.out - filter.animateOut + 1)
        position = filter.out - filter.animateOut + 1
    else if (position < filter.out)
        position = filter.out
    else
        position = producer.out
    producer.position = Math.min(position - producer.in, producer.duration - 1)
}
