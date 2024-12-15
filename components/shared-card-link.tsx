"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  PinterestIcon
} from 'react-share'

interface SharedCardLinkProps {
  url: string
  title: string
  description?: string
  image?: string
}

export default function SharedCardLink({ url, title, description, image }:SharedCardLinkProps) {
  const buttonClass = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"

  return (
    <div className="flex space-x-2">
      <FacebookShareButton url={url} hashtag="#MiFloristeria">
        <div className={buttonClass}>
          <FacebookIcon size={24} round />
          <span className="sr-only">Compartir en Facebook</span>
        </div>
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title} via="MiFloristeria" hashtags={["flores", "arreglosFlorarles"]}>
        <div className={buttonClass}>
          <TwitterIcon size={24} round />
          <span className="sr-only">Compartir en Twitter</span>
        </div>
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={title} separator=" - ">
        <div className={buttonClass}>
          <WhatsappIcon size={24} round />
          <span className="sr-only">Compartir en WhatsApp</span>
        </div>
      </WhatsappShareButton>

      <LinkedinShareButton url={url} title={title} summary={description} source="Mi Floristería">
        <div className={buttonClass}>
          <LinkedinIcon size={24} round />
          <span className="sr-only">Compartir en LinkedIn</span>
        </div>
      </LinkedinShareButton>

      {image && (
        <PinterestShareButton url={url} media={image} description={title}>
          <div className={buttonClass}>
            <PinterestIcon size={24} round />
            <span className="sr-only">Compartir en Pinterest</span>
          </div>
        </PinterestShareButton>
      )}
    </div>
  )
}

