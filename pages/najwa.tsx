import {
    Bold,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Text,
    Title
} from '@tremor/react'

import AsFernImg from '../assets/plants/IMG_4327.jpg'
import BirdsNestImg from '../assets/plants/IMG_4320.jpg'
import DishImg from '../assets/plants/IMG_4329.jpg'
import ElephantImg from '../assets/plants/IMG_4335.jpg'
import Image from 'next/image'
import MarbleImg from '../assets/plants/IMG_4326.jpg'
import NeonImg from '../assets/plants/IMG_4325.jpg'
import PalmImg from '../assets/plants/IMG_4330.jpg'
import PhiloImg from '../assets/plants/IMG_4328.jpg'
import SmallMarbleImg from '../assets/plants/IMG_4331.jpg'
import SmallNeonImg from '../assets/plants/IMG_4332.jpg'
import SpiderImg from '../assets/plants/IMG_4334.jpg'
import SyngoniumImg from '../assets/plants/IMG_4319.jpg'
import WallFernImg from '../assets/plants/IMG_4323.jpg'
import WallPothosImg1 from '../assets/plants/IMG_4321.jpg'
import WallPothosImg2 from '../assets/plants/IMG_4322.jpg'
import WallSpiderImg from '../assets/plants/IMG_4324.jpg'
import XSmallMarbleImg from '../assets/plants/IMG_4333.jpg'

export default function Najwa() {
    const schedule = [
        {
            name: 'Asparagus fern',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Birds nest fern',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Elephant ears',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Spider plant',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Philo variegated',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Marble queen',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Small marble queen',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Extra small marble queen',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Neon pothos',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Small neon pothos',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Syngonium',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Palm',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Wall - pothos',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Wall - spider',
            date: 'Monday 11/10/23'
        },
        {
            name: 'Wall - fern',
            date: 'Monday 11/10/23'
        }
    ]

    const oneImgPlants = [
        {
            name: 'Syngonium',
            img: SyngoniumImg
        },
        {
            name: 'Birds nest fern',
            img: BirdsNestImg
        },
        {
            name: 'Wall - fern',
            img: WallFernImg
        },
        {
            name: 'Wall - spider',
            img: WallSpiderImg
        },
        {
            name: 'Neon pothos',
            img: NeonImg
        },
        {
            name: 'Marble queen',
            img: MarbleImg
        },
        {
            name: 'Asparagus fern',
            img: AsFernImg
        },
        {
            name: 'Philo variegated',
            img: PhiloImg
        },
        {
            name: 'Palm',
            img: PalmImg
        },
        {
            name: 'Small marble queen',
            img: SmallMarbleImg
        },
        {
            name: 'Small neon pothos',
            img: SmallNeonImg
        },
        {
            name: 'Extra small marble queen',
            img: XSmallMarbleImg
        },
        {
            name: 'Spider plant',
            img: SpiderImg
        },
        {
            name: 'Elephant ears',
            img: ElephantImg
        }
    ]

    const twoImgPlants = [
        {
            name: 'Wall - pothos',
            imgs: [WallPothosImg1, WallPothosImg2]
        }
    ]

    return (
        <div className="space-y-7 p-7">
            <div>
                <Title>Where is the water</Title>
                <Text>Right hand side TV cabinet.</Text>
            </div>

            <div>
                <Title>Where to fill the water from</Title>
                <Text>
                    Fill with <Bold>drinking</Bold> water from the filter, use
                    room temperate water setting.
                </Text>
            </div>

            <div>
                <Title>How to water</Title>
                <Text>
                    <Bold>For all plants: </Bold>
                </Text>
                <Text>
                    Make sure to &quot;spread&quot; the watering instead of
                    watering in just one spot.
                </Text>
                <Text>
                    <Bold>For potted plants: </Bold>
                </Text>
                <Text>
                    Water little by little at a time, until you see water coming
                    out from the bottom. Drain the water.
                </Text>
                <Text>
                    <Bold>For wall plants: </Bold>
                </Text>
                <Text>
                    Just dump two bottles of water, hold the pot up and swirl it
                    to make sure to drain excess water (you can do it on the
                    balcony drain area), then leave outside for one day before
                    bringing it back in.
                </Text>
            </div>

            <div>
                <Title>What else other than water</Title>
                <Text>
                    Make sure this dish always has water (maybe every 2-3 days
                    can check)
                </Text>
                <Image
                    src={DishImg}
                    alt=""
                    width="100"
                    height="100"
                    className="w-full aspect-square object-cover rounded-full mt-2"
                />
            </div>

            <div>
                <Title>Watering schedule</Title>
                <Table>
                    <TableBody>
                        {schedule.map((plant, index) => (
                            <TableRow key={index}>
                                <TableCell>{plant.name}</TableCell>
                                <TableCell>{plant.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div>
                <Title>Plant gallery</Title>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {twoImgPlants.map((plant, index) => (
                        <div
                            key={index}
                            className="text-center space-y-2 col-span-full"
                        >
                            <div className="flex space-x-4">
                                {plant.imgs.map((url, index) => (
                                    <Image
                                        key={index}
                                        src={url}
                                        alt=""
                                        width="100"
                                        height="100"
                                        className="w-full aspect-square object-cover rounded-full"
                                    />
                                ))}
                            </div>
                            <div>{plant.name}</div>
                        </div>
                    ))}
                    {oneImgPlants.map((plant, index) => (
                        <div key={index} className="text-center space-y-2">
                            <Image
                                src={plant.img}
                                alt=""
                                width="100"
                                height="100"
                                className="w-full aspect-square object-cover rounded-full"
                            />
                            <div>{plant.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .tremor-TableBody-root {
                    @apply overflow-hidden !important;
                }
            `}</style>
        </div>
    )
}
