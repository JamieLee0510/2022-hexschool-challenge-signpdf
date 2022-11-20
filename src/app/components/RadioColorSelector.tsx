import React from 'react'
import styled from 'styled-components'

const SelectorLayer = styled.div``

export default function RadioColorSelector() {
    return (
        <div>
            <label className='orange'>
                <input type='radio' name='color' value='orange' />
                <div className='layer' />
                <div className='button'>
                    <span />
                </div>
            </label>

            <label className='amber'>
                <input type='radio' name='color' value='amber' />
                <div className='layer' />
                <div className='button'>
                    <span />
                </div>
            </label>

            <label className='lime'>
                <input type='radio' name='color' value='lime' />
                <div className='layer' />
                <div className='button'>
                    <span />
                </div>
            </label>
        </div>
    )
}
