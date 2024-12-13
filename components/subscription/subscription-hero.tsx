import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SubscriptionHero() {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/subscription/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-8 items-center py-20">
        {/* Text Content */}
        <div className="text-center lg:text-left space-y-6">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-4">
                Nouveau : Premium+ Disponible
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              L'agriculture de demain
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Votre source d'inspiration et d'innovation agricole
            </motion.p>
          </div>
          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button size="lg">Commencer maintenant</Button>
            <Button size="lg" variant="outline">
              En savoir plus
            </Button>
          </motion.div>
        </div>

        {/* Magazine Mockups */}
        <div className="relative h-[400px] hidden lg:block">
          {/* Closed Magazine Stack */}
          <motion.div
            className="absolute right-0 top-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          >
            <div className="relative">
              {/* Stack Effect */}
              <div className="absolute -right-4 -top-4 w-[200px] h-[280px] bg-primary/5 rounded-lg transform rotate-6" />
              <div className="absolute -right-2 -top-2 w-[200px] h-[280px] bg-primary/10 rounded-lg transform rotate-3" />
              {/* Main Magazine Cover */}
              <div className="relative w-[200px] h-[280px] rounded-lg shadow-2xl overflow-hidden">
                <img
                  src="/images/subscription/magazine-cover-1.jpg"
                  alt="Magazine Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20" />
                {/* Magazine Cover Elements */}
                <div className="absolute inset-0 flex flex-col p-4">
                  {/* Magazine Name */}
                  <div className="text-white text-xl font-bold tracking-wider drop-shadow-lg">
                    AGRI
                    <span className="text-primary">TECH</span>
                  </div>
                  
                  {/* Edition Info */}
                  <div className="text-white/90 text-xs mt-1 drop-shadow-lg">
                    ÉDITION DÉCEMBRE 2024
                  </div>

                  {/* Main Headline */}
                  <div className="mt-auto space-y-2">
                    <div className="bg-primary/90 text-white px-2 py-1 text-sm font-medium inline-block rounded">
                      EXCLUSIF
                    </div>
                    <h3 className="text-white text-lg font-bold leading-tight drop-shadow-lg">
                      Innovation Durable
                      <br />
                      en Agriculture
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded">
                        Tech
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded">
                        Durable
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded">
                        Futur
                      </span>
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Open Magazine */}
          <motion.div
            className="absolute left-0 bottom-0"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="w-[400px] h-[280px] rounded-lg shadow-2xl overflow-hidden flex">
              {/* Left Page */}
              <div className="w-1/2 h-full relative">
                <img
                  src="/images/subscription/magazine-spread-1.jpg"
                  alt="Magazine Spread Left"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/5 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col">
                  <span className="text-white/70 text-[10px] tracking-wider">INNOVATION</span>
                  <h3 className="text-white text-lg font-bold leading-tight mt-1 mb-2 drop-shadow-lg">
                    Technologies agricoles
                  </h3>
                  <p className="text-white/90 text-[10px] leading-relaxed max-w-[90%] drop-shadow-md">
                    Les innovations au service d'une agriculture plus durable et efficiente.
                  </p>
                  <div className="mt-auto flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-[10px]">01</span>
                    </div>
                    <div className="h-[1px] flex-grow bg-white/20" />
                  </div>
                </div>
              </div>
              {/* Right Page */}
              <div className="w-1/2 h-full relative">
                <img
                  src="/images/subscription/magazine-spread-2.jpg"
                  alt="Magazine Spread Right"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-background/5 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="space-y-3 text-white/90 text-[10px]">
                    <div>
                      <h4 className="font-semibold drop-shadow-md">Agriculture de précision</h4>
                      <p className="text-white/80 leading-relaxed drop-shadow-md">
                        Optimisation des ressources
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold drop-shadow-md">Robotique agricole</h4>
                      <p className="text-white/80 leading-relaxed drop-shadow-md">
                        Assistance automatisée
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-end gap-2">
                    <div className="h-[1px] flex-grow bg-white/20" />
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-[10px]">02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
