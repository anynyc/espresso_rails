# json.extract! video, :id, :video_url, :gif_url, :headline, :emoji_one, :emoji_two, :emoji_three
  json.extract! video, :video_url, :gif_url, :headline, :emoji_one, :emoji_two, :emoji_three, :image

  json.id video.id.to_s
