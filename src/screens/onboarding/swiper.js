/**
 * swiper by me
 * renders swiper wtih pagination indicators and a button to go to next page
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, ScrollView } from 'react-native';
import Button from '../../components/buttons/started';

const {width, height} = Dimensions.get('window');


export default class Screens extends Component {
    static defaultProps = {
        horizontal: true, //screens horizontally
        pagingEnabled: true, //scroll to next screen
        showsHorizontalScrollIndicator: false, //hide all indicators
        showsVerticalScrollIndicator: false,
        bounces: false, //do not bounce until end
        scrollsToTop: false, //do not scrool when status bar is tapped
        removeClippedSubviews: true, // remove child views
        automaticallyAdjustContentInsets: false, //dont adjust content behind nav
        index: 0, //first screen is active
    };

    _moveOne = () => {
        this.props.navigation.navigate('starting')
    };

    state = this.initState(this.props);
    initState(props) {
        const total = props.children ? props.children.length  || 1 : 0, //get total no of slides
        index = total > 1 ? Math.min(props.index, total - 1) : 0, //current index
        offset = width * index; //current offset
        const state = {
            total, 
            index,
            offset,
            width,
            height,
        };

        this.internals= {
            isScrolling: false,
            offset
        };
        return state;

    }

    /**
     * scroll handler begin
     *@ param {object} e native event
    */

    onScrollBegin = e => {
        this.internals.isScrolling = true; //update isScrolling to true
    };
    
    /** 
     * end scroll handler 
     */

    onScrollEnd = e => {
        this.internals.isScrolling = false;

        this.updateIndex(e.nativeEvent.contentOffset //update index
            ? e.nativeEvent.contentOffset.x
            : e.nativeEvent.position  * this.state.width
            );
    }

    onScrollEndDrag = e => {
        const { contentOffset: { x: newOffest } } = e.nativeEvent,
        { children } = this.props,
        {index} = this.state,
        {offset} = this.internals;
        /**
         * update isScrolling state if swiped right on the last slide or left on first slide
         */
        if (offset === newOffest && 
            (index === 0 || index === children.length - 1)) {
                this.internals.isScrolling = false;
        }
    }

    /**
     * update index after scroll
     * @ param {object} offset content offset
     */

    updateIndex = (offset) => {
        const state = this.state,
        diff = offset - this.internals.offset,
        step = state.width;
        let index = state.index;

        // do nothing is offset no change
        if (!diff) {
            return;
        }
        //index is an integer compulsory
        index = parseInt(index + Math.round(diff / step), 10);
        //update offset
        this.internals.offset = offset;
        //update index in state
        this.setState({
            index
        });
    }
    /**
     * swipe a slide forward
     */
    swipe = () => {
        //ignore if already scrolling or less than 2 screens
        if (this.internals.isScrolling || this.state.total < 2) {
            return;
        }
        const state = this.state,
        diff = this.state.index + 1,
        x = diff * state.width,
        y = 0;

        //call scrollT0 on scrollView component to perform the swipe
        this.scrollView && this.scrollView.scrollTo({x, y, animated: true});

        //update internal scroll state
        this.internals.isScrolling = true;
        //trigger onScrollend  manually on android
        if (Platform.OS === 'android') {
            setImmediate(() => {
                this.onScrollEnd({
                    nativeEvent: {
                        position: diff
                    }
                });
            });
        }
    }

    /**
     * render scrollView component
     * @ param {array} slides to swipe through 
     */

    renderScrollView = pages => {
        return (
            <ScrollView ref={component => {this.scrollView = component;}}
            {...this.props}
            contentContainerStyle={[styles.wrapper, this.props.style]}
            onScrollBeginDrag={this.onScrollBegin}
            onMomentumScrollEnd={this.onScrollEnd}
            onScrollEndDrag={this.onScrollEndDrag}
            >
            {pages.map((page, i) => 
            //render each slide in a view
                <View style={[styles.fullScreen, styles.slide]} key={i}>
                    {page}
                </View>
            )}
            </ScrollView>
        );
    }

    /**
     * render pagination indicators
     */
    renderPagination = () => {
        if(this.state.total <= 1) {
            return null;
        }

        const ActiveDot = <View style={[styles.dot, styles.activeDot]} />,
        Dot = <View style={styles.dot} />;

        let dots = [];

        for (let key = 0; key < this.state.total; key++) {
            dots.push(key === this.state.index
                ? React.cloneElement(ActiveDot, {key}) //active dot
                : React.cloneElement(Dot, {key}) //other dots
            );
        }
        return (
            <View 
             pointerEvents="none"
             style={[styles.pagination, styles.fullScreen]}
            >{dots}</View>
        );
    }

    /**
     * continue button but this one goes to next screen
     */
    renderButton = () => {
        const lastScreen = this.state.index === this.state.total - 1;
        return (
            <View pointerEvents="box-none" style={[styles.buttonWrapper, styles.fullScreen]}>
             {lastScreen
              //show this button on last screen
              //add a handler that would send a user to your app after onboarding is done
              ? <Button text="Get Started" onPress={() => this._moveOne()} />
              : <Button text="Continue" onPress={() => this.swipe()} />
             }
            </View>
        );
    }

    /**
     * render component
     */
    render = ({children}=this.props) => {
        return (
            <View style={[styles.container, styles.fullScreen]}>
                {/* render screens */}
                {this.renderScrollView(children)}
                {/* render pagination */}
                {this.renderPagination()}
                {/* render button */}
                {this.renderButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fullScreen: {
        width: width,
        height: height,
    },
    container: {
        backgroundColor: 'transparent',
        position: 'relative',
    },
    slide: {
        backgroundColor: 'transparent',
    },
    pagination: {
        position: 'absolute',
        bottom: 110,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.25)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot: {
        backgroundColor: '#fffff'
    },
    buttonWrapper: {
        flexDirection: 'column',
        backgroundColorl: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 40,
        alignItems: 'center',
    },
});