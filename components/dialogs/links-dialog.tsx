"use client";
import CancelButton from "@/components/buttons/cancel-button";
import LinksButton from "@/components/buttons/links-button";
import Info from "@/components/icons/info";
import Phone from "@/components/icons/phone";
import Web from "@/components/icons/web";
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Highlight } from "@/lib/utils";
import { useState } from "react";

export default function LinksDialog({
  variant,
}: {
  variant: "home" | "wheel";
}) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <LinksButton variant={variant} onClick={() => setIsOpen(true)} />
      <Dialog
        size={"5xl"}
        open={isOpen}
        onClose={setIsOpen}
        className={"space-y-6"}
      >
        <DialogTitle className={"mb-6 text-center md:mb-4 md:text-start"}>
          <Highlight className={"text-lg md:text-xl"}>
            {" "}
            Ressources & contacts et utiles
          </Highlight>
        </DialogTitle>
        <DialogDescription className={"space-y-2 md:space-y-1"}>
          <DialogTitle>Appel d’urgence européen</DialogTitle>
          <div className={"flex items-center gap-2"}>
            <div
              className={"hidden size-5 items-center justify-center md:flex"}
            >
              <Info className={"size-5"} />
            </div>
            C’est un numéro d’appel d’urgence disponible gratuitement 24 heures
            sur 24 et 7 jours sur 7 partout dans l’Union européenne.
          </div>

          <div className={"flex items-center gap-2"}>
            <div className={"flex size-5 items-center justify-center"}>
              <Phone className={"size-4 fill-current"} />
            </div>
            <div className={"font-medium"}>
              <span>Teléphone :</span> <span>112</span>
            </div>
          </div>
        </DialogDescription>
        <DialogDescription className={"space-y-2 md:space-y-1"}>
          <DialogTitle>
            Appel d’urgence – Personnes sourdes et malentendantes
          </DialogTitle>
          <div className={"flex items-center gap-2"}>
            <div
              className={"hidden size-5 items-center justify-center md:flex"}
            >
              <Info className={"size-5"} />
            </div>
            Si tu rencontres des difficultés pour entendre ou pour parler et que
            tu te trouves dans une situation d'urgence, tu peux appeler ce
            numéro.
          </div>

          <div className={"flex items-center gap-2"}>
            <div className={"flex size-5 items-center justify-center"}>
              <Phone className={"size-4 fill-current"} />
            </div>
            <div className={"font-medium"}>
              <span>Teléphone :</span> <span>114</span>
            </div>
          </div>
        </DialogDescription>
        <DialogDescription className={"space-y-2 md:space-y-1"}>
          <DialogTitle>Police secours</DialogTitle>
          <div className={"flex items-center gap-2"}>
            <div
              className={"hidden size-5 items-center justify-center md:flex"}
            >
              <Info className={"size-5"} />
            </div>
            Si tu es victime ou témoin d'un événement grave, tu peux appeler
            ‘Police secours’ qui dispose d’une ligne d'appel enregistrée avec
            reconnaissance de l'appelant qui est disponible 24 heures sur 24 et
            7 jours sur 7.
          </div>

          <div className={"flex items-center gap-2"}>
            <div className={"flex size-5 items-center justify-center"}>
              <Phone className={"size-4 fill-current"} />
            </div>
            <div className={"font-medium"}>
              <span>Teléphone :</span> <span>17</span>
            </div>
          </div>
        </DialogDescription>
        <DialogDescription className={"space-y-2 md:space-y-1"}>
          <DialogTitle>Violences femmes info</DialogTitle>
          <div className={"flex items-center gap-2"}>
            <div
              className={"hidden size-5 items-center justify-center md:flex"}
            >
              <Info className={"size-5"} />
            </div>
            Cette plateforme d'écoute, d'information et d'orientation des
            victimes de violences sexistes et sexuelles est disponible 24 heures
            sur 24 et 7 jours sur 7.
          </div>

          <div className={"flex items-center gap-2"}>
            <div className={"flex size-5 items-center justify-center"}>
              <Phone className={"size-4 fill-current"} />
            </div>
            <div className={"font-medium"}>
              <span>Teléphone :</span> <span>3919</span>
            </div>
          </div>
          <div>
            Tu peux aussi trouver de l’aide en ligne{" "}
            <a
              className={"hover:underline"}
              href={"https://arretonslesviolences.gouv.fr/"}
            >
              ici
            </a>
          </div>
        </DialogDescription>
        <DialogDescription className={"space-y-2 md:space-y-1"}>
          <DialogTitle>Planning familial</DialogTitle>
          <div className={"flex items-center gap-2"}>
            <div
              className={"hidden size-5 items-center justify-center md:flex"}
            >
              <Info className={"size-5"} />
            </div>
            C’est un centre d'écoute, d'aide et de prévention qui met à
            disposition ce numéro vert national toujours prêt à te donner
            l'information dont tu as besoin en matière de sexualité, de
            contraception, d’avortement, de violences de dépistage et
            d’orientation sexuelle du lundi au samedi de 9h à 20h en métropole
            et maintenant aussi aux Antilles du lundi au vendredi de 9h à 17h.
          </div>

          <div className={"flex items-center gap-2"}>
            <div className={"flex size-5 items-center justify-center"}>
              <Phone className={"size-4 fill-current"} />
            </div>
            <div className={"font-medium"}>
              <span>Teléphone :</span> <span>0 800 08 11 11</span>
            </div>
          </div>
        </DialogDescription>
        <DialogDescription className={"space-y-2 md:space-y-1"}>
          <DialogTitle>Femme pour le dire, Femme pour agir</DialogTitle>
          <div className={"flex items-center gap-2"}>
            <div
              className={"hidden size-5 items-center justify-center md:flex"}
            >
              <Info className={"size-5"} />
            </div>
            Cette association met à disposition un numéro d'écoute pour
            recueillir la parole des femmes handicapées victimes de violences,
            du lundi au jeudi de 10h à 13h et le lundi après-midi de 14h30 à
            17h30.
          </div>

          <div className={"flex items-center gap-2"}>
            <div className={"flex size-5 items-center justify-center"}>
              <Phone className={"size-4 fill-current"} />
            </div>
            <div className={"font-medium"}>
              <span>Teléphone :</span> <span>01 40 47 06 06</span>
            </div>
          </div>
        </DialogDescription>
        <DialogDescription className={"space-y-2 md:space-y-1"}>
          <DialogTitle>
            Centre Gratuit d’Information, de Diagnostic et de Dépistage (CeGIDD)
          </DialogTitle>
          <div className={"flex items-center gap-2"}>
            <div
              className={"hidden size-5 items-center justify-center md:flex"}
            >
              <Info className={"size-5"} />
            </div>
            Voici une carte qui t'aidera à trouver un centre de dépistage des
            infections par le VIH (Virus de l'Immunodéficience Humaine), des
            hépatites virales et des infections sexuellement transmissibles.
          </div>

          <a
            href={"https://vih.org/cegidd/"}
            className={"flex items-center gap-2"}
          >
            <div className={"flex size-5 items-center justify-center"}>
              <Web className={"size-5"} />
            </div>
            <div className={"font-medium hover:underline"}>Site web</div>
          </a>
        </DialogDescription>
        <DialogDescription className={"space-y-2 md:space-y-1"}>
          <DialogTitle>
            Aide à distance en santé (addictions, santé mentale, etc.)
          </DialogTitle>
          <div className={"flex items-center gap-2"}>
            <div
              className={"hidden size-5 items-center justify-center md:flex"}
            >
              <Info className={"size-5"} />
            </div>
            Voici les coordonnées téléphoniques et internet des 16 services de
            téléphonie ‘santé’, soutenus par ‘Santé publique France’, avec pour
            chacun un petit descriptif, les heures d'ouverture de la ligne et le
            coût de l'appel.
          </div>

          <a
            href={
              "https://www.santepubliquefrance.fr/determinants-de-sante/sante-sexuelle/documents/depliant-flyer/aide-a-distance-en-sante-contacts-utiles"
            }
            className={"flex items-center gap-2"}
          >
            <div className={"flex size-5 items-center justify-center"}>
              <Web className={"size-5"} />
            </div>
            <div className={"font-medium hover:underline"}>Site web</div>
          </a>
        </DialogDescription>
        <DialogDescription className={"space-y-2 md:space-y-1"}>
          <DialogTitle>Information violence sexuelle</DialogTitle>
          <div className={"flex items-center gap-2"}>
            <div
              className={"hidden size-5 items-center justify-center md:flex"}
            >
              <Info className={"size-5"} />
            </div>
            <p>
              C’est un site très complet qui donne beaucoup d'informations sur
              toutes les formes de violences sexuelles. Aussi, sur le site{" "}
              <a
                className={"hover:underline"}
                href={"https://consentement.info/"}
              >
                consentement.info
              </a>
              , tu trouveras des conseils, des quizz et même une chanson sur le
              thème du consentement.
            </p>
          </div>

          <a
            href={"https://violences-sexuelles.info/"}
            className={"flex items-center gap-2"}
          >
            <div className={"flex size-5 items-center justify-center"}>
              <Web className={"size-5"} />
            </div>
            <div className={"font-medium hover:underline"}>Site web</div>
          </a>
        </DialogDescription>
        <DialogActions>
          <CancelButton onClick={() => setIsOpen(false)} variant={"close"} />
        </DialogActions>
      </Dialog>
    </>
  );
}
